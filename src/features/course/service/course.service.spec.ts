import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { of } from 'rxjs';
import { Course } from '../models';
import { EnrollmentService } from '../../enrollment/service/enrollment.service';
import { Enrollment } from '../../enrollment/models';

describe('CourseService', () => {
    let service: CourseService;
    let httpMock: HttpTestingController;
    let enrollmentService: jasmine.SpyObj<EnrollmentService>;

    beforeEach(() => {
        const enrollmentServiceSpy = jasmine.createSpyObj('EnrollmentService', ['getEnrollmentsByStudentId']);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                CourseService,
                { provide: EnrollmentService, useValue: enrollmentServiceSpy }
            ]
        });

        service = TestBed.inject(CourseService);
        httpMock = TestBed.inject(HttpTestingController);
        enrollmentService = TestBed.inject(EnrollmentService) as jasmine.SpyObj<EnrollmentService>;
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get courses', () => {
        const courses: Course[] = [
            { id: '1', name: 'Course 1', description: 'Description 1', dateFrom: new Date(), dateTo: new Date() },
            { id: '2', name: 'Course 2', description: 'Description 2', dateFrom: new Date(), dateTo: new Date() }
        ];

        service.getCourses().subscribe((response) => {
            expect(response).toEqual(courses);
        });

        const req = httpMock.expectOne('http://localhost:3000/courses');
        expect(req.request.method).toBe('GET');
        req.flush(courses);
    });

    it('should get courses by student ID', () => {
        const studentId = '123';
        const enrollments: Enrollment[] = [
            { id: '1', studentId: '123', courseId: '1', date: new Date() },
            { id: '2', studentId: '123', courseId: '2', date: new Date() }
        ];
        const courses: Course[] = [
            { id: '1', name: 'Course 1', description: 'Description 1', dateFrom: new Date(), dateTo: new Date() },
            { id: '2', name: 'Course 2', description: 'Description 2', dateFrom: new Date(), dateTo: new Date() }
        ];

        enrollmentService.getEnrollmentsByStudentId.and.returnValue(of(enrollments));
        spyOn(service, 'getCoursesByIds').and.returnValue(of(courses));

        service.getCoursesByStudentId(studentId).subscribe((response) => {
            expect(response).toEqual(courses);
        });

        expect(enrollmentService.getEnrollmentsByStudentId).toHaveBeenCalledWith(studentId);
        expect(service.getCoursesByIds).toHaveBeenCalledWith(['1', '2']);
    });

    it('should add a course', () => {
        const course: Course = { id: '1', name: 'Course 1', description: 'Description 1', dateFrom: new Date(), dateTo: new Date() };

        service.addCourse(course).subscribe((response) => {
            expect(response).toEqual(course);
        });

        const req = httpMock.expectOne('http://localhost:3000/courses');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(course);
        req.flush(course);
    });

    it('should edit a course', () => {
        const course: Course = { id: '1', name: 'Course 1', description: 'Description 1', dateFrom: new Date(), dateTo: new Date() };

        service.editCourse(course).subscribe((response) => {
            expect(response).toEqual(course);
        });

        const req = httpMock.expectOne(`http://localhost:3000/courses/${course.id}`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(course);
        req.flush(course);
    });

    it('should delete a course', () => {
        const courseId = '1';

        service.deleteCourse(courseId).subscribe((response) => {
            expect(response);
        });

        const req = httpMock.expectOne(`http://localhost:3000/courses/${courseId}`);
        expect(req.request.method).toBe('DELETE');
        req.flush(courseId);
    });
});