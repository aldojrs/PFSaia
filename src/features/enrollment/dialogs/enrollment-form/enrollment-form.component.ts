import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../../course/models';
import { CourseService } from '../../../course/service/course.service';
import { StudentService } from '../../../student/service/student.service';
import { Student } from '../../../student/models';
import { forkJoin } from 'rxjs';
import { LoadingService } from '../../../../core/services/loading.service';

@Component({
  selector: 'app-enrollment-form',
  templateUrl: './enrollment-form.component.html',
})
export class EnrollmentFormComponent {

    courses: Course[] = [];
    students: Student[] = [];
    enrollmentForm!: FormGroup;

    constructor(private courseService: CourseService,
        private studentService: StudentService,
        private loadingService: LoadingService,
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<EnrollmentFormComponent>,
    ) {}

    ngOnInit(): void {

        this.loadData();

        this.enrollmentForm = this.fb.group({
            courseId: this.fb.control('', Validators.required),
            studentId: this.fb.control('', Validators.required),
        });
    }

    loadData(): void {
        const courseObservable = this.courseService.getCourses();
        const studentObservable = this.studentService.getStudents();
        
        this.loadingService.setIsLoading(true);
        forkJoin([courseObservable, studentObservable]).subscribe(([courses, students]) => {
            this.courses = courses;
            this.students = students;

            this.loadingService.setIsLoading(false);
        });
    }

    onSubmit(): void {
        if (this.enrollmentForm.invalid) {
            this.enrollmentForm.markAllAsTouched();
        } else {
            this.dialogRef.close(this.enrollmentForm.value);
        }
    }
}
