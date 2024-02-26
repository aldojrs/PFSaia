import { Injectable } from '@angular/core';
import { Course } from '../models';
import { Observable, delay, forkJoin, map, mergeMap, of } from 'rxjs';
import { Enrollment } from '../../enrollment/models';
import { EnrollmentService } from '../../enrollment/service/enrollment.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    constructor(private enrollmentService: EnrollmentService, private httpClient: HttpClient) { }

    getCourses(): Observable<Course[]> {
        return this.httpClient.get<Course[]>(`http://localhost:3000/courses`);
    }

    getCoursesByStudentId(studentId: string): Observable<Course[]> {
        return this.enrollmentService.getEnrollmentsByStudentId(studentId).pipe(
            mergeMap((enrollments: Enrollment[]) => {
                if (enrollments.length === 0) {
                    return of([]);
                }
                const courseIds = enrollments.map((enrollment) => enrollment.courseId);
                return this.getCoursesByIds(courseIds);
            })
        );
    }

    getCoursesByIds(courseIds: string[]): Observable<Course[]> {
        return this.getCourses().pipe(
            map((courses) => {
                return courses.filter((course) => courseIds.includes(course.id));
            })
        );
    }

    addCourse(course: Course): Observable<Course> {
        return this.httpClient.post<Course>(`http://localhost:3000/courses`, course);
    }

    editCourse(course: Course): Observable<Course> {
        return this.httpClient.put<Course>(`http://localhost:3000/courses/${course.id}`, course);
    }

    deleteCourse(courseId: string): Observable<Course> {
        return this.httpClient.delete<Course>(`http://localhost:3000/courses/${courseId}`);
    }
}
