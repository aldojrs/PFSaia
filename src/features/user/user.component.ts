import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from './models';
import { Store } from '@ngrx/store';
import { createUser, deleteUser, selectUsers, updateUser } from './store/user.selectors';
import { UserActions } from './store/user.actions';
import { UserFormComponent } from './dialogs/user-form/user-form.component';
import { ConfirmationDialogComponent } from '../../shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html'
})
export class UserComponent implements OnInit, OnDestroy {

    displayedColumns: string[] = ['id', 'fullName', 'email', 'role', 'actions'];
    dataSource!: User[];

    usersSubscripion?: Subscription;
    createSubscripion?: Subscription;
    updateSubscripion?: Subscription;
    deleteSubscripion?: Subscription;

    constructor(private store: Store, private dialog: MatDialog, private _snackBar: MatSnackBar) {
        this.store.dispatch(UserActions.loadUsers());
    }

    ngOnInit(): void {
        this.loadData();
    }

    private loadData(): void {
        this.usersSubscripion = this.store.select(selectUsers).subscribe({
            next: (users) => {
                this.dataSource = [...users];
            },
        });
    }

    openUserForm(user?: User) {
        const dialogRef = this.dialog.open(UserFormComponent, {
            data: user,
        });

        dialogRef.afterClosed().subscribe(result => {

            if (!result) return;

            if (user) { // If the user is not null, it means that we are editing an existing user
                const userEdited = { ...user, ...result };

                this.store.dispatch(UserActions.updateUser({ data: userEdited }));
                this.updateSubscripion = this.store.select(updateUser).subscribe();
            } else { // If the user is null, it means that we are creating a new user
                const userCreated = { ...result };

                userCreated.password = '123456'; // default password
                userCreated.token = Math.random().toString(36).substring(2, 15); // random token

                this.store.dispatch(UserActions.createUser({ data: userCreated }));
                this.createSubscripion = this.store.select(createUser).subscribe();
            }
        });
    }

    deleteUser(user: User) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
                message: 'Desea eliminar el usuario?',
                buttonText: {
                    ok: 'Aceptar',
                    cancel: 'Cancelar'
                }
            }
        });

        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
            if (confirmed) {
                this.store.dispatch(UserActions.deleteUser({ id: user.id }));
                this.deleteSubscripion = this.store.select(deleteUser).subscribe();
            }
        });
    }

    ngOnDestroy(): void {
        this.usersSubscripion?.unsubscribe();
        this.createSubscripion?.unsubscribe();
        this.updateSubscripion?.unsubscribe();
        this.deleteSubscripion?.unsubscribe();
    }

}
