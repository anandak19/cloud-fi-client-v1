import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCard } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DashboardHomeService } from '@features/dashboard/services/dashboard-home/dashboard-home-service';
import { IUserFinancialSummary } from '@features/dashboard/models/user.model';
import { DecimalPipe } from '@angular/common';
import { SnackbarService } from '@core/services/snackbar/snackbar-service';
import { ICollectionsResponse } from '@features/dashboard/models/collections.model';
import { ISalesSummery } from '@features/dashboard/models/sales.model';
import { CashCollectionsService } from '@features/dashboard/services/cash-collections/cash-collections';
import { SalesService } from '@features/dashboard/services/sales/sales-service';
import { AuthService } from '@core/services/auth/auth-service';

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
  private _cashCollectionsService = inject(CashCollectionsService);
  private _salesService = inject(SalesService);
  private _authService = inject(AuthService);

  userFinancialSummary = signal<IUserFinancialSummary | null>(null);
  totalCashCollectionData = signal<ICollectionsResponse | null>(null);
  totalSalesData = signal<ISalesSummery | null>(null);

  currentUser = this._authService.currentUser;

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

  getTotalCashCollection() {
    this._cashCollectionsService
      .getTotalCashCollection()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (response) => {
          this.totalCashCollectionData.set(response);
        },
        error: () => {
          this._snackbar.error('Error fetching cash collection data');
        },
      });
  }

  getTotalSalesData() {
    this._salesService
      .getTotalSalesData()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (response) => {
          this.totalSalesData.set(response);
        },
        error: () => {
          this._snackbar.error('Error fetching sales data');
        },
      });
  }

  ngOnInit() {
    this.getUserFinancialSummary();
    if(this.currentUser()?.userType === 'admin') {
      this.getTotalCashCollection();
      this.getTotalSalesData();
    }
  }
}
