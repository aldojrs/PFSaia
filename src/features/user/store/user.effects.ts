import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserActions } from './user.actions';
import { UserService } from '../service/user.service';

@Injectable()
export class UserEffects {

    loadUsers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.loadUsers),
            concatMap(() =>
                this.userService.getUsers().pipe(
                    map(data => UserActions.loadUsersSuccess({ data })),
                    catchError(error => of(UserActions.loadUsersFailure({ error }))))
            )
        );
    });

    createUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.createUser),
            concatMap((action) => {
                return this.userService.addUser(action.data).pipe(
                    map((resp) => UserActions.userSuccess({ data: resp })),
                    catchError((error) => of(UserActions.createUserFailure({ error })))
                );
            })
        );
    });

    updateUsers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.updateUser),
            concatMap((action) => {
                return this.userService.editUser(action.data).pipe(
                    map((resp) => UserActions.userSuccess({ data: resp })),
                    catchError((error) => of(UserActions.updateUserFailure({ error })))
                );
            })
        );
    });

    deleteUsers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.deleteUser),
            concatMap((action) => {
                return this.userService.deleteUser(action.id).pipe(
                    map((resp) => UserActions.userSuccess({ data: resp })),
                    catchError((error) => of(UserActions.deleteUserFailure({ error })))
                );
            })
        );
    });

    userSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.userSuccess),
            map(() => UserActions.loadUsers())
        );
    });

    constructor(private actions$: Actions, private userService: UserService) { }
}
