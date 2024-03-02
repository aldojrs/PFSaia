import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../user/models';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private httpClient: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>('http://localhost:3000/users');
    }

    getLoggedUser(): Observable<User> {
        return this.httpClient.get<User[]>(`http://localhost:3000/users?token=${localStorage.getItem('token')}`).pipe(
            map((users) => {
                return users[0];
            })
        );
    }

    addUser(user: User): Observable<User> {
        return this.httpClient.post<User>(`http://localhost:3000/users`, user);
    }

    editUser(user: User): Observable<User> {
        return this.httpClient.put<User>(`http://localhost:3000/users/${user.id}`, user);
    }

    deleteUser(userId: string): Observable<User> {
        return this.httpClient.delete<User>(`http://localhost:3000/users/${userId}`);
    }

}
