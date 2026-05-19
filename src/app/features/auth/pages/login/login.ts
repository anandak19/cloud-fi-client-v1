import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth-service';
import { SnackbarService } from '@core/services/snackbar/snackbar-service';
import { ILoginData } from '@features/auth/models/login.model';
import { ButtonComponent } from '@shared/components/ui/button-component/button-component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ButtonComponent,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  isLoading = signal<boolean>(false);
  isSubmited = signal<boolean>(false);
  private _fb = inject(FormBuilder);

  private _auth = inject(AuthService);
  private _router = inject(Router);
  private _snackbar = inject(SnackbarService);
  private _destroyRef = inject(DestroyRef);

  initForm() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmited.set(true);
    if (this.loginForm.invalid) return;

    const loginFormVals = this.loginForm.value as ILoginData;

    const loginData: ILoginData = {
      email: loginFormVals.email.trim(),
      password: loginFormVals.password,
    };

    this.isLoading.set(true);
    this._auth
      .login(loginData)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe({
        next: (res) => {
          this._auth.getCurrentUser().subscribe({
            next: (response) => {
              this._auth.setCurrentUser(response);
            },
          });
          this._snackbar.success('Login Success');
          this._router.navigate(['dashboard']);
        },
        error: (err) => {
          console.log(err);
          this._snackbar.error('Faild to login');
        },
      });

    console.log(this.loginForm.value);
  }

  get emailError() {
    if (this.loginForm.get('email')?.hasError('required')) return 'Email is required';
    else if (this.loginForm.get('email')?.hasError('email')) return 'Invalid Email format';
    else return 'Invalid value';
  }

  get passwordError() {
    if (this.loginForm.get('password')?.hasError('required')) return 'Password is required';
    else return 'Invalid value';
  }

  ngOnInit(): void {
    this.initForm();
  }
}
