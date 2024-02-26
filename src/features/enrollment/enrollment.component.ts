import { Component } from '@angular/core';
import { Course } from '../course/models';
import { CourseService } from '../course/service/course.service';
import { LoadingService } from '../../core/services/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { EnrollmentDetailComponent } from './dialogs/enrollment-detail/enrollment-detail.component';
import { EnrollmentFormComponent } from './dialogs/enrollment-form/enrollment-form.component';
import { Enrollment } from './models';
import { EnrollmentService } from './service/enrollment.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
})
export class EnrollmentComponent {

    displayedColumns: string[] = ['id', 'name', 'dateFrom', 'dateTo', 'actions'];
    dataSource!: Course[];

    constructor(private courseService: CourseService,
        private enrollmentService: EnrollmentService,
        private loadingService: LoadingService,
        private dialog: MatDialog,
        private _snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.loadData();
    }

    loadData(): void {
        this.loadingService.setIsLoading(true);
        this.courseService.getCourses().subscribe((courses) => {
            this.dataSource = [...courses];
            this.loadingService.setIsLoading(false);
        });
    }

    openEnrollmentDetail(course?: Course) {
        this.dialog.open(EnrollmentDetailComponent, {
            data: course,
        });
    }

    openEnrollmentForm(course?: Course) {
        
        const dialogRef = this.dialog.open(EnrollmentFormComponent);

        dialogRef.afterClosed().subscribe(result => {

            if (!result) return;

            this.loadingService.setIsLoading(true);
            this.enrollmentService.enroll(result).subscribe(() => {
                this.loadingService.setIsLoading(false)
                this._snackBar.open('Inscripción realizada correctamente', 'Ok', { duration: 3000 });
            });
        });
    }

}
