import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@core/services/auth/auth-service';
import { SnackbarService } from '@core/services/snackbar/snackbar-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private _authService = inject(AuthService);
  private _snackbar = inject(SnackbarService);

  getCurrentUser() {
    this._authService.getCurrentUser().subscribe({
      next: (response) => {
        this._authService.setCurrentUser(response);
      },
      error: () => {
        this._snackbar.error('Error fetching current user details');
      },
    });
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }
}
