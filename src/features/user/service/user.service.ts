import { Injectable } from '@angular/core';
import { Observable, map, mergeMap, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../user/models';
import { LoadingService } from '../../../core/services/loading.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private httpClient: HttpClient, private loadingService: LoadingService) { }

    getUsers(): Observable<User[]> {
        this.loadingService.setIsLoading(true);
        return this.httpClient.get<User[]>('http://localhost:3000/users').pipe(
            tap(() => {
                this.loadingService.setIsLoading(false);
            })
        );
    }

    getLoggedUser(): Observable<User> {
        return this.httpClient.get<User[]>(`http://localhost:3000/users?token=${localStorage.getItem('token')}`).pipe(
            map((users) => {
                return users[0];
            })
        );
    }

    addUser(user: User): Observable<User> {
        this.loadingService.setIsLoading(true);
        return this.httpClient.get<User[]>(`http://localhost:3000/users?email=${user.email}`)
            .pipe(
                mergeMap((existingUser) => {
                    if (existingUser && existingUser.length > 0) {
                        this.loadingService.setIsLoading(false);
                        const err = new Error(`El email: ${user.email} ya existe`);
                        return throwError(() => err);
                    }

                    return this.httpClient.post<User>(`http://localhost:3000/users`, user).pipe(
                        tap(() => {
                            this.loadingService.setIsLoading(false);
                        })
                    );
                })
            );
    }

    editUser(user: User): Observable<User> {
        this.loadingService.setIsLoading(true);
        return this.httpClient.get<User[]>(`http://localhost:3000/users?email=${user.email}&id_ne=${user.id}`)
            .pipe(
                mergeMap((existingUser) => {
                    if (existingUser && existingUser.length > 0) {
                        this.loadingService.setIsLoading(false);
                        const err = new Error(`El email: ${user.email} ya existe`);
                        return throwError(() => err);
                    }

                    return this.httpClient.put<User>(`http://localhost:3000/users/${user.id}`, user).pipe(
                        tap(() => {
                            this.loadingService.setIsLoading(false);
                        })
                    );
                })
            );
    }

    deleteUser(userId: string): Observable<User> {
        this.loadingService.setIsLoading(true);
        return this.httpClient.delete<User>(`http://localhost:3000/users/${userId}`).pipe(
            tap(() => {
                this.loadingService.setIsLoading(false);
            })
        );
    }

}
