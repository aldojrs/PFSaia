import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { LoadingService } from '../core/services/loading.service';
import { LoginService } from '../features/login/service/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../features/user/models';
import { UserService } from '../features/user/service/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {

    @ViewChild(MatSidenav) sidenav!: MatSidenav;

    loadingSubscription?: Subscription;
    isLoggedSubscription?: Subscription;
    isAdmiSubscription?: Subscription;

    isLoading = false;
    isUserLogged = false;
    isAdmin = false;
    loggedUser: User | undefined;
    selectedSection = 'Home';

    constructor(private router: Router, private loadingService: LoadingService,
        private loginService: LoginService, private userService: UserService) {
        
        this.loadingSubscription = this.loadingService.isLoading$.subscribe({
            next: (loading) => {
                setTimeout(() => {
                    this.isLoading = loading;
                });
            },
        });

        this.isLoggedSubscription = this.loginService.isLoged$.subscribe({
            next: (isLogged) => {
                setTimeout(() => {
                    this.isUserLogged = isLogged;
                    this.getLoggedUser();
                });
            },
        });

        this.isAdmiSubscription = this.loginService.isAdmin$.subscribe({
            next: (isAdmin) => {
                setTimeout(() => {
                    this.isAdmin = isAdmin;
                });
            },
        });
    }

    getLoggedUser() {
        if (!this.isUserLogged) {
            return;
        }

        this.userService.getLoggedUser().subscribe((user) => {
            this.loggedUser = user;
        });
    }

    toggleMenu() {
        this.sidenav.toggle();
    }

    logout() {
        this.loggedUser = undefined;
        this.loginService.logout();
        this.router.navigate(['login']);
    }

    changeSection(section: string) {
        this.selectedSection = section;
    }

    ngOnDestroy(): void {
        this.loadingSubscription?.unsubscribe();
        this.isLoggedSubscription?.unsubscribe();
        this.isAdmiSubscription?.unsubscribe();
    }

}

