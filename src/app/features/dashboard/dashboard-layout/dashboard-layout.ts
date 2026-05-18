import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, DestroyRef, inject, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth-service';
import { SnackbarService } from '@core/services/snackbar/snackbar-service';
import { ButtonComponent } from '@shared/components/ui/button-component/button-component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-dashboard-layout',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    ButtonComponent,
  ],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.scss',
})
export class DashboardLayout {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isSidebarOpen = true;
  isHandset = signal<boolean>(false);

  private _auth = inject(AuthService);
  private _snackbar = inject(SnackbarService);
  private breakpointObserver = inject(BreakpointObserver);
  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);

  currentUser = this._auth.currentUser;

  constructor() {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isHandset.set(result.matches);
    });
  }

  onNavLinkClick() {
    if (this.isHandset() && this.sidenav) {
      this.sidenav.close();
    }
  }

  onLogout() {
    this._auth
      .logout()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => {
          this._snackbar.success('Account logout successfully');
          this._router.navigate(['/login']);
        },
        error: () => {
          this._snackbar.error('An error occoured while logging out');
        },
      });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  
}
