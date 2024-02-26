import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth.guard';

const routes: Routes = [
    { path: 'login', loadChildren: () => import('../features/login/login.module').then((m) => m.LoginModule) },
    { path: 'home', canActivate: [authGuard], loadChildren: () => import('../features/home/home.module').then(m => m.HomeModule) },
    { path: 'student', canActivate: [authGuard], loadChildren: () => import('../features/student/student.module').then(m => m.StudentModule) },
    { path: 'course', canActivate: [authGuard], loadChildren: () => import('../features/course/course.module').then(m => m.CourseModule) },
    { path: 'enrollment', loadChildren: () => import('../features/enrollment/enrollment.module').then(m => m.EnrollmentModule) },
    { path: '**', redirectTo: 'login' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }