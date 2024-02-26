import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './service/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) {
        this.loginForm = this.fb.group({
            email: this.fb.control('', [Validators.required, Validators.email]),
            password: this.fb.control('', [Validators.required]),
        });
    }

    ngOnInit(): void {
        this.loginService.isUserLogged().subscribe((isLogged) => {
            if (isLogged) {
                this.router.navigate(['home']);
            }
        });
    }

    onSubmit(): void {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
        } else {
            this.loginService.login(this.loginForm.value).subscribe((users) => {
                if (!!users[0]) {
                    this.router.navigate(['home']);
                }
            });
        }
    }
}
