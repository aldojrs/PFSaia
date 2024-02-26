import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Student } from '../../models';
import { Course } from '../../../course/models';
import { CourseService } from '../../../course/service/course.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { EnrollmentService } from '../../../enrollment/service/enrollment.service';
import { ConfirmationDialogComponent } from '../../../../shared/dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
})
export class StudentDetailComponent implements OnInit {

    displayedColumns: string[] = ['id', 'name', 'description', 'dateFrom', 'dateTo', 'actions'];
    dataSource!: Course[];

    constructor(private courseService: CourseService, private enrollmentService: EnrollmentService,
        private loadingService: LoadingService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public student: Student) {}

    ngOnInit(): void {
        this.loadingService.setIsLoading(true);
        this.courseService.getCoursesByStudentId(this.student.id).subscribe((courses) => {
            this.dataSource = [...courses];
            this.loadingService.setIsLoading(false);
        });
    }

    unenroll(course: Course) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
                message: 'Desea desinscribir este curso del alumno?',
                buttonText: {
                    ok: 'Aceptar',
                    cancel: 'Cancelar'
                }
            }
        });

        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
            if (!confirmed) return;
            this.loadingService.setIsLoading(true);
            this.enrollmentService.unenroll(this.student.id, course.id);
            this.courseService.getCoursesByStudentId(this.student.id).subscribe((courses) => {
                this.dataSource = [...courses];
                this.loadingService.setIsLoading(false);
            });
        });
    }

}
