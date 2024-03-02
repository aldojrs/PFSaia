import { Injectable } from '@angular/core';
import { Login } from '../models';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Role, User } from '../../user/models';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private isLogedTriggered$ = new BehaviorSubject<boolean>(true);
    public isLoged$ = this.isLogedTriggered$.asObservable();

    private isAdminTriggered$ = new BehaviorSubject<boolean>(false);
    public isAdmin$ = this.isAdminTriggered$.asObservable();

    constructor(private httpClient: HttpClient) { }

    login(data: Login): Observable<User[]> {
        return this.httpClient.get<User[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`)
            .pipe(
                tap((users: User[]) => {
                    if (users[0]) {
                        this.isLogedTriggered$.next(true);
                        this.isAdminTriggered$.next(users[0]?.role === Role.ADMIN);
                        localStorage.setItem('token', users[0].token);
                    }
                })
            );
    }

    isUserAdmin(): Observable<boolean> {
        return this.verifyToken().pipe(
            map((users: User[]) => {
                const isAdmin = users[0]?.role === Role.ADMIN;
                this.isAdminTriggered$.next(isAdmin);

                return isAdmin;
            })
        );
    }

    verifyToken(): Observable<User[]> {
        return this.httpClient.get<User[]>(`http://localhost:3000/users?token=${localStorage.getItem('token')}`)
            .pipe(
                tap((users: User[]) => {
                    if (!users[0]) {
                        this.isLogedTriggered$.next(false);
                        localStorage.removeItem('token');
                    } else {
                        this.isLogedTriggered$.next(true);
                        this.isAdminTriggered$.next(users[0]?.role === Role.ADMIN);
                    }
                })
            );
    }

    logout(): void {
        this.isAdminTriggered$.next(false);
        this.isLogedTriggered$.next(false);
        localStorage.removeItem('token');
    }

}
