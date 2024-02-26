import { Injectable } from '@angular/core';
import { Enrollment } from '../models';
import { Observable, delay, mergeMap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EnrollmentService {

    constructor(private httpClient: HttpClient) { }

    enroll(enrollment: Enrollment): Observable<Enrollment> {
        enrollment.date = new Date();
        return this.httpClient.post<Enrollment>(`http://localhost:3000/enrollments`, enrollment);
    }

    getEnrollments(): Observable<Enrollment[]> {
        return this.httpClient.get<Enrollment[]>(`http://localhost:3000/enrollments`);
    }

    getEnrollmentsByStudentId(studentId: string): Observable<Enrollment[]> {
        return this.httpClient.get<Enrollment[]>(`http://localhost:3000/enrollments?studentId=${studentId}`);
    }

    getEnrollmentsByCourseId(courseId: string): Observable<Enrollment[]> {
        return this.httpClient.get<Enrollment[]>(`http://localhost:3000/enrollments?courseId=${courseId}`);
    }

    getEnrollmentByCourseIdAndStudentId(courseId: string, studentId: string): Observable<Enrollment[]> {
        return this.httpClient.get<Enrollment[]>(`http://localhost:3000/enrollments?courseId=${courseId}&studentId=${studentId}`);
    }

    unenroll(studentId: string, courseId: string): Observable<Enrollment> {
        return this.getEnrollmentByCourseIdAndStudentId(courseId, studentId)
            .pipe(
                mergeMap((enrollments) => {
                    return this.httpClient.delete<Enrollment>(`http://localhost:3000/enrollments/${enrollments[0].id}`);
                })
            );
    }    

}
