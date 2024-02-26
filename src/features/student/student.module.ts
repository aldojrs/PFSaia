import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentFormComponent } from './dialogs/student-form/student-form.component';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { StudentRoutingModule } from './student-routing.module';
import { StudentDetailComponent } from './dialogs/student-detail/student-detail.component';

@NgModule({
  declarations: [
    StudentComponent,
    StudentFormComponent,
    StudentDetailComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StudentRoutingModule,
  ],
})
export class StudentModule { }
