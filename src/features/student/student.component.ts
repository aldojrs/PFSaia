import { Component, OnInit } from '@angular/core';
import { Student } from './models';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from './dialogs/student-form/student-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { StudentService } from './service/student.service';
import { StudentDetailComponent } from './dialogs/student-detail/student-detail.component';
import { LoadingService } from '../../core/services/loading.service';
import { LoginService } from '../login/service/login.service';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html'
})
export class StudentComponent implements OnInit {

    displayedColumns: string[] = ['id', 'fullName', 'documentNro', 'email', 'registrationDate', 'actions'];
    dataSource!: Student[];

    isUserAdmin$;

    constructor(private studentService: StudentService, private loadingService: LoadingService,
        private loginService: LoginService, private dialog: MatDialog, private _snackBar: MatSnackBar) {
        this.isUserAdmin$ = this.loginService.isAdmin$;
    }

    ngOnInit(): void {
        this.loadData();
    }

    private loadData(): void {
        this.loadingService.setIsLoading(true);
        this.studentService.getStudents().subscribe((students) => {
            this.dataSource = [...students];
            this.loadingService.setIsLoading(false);
        });
    }

    openStudentDetail(student?: Student) {
        this.dialog.open(StudentDetailComponent, {
            data: student,
        });
    }

    openStudentForm(student?: Student) {
        const dialogRef = this.dialog.open(StudentFormComponent, {
            data: student,
        });

        dialogRef.afterClosed().subscribe(result => {

            if (!result) return;

            this.loadingService.setIsLoading(true);

            if (student) { // If the student is not null, it means that we are editing an existing student
                const studentEdited = { ...student, ...result };
                this.studentService.editStudent(studentEdited).subscribe({
                    next: (student) => {
                        this.dataSource = this.update(this.dataSource, student.id, student);
                        this.loadingService.setIsLoading(false);
                        this._snackBar.open('Alumno actualizado correctamente', 'Ok', { duration: 3000 });
                    },
                    error: (error) => {
                        this._snackBar.open(error, 'Ok', { duration: 3000 });
                        this.loadingService.setIsLoading(false);
                    }
                });
            } else { // If the student is null, it means that we are creating a new student
                this.studentService.addStudent(result).subscribe({
                    next: (student) => {
                        this.dataSource = [...this.dataSource, ...[student]];
                        this.loadingService.setIsLoading(false)
                        this._snackBar.open('Alumno agregado correctamente', 'Ok', { duration: 3000 });
                    },
                    error: (error) => {
                        this._snackBar.open(error, 'Ok', { duration: 3000 });
                        this.loadingService.setIsLoading(false);
                    }
                });
            }
        });
    }

    update(students: Student[], id: string, updatedStudent: Partial<Student>): Student[] {
        return students.map((student) => (student.id === id ? { ...student, ...updatedStudent } : student))
    }

    deleteStudent(student: Student) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
                message: 'Desea eliminar el alumno?',
                buttonText: {
                    ok: 'Aceptar',
                    cancel: 'Cancelar'
                }
            }
        });

        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
            if (confirmed) {
                this.loadingService.setIsLoading(true);
                this.studentService.deleteStudent(student.id).subscribe((student) => {
                    this.dataSource = this.dataSource.filter(e => e.id !== student.id);
                    this.loadingService.setIsLoading(false)
                    this._snackBar.open('Alumno eliminado correctamente', 'Ok', { duration: 3000 });
                });
            }
        });
    }

}
