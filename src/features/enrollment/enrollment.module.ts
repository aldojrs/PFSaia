import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentRoutingModule } from './enrollment-routing.module';
import { EnrollmentComponent } from './enrollment.component';
import { MaterialModule } from '../../material/material.module';
import { EnrollmentDetailComponent } from './dialogs/enrollment-detail/enrollment-detail.component';
import { EnrollmentFormComponent } from './dialogs/enrollment-form/enrollment-form.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EnrollmentComponent,
    EnrollmentDetailComponent,
    EnrollmentFormComponent,
  ],
  imports: [
    CommonModule,
    EnrollmentRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class EnrollmentModule { }
