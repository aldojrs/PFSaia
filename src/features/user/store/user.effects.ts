import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserActions } from './user.actions';
import { UserService } from '../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UserEffects {

    loadUsers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.loadUsers),
            concatMap(() =>
                this.userService.getUsers().pipe(
                    map(data => UserActions.loadUsersSuccess({ data })),
                    catchError(error => of(UserActions.userFailure({ error }))))
            )
        );
    });

    createUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.createUser),
            concatMap((action) => {
                return this.userService.addUser(action.data).pipe(
                    map((resp) => UserActions.userSuccess({ data: 'creado' })),
                    catchError((error) => of(UserActions.userFailure({ error })))
                );
            })
        );
    });

    updateUsers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.updateUser),
            concatMap((action) => {
                return this.userService.editUser(action.data).pipe(
                    map((resp) => UserActions.userSuccess({ data: 'actualizado' })),
                    catchError((error) => of(UserActions.userFailure({ error })))
                );
            })
        );
    });

    deleteUsers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.deleteUser),
            concatMap((action) => {
                return this.userService.deleteUser(action.id).pipe(
                    map((resp) => UserActions.userSuccess({ data: 'eliminado' })),
                    catchError((error) => of(UserActions.userFailure({ error })))
                );
            })
        );
    });

    userSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.userSuccess),
            switchMap((resp) => {
                this._snackBar.open(`Usuario ${resp.data} exitosamente`, 'Ok', { duration: 3000 });
                return of(UserActions.loadUsers());
            })
        )
    );

    userFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.userFailure),
            switchMap((error) => {
                this._snackBar.open(error.error.message, 'Ok', { duration: 3000 });
                return of({ type: '[User] No Action' });
            })
        )
    );

    constructor(private actions$: Actions, private userService: UserService, private _snackBar: MatSnackBar) { }
}
