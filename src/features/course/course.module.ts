import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { CourseDetailComponent } from './dialogs/course-detail/course-detail.component';
import { CourseFormComponent } from './dialogs/course-form/course-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CourseComponent,
    CourseDetailComponent,
    CourseFormComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CourseModule { }
