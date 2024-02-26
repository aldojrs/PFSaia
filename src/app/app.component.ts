import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { LoadingService } from '../core/services/loading.service';
import { LoginService } from '../features/login/service/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {

    @ViewChild(MatSidenav) sidenav!: MatSidenav;

    loadingSubscription?: Subscription;
    isLoggedSubscription?: Subscription;

    isLoading = false;
    isUserLogged = false;

    constructor(private router: Router, private loadingService: LoadingService, private loginService: LoginService) {
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
                });
            },
        });
    }

    toggleMenu() {
        this.sidenav.toggle();
    }

    logout() {
        this.loginService.logout();
        this.router.navigate(['login']);
    }

    ngOnDestroy(): void {
        this.loadingSubscription?.unsubscribe();
        this.isLoggedSubscription?.unsubscribe();
    }

}

