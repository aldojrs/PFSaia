import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { CourseComponent } from './course.component';
import { CourseService } from './service/course.service';
import { LoadingService } from '../../core/services/loading.service';
import { Course } from './models';
import { CourseDetailComponent } from './dialogs/course-detail/course-detail.component';
import { CourseFormComponent } from './dialogs/course-form/course-form.component';
import { ConfirmationDialogComponent } from '../../shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { LoginService } from '../login/service/login.service';

describe('CourseComponent', () => {
    let component: CourseComponent;
    let fixture: ComponentFixture<CourseComponent>;
    let courseService: jasmine.SpyObj<CourseService>;
    let loadingService: jasmine.SpyObj<LoadingService>;
    let loginService: jasmine.SpyObj<LoginService>;
    let dialog: jasmine.SpyObj<MatDialog>;
    let snackBar: jasmine.SpyObj<MatSnackBar>;

    beforeEach(() => {
        const courseServiceSpy = jasmine.createSpyObj('CourseService', ['getCourses', 'editCourse', 'addCourse', 'deleteCourse']);
        const loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['setIsLoading']);
        const loginServiceSpy = jasmine.createSpyObj('LoginService', ['isAdmin$']);
        const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
        const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

        TestBed.configureTestingModule({
            declarations: [CourseComponent],
            providers: [
                { provide: CourseService, useValue: courseServiceSpy },
                { provide: LoadingService, useValue: loadingServiceSpy },
                { provide: LoginService, useValue: loginServiceSpy },
                { provide: MatDialog, useValue: dialogSpy },
                { provide: MatSnackBar, useValue: snackBarSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(CourseComponent);
        component = fixture.componentInstance;
        courseService = TestBed.inject(CourseService) as jasmine.SpyObj<CourseService>;
        loadingService = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;
        loginService = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
        dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
        snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load data on initialization', () => {
        const courses: Course[] = [
            { id: '1', name: 'Course 1', description: 'Description 1', dateFrom: new Date(), dateTo: new Date() },
            { id: '2', name: 'Course 2', description: 'Description 2', dateFrom: new Date(), dateTo: new Date() }
        ];
        courseService.getCourses.and.returnValue(of(courses));

        component.ngOnInit();

        expect(loadingService.setIsLoading).toHaveBeenCalledWith(true);
        expect(courseService.getCourses).toHaveBeenCalled();
        expect(component.dataSource).toEqual(courses);
        expect(loadingService.setIsLoading).toHaveBeenCalledWith(false);
    });

    it('should open course detail dialog', () => {
        const course: Course = { id: '1', name: 'Course 1', description: 'Description 1', dateFrom: new Date(), dateTo: new Date() };
        const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
        dialogRefSpy.afterClosed.and.returnValue(of());

        dialog.open.and.returnValue(dialogRefSpy);

        component.openCourseDetail(course);

        expect(dialog.open).toHaveBeenCalledWith(CourseDetailComponent, { data: course });
    });

    it('should open course form dialog', () => {
        const course: Course = { id: '1', name: 'Course 1', description: 'Description 1', dateFrom: new Date(), dateTo: new Date() };
        const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
        dialogRefSpy.afterClosed.and.returnValue(of());

        dialog.open.and.returnValue(dialogRefSpy);

        component.openCourseForm(course);

        expect(dialog.open).toHaveBeenCalledWith(CourseFormComponent, { data: course });
    });

    it('should update course', () => {
        const courses: Course[] = [
            { id: '1', name: 'Course 1', description: 'Description 1', dateFrom: new Date(), dateTo: new Date() },
            { id: '2', name: 'Course 2', description: 'Description 2', dateFrom: new Date(), dateTo: new Date() }
        ];
        const updatedCourse: Partial<Course> = { name: 'Updated Course' };
        const expectedCourses: Course[] = [
            { id: '1', name: 'Updated Course', description: 'Description 1', dateFrom: new Date(), dateTo: new Date() },
            { id: '2', name: 'Course 2', description: 'Description 2', dateFrom: new Date(), dateTo: new Date() }
        ];

        const result = component.update(courses, '1', updatedCourse);

        expect(result).toEqual(expectedCourses);
    });

    it('should delete course', () => {
        const course: Course = { id: '1', name: 'Course 1', description: 'Description 1', dateFrom: new Date(), dateTo: new Date() };
        const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
        dialogRefSpy.afterClosed.and.returnValue(of(true));

        dialog.open.and.returnValue(dialogRefSpy);
        courseService.deleteCourse.and.returnValue(of(course));

        component.deleteCourse(course);

        expect(dialog.open).toHaveBeenCalledWith(ConfirmationDialogComponent, {
            data: {
                message: 'Desea eliminar el curso?',
                buttonText: {
                    ok: 'Aceptar',
                    cancel: 'Cancelar'
                }
            }
        });
        expect(courseService.deleteCourse).toHaveBeenCalledWith(course.id);
        expect(component.dataSource).not.toContain(course);
    });

});