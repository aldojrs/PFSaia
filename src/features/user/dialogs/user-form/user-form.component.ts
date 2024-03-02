import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Role, User } from '../../models';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
})
export class UserFormComponent {

    userForm!: FormGroup;
    roles = Object.values(Role);

    constructor(private fb: FormBuilder,
        public dialogRef: MatDialogRef<UserFormComponent>,
        @Inject(MAT_DIALOG_DATA) public user?: User,
    ) { }

    ngOnInit(): void {
        this.userForm = this.fb.group({
            firstName: this.fb.control(this.user?.firstName, Validators.required),
            lastName: this.fb.control(this.user?.lastName, Validators.required),
            email: this.fb.control(this.user?.email, [Validators.required, Validators.email]),
            role: this.fb.control(this.user?.role, Validators.required),
        });
    }

    onSubmit(): void {
        if (this.userForm.invalid) {
            this.userForm.markAllAsTouched();
        } else {
            this.dialogRef.close(this.userForm.value);
        }
    }
}
