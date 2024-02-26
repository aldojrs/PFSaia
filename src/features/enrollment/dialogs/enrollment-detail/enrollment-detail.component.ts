import { Component, Inject } from '@angular/core';
import { Student } from '../../../student/models';
import { LoadingService } from '../../../../core/services/loading.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { StudentService } from '../../../student/service/student.service';
import { EnrollmentService } from '../../service/enrollment.service';
import { ConfirmationDialogComponent } from '../../../../shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { Course } from '../../../course/models';

@Component({
    selector: 'app-enrollment-detail',
    templateUrl: './enrollment-detail.component.html',
})
export class EnrollmentDetailComponent {

    displayedColumns: string[] = ['id', 'fullName', 'documentNro', 'email', 'registrationDate', 'actions'];
    dataSource!: Student[];

    constructor(private studentService: StudentService, private enrollmentService: EnrollmentService,
        private loadingService: LoadingService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public course: Course) { }

    ngOnInit(): void {
        this.loadingService.setIsLoading(true);
        this.studentService.getStudentsByCourseId(this.course.id).subscribe((students) => {
            this.dataSource = [...students];
            this.loadingService.setIsLoading(false);
        });
    }

    unenroll(student: Student) {

        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
                message: 'Desea desinscribir este alumno del curso?',
                buttonText: {
                    ok: 'Aceptar',
                    cancel: 'Cancelar'
                }
            }
        });

        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
            if (!confirmed) return;
            this.loadingService.setIsLoading(true);
            this.enrollmentService.unenroll(student.id, this.course.id).subscribe(() => {
                this.studentService.getStudentsByCourseId(this.course.id).subscribe((students) => {
                    this.dataSource = [...students];
                    this.loadingService.setIsLoading(false);
                });
            });
        });
    }

}
