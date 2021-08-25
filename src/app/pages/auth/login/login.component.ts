import { Component, OnInit, OnDestroy } from '@angular/core';
import {ApiService} from 'src/app/services/api.service';
import {FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({ selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.css'] })
    
export class LoginComponent implements OnInit, OnDestroy {

    private subscription: Subscription = new Subscription;

    hide = true;

    private isValidDNI = /^\d+$/;

    loginForm = this.fb.group({
        username: ['',
            [
                Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.isValidDNI)
            ]
        ],
        password: [
            '',
            [
                Validators.required, Validators.minLength(10)
            ]
        ]
    });

    constructor(private authService : ApiService, private fb : FormBuilder, private router : Router, private cookieService: CookieService) {}

    ngOnInit(): void {}

    isLogin() {
        
        const formValue = this.loginForm.value;
        this.subscription.add(this.authService.login(formValue).subscribe(res => {
            if (res) {
                this.authService.saveToken(res.token, res.user);
                this.cookieService.set('token_access', res.token , 1, '/');
                this.router.navigate(['/'])
            }
        }));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    getErrorMessage(field: string): string {
        let message = '';
        if (this.loginForm.get(field)?.errors?.required) {
            message = 'Campo requerido'
        } else if (this.loginForm.get(field)?.hasError('pattern')) {
            message = 'Cedula incorrecta'
        } else if (this.loginForm.get(field)?.hasError('maxlength')) {
            message = 'Cedula incorrecta'
        } else if (this.loginForm.get(field)?.hasError('minlength')) {
            const minLength = this.loginForm.get(field)?.errors?.minlength.requiredLength;
            message = `Se requieren minimo ${minLength} caracteres`
        }

        return message;
    }

    isValidField(field:string): boolean {
        return ((this.loginForm.get(field)?.touched || this.loginForm.get(field)?.dirty) && !this.loginForm.get(field)?.valid) || false
    }

}
