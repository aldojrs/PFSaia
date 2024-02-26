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

    constructor(private httpClient: HttpClient) { }

    login(data: Login): Observable<User[]> {
        return this.httpClient.get<User[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`)
            .pipe(
                tap((users: User[]) => {
                    if (users[0]) {
                        localStorage.setItem('token', users[0].token);
                        this.isLogedTriggered$.next(true);
                    }
                })
            );
    }

    isUserLogged(): Observable<boolean> {
        return this.verifyToken().pipe(
            map((users: User[]) => {
                return !!users[0];
            })
        );
    }

    isUserAdmin(): Observable<boolean> {
        return this.verifyToken().pipe(
            map((users: User[]) => {
                return users[0]?.role === Role.ADMIN;
            })
        );
    }

    verifyToken(): Observable<User[]> {
        return this.httpClient.get<User[]>(`http://localhost:3000/users?token=${localStorage.getItem('token')}`)
            .pipe(
                tap((users: User[]) => {
                    if (!users[0]) {
                        localStorage.removeItem('token');
                        this.isLogedTriggered$.next(false);
                    }
                })
            );
    }

    logout(): void {
        localStorage.removeItem('token');
        this.isLogedTriggered$.next(false);
    }

}
