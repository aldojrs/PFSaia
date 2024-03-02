import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './service/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnDestroy {

    loggedSubscription: Subscription;
    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) {

        this.loggedSubscription = this.loginService.isLoged$.subscribe({
            next: (isLogged) => {
                setTimeout(() => {
                    if (isLogged) {
                        this.router.navigate(['home']);
                    }
                });
            },
        });

        this.loginForm = this.fb.group({
            email: this.fb.control('', [Validators.required, Validators.email]),
            password: this.fb.control('', [Validators.required]),
        });
    }

    onSubmit(): void {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
        } else {
            this.loginService.login(this.loginForm.value).subscribe((users) => {
                if (!!users[0]) {
                    this.router.navigate(['home']);
                } else {
                    this.loginForm.setErrors({ invalidCredentials: true });
                }
            });
        }
    }

    ngOnDestroy(): void {
        this.loggedSubscription.unsubscribe();
    }
}
