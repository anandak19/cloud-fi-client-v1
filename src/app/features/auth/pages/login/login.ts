import { Component, inject, OnInit, signal } from '@angular/core';
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
    ButtonComponent
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
    loginForm!: FormGroup;
  isLoading = signal<boolean>(false);
  private _fb = inject(FormBuilder);

  private _auth = inject(AuthService);
  private _router = inject(Router);
  private _snackbar = inject(SnackbarService);

  initForm() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const loginFormVals = this.loginForm.value as ILoginData;

    const loginData: ILoginData = {
      email: loginFormVals.email.trim(),
      password: loginFormVals.password,
    };

    this.isLoading.set(true);
    this._auth
      .login(loginData)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (res) => {
          console.log(res);
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

  ngOnInit(): void {
    this.initForm();
  }
}
