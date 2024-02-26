import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../models';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
})
export class CourseFormComponent {

    courseForm!: FormGroup;

    constructor(private fb: FormBuilder,
        public dialogRef: MatDialogRef<CourseFormComponent>,
        @Inject(MAT_DIALOG_DATA) public course?: Course,
    ) {}

    ngOnInit(): void {
        this.courseForm = this.fb.group({
            name: this.fb.control(this.course?.name, Validators.required),
            description: this.fb.control(this.course?.description, Validators.required),
            dateFrom: this.fb.control(this.course?.dateFrom, Validators.required),
            dateTo: this.fb.control(this.course?.dateTo, Validators.required),
        });
    }

    onSubmit(): void {
        if (this.courseForm.invalid) {
            this.courseForm.markAllAsTouched();
        } else {
            this.dialogRef.close(this.courseForm.value);
        }
    }
}
