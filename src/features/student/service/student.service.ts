import { Injectable } from '@angular/core';
import { Student } from '../models';
import { Observable, delay, map, mergeMap, of, tap, throwError } from 'rxjs';
import { EnrollmentService } from '../../enrollment/service/enrollment.service';
import { Enrollment } from '../../enrollment/models';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class StudentService {

    constructor(private enrollmentService: EnrollmentService, private httpClient: HttpClient) { }

    getStudents(): Observable<Student[]> {
        return this.httpClient.get<Student[]>(`http://localhost:3000/students`);
    }

    getStudentsByCourseId(courseId: string): Observable<Student[]> {
        return this.enrollmentService.getEnrollmentsByCourseId(courseId).pipe(
            mergeMap((enrollments: Enrollment[]) => {
                if (enrollments.length === 0) {
                    return of([]);
                }
                const studentIds = enrollments.map((enrollment) => enrollment.studentId);
                return this.getStudentByIds(studentIds);
            })
        );
    }

    getStudentByIds(studentIds: string[]): Observable<Student[]> {
        return this.getStudents().pipe(
            map((students) => {
                return students.filter((student) => studentIds.includes(student.id));
            })
        );
    }

    addStudent(student: Student): Observable<Student> {
        return this.httpClient.get<Student[]>(`http://localhost:3000/students?documentNro=${student.documentNro}`)
            .pipe(
                mergeMap((existingStudent) => {
                    if (existingStudent && existingStudent.length > 0) {
                        const err = new Error(`El número de documento: ${student.documentNro} ya existe`);
                        return throwError(() => err);
                    }

                    student.registrationDate = new Date();
                    return this.httpClient.post<Student>(`http://localhost:3000/students`, student);
                })
            );
    }

    editStudent(student: Student): Observable<Student> {
        return this.httpClient.get<Student[]>(`http://localhost:3000/students?documentNro=${student.documentNro}&id_ne=${student.id}`)
            .pipe(
                mergeMap((existingStudent) => {
                    if (existingStudent && existingStudent.length > 0) {
                        const err = new Error(`El número de documento: ${student.documentNro} ya existe`);
                        return throwError(() => err);
                    }

                    return this.httpClient.put<Student>(`http://localhost:3000/students/${student.id}`, student);
                })
            );
    }

    deleteStudent(studentId: string): Observable<Student> {
        return this.httpClient.delete<Student>(`http://localhost:3000/students/${studentId}`);
    }

}
