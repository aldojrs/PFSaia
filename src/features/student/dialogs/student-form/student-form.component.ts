import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models';

@Component({
    selector: 'app-student-form',
    templateUrl: './student-form.component.html'
})
export class StudentFormComponent implements OnInit {

    studentForm!: FormGroup;

    constructor(private fb: FormBuilder,
        public dialogRef: MatDialogRef<StudentFormComponent>,
        @Inject(MAT_DIALOG_DATA) public student?: Student,
    ) {}

    ngOnInit(): void {
        this.studentForm = this.fb.group({
            firstName: this.fb.control(this.student?.firstName, Validators.required),
            lastName: this.fb.control(this.student?.lastName, Validators.required),
            documentNro: this.fb.control(this.student?.documentNro, Validators.required),
            email: this.fb.control(this.student?.email, [Validators.required, Validators.email]),
        });
    }

    onSubmit(): void {
        if (this.studentForm.invalid) {
            this.studentForm.markAllAsTouched();
        } else {
            this.dialogRef.close(this.studentForm.value);
        }
    }

}
