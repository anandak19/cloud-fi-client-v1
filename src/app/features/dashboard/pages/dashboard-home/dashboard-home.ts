import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCard } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DashboardHomeService } from '@features/dashboard/services/dashboard-home/dashboard-home-service';
import { IUserFinancialSummary } from '@features/dashboard/models/user.model';
import { DecimalPipe } from '@angular/common';
import { SnackbarService } from '@core/services/snackbar/snackbar-service';

@Component({
  selector: 'app-dashboard-home',
  imports: [MatIconModule, MatCard, DecimalPipe],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.scss',
})
export class DashboardHome implements OnInit {
  private _dashboardHomeService = inject(DashboardHomeService);
  private _destroyRef = inject(DestroyRef);
  private _snackbar = inject(SnackbarService);

  userFinancialSummary = signal<IUserFinancialSummary | null>(null);

  getUserFinancialSummary() {
    this._dashboardHomeService
      .getUserFinancialSummary()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (response) => {
          this.userFinancialSummary.set(response);
        },
        error: () => {
          this._snackbar.error('Error fetching financial summary');
        },
      });
  }

  ngOnInit() {
    this.getUserFinancialSummary();
  }
}
