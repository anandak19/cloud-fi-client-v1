import { AfterViewInit, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackbarService } from '@core/services/snackbar/snackbar-service';
import { ISalesAnalyticsResponse } from '@features/dashboard/models/analytics.model';
import { AnalyticsService } from '@features/dashboard/services/analytics/analytics-service';
import { Chart } from 'chart.js/auto';
import { of } from 'rxjs';
import { PageTitleComponent } from "@features/dashboard/components/ui/page-title-component/page-title-component";

@Component({
  selector: 'app-analytics',
  imports: [PageTitleComponent],
  templateUrl: './analytics.html',
  styleUrl: './analytics.scss',
})
export class Analytics implements AfterViewInit {
  private _analyticsService = inject(AnalyticsService);
  private _destroyRef = inject(DestroyRef);
  private _snackbar = inject(SnackbarService);

  ngAfterViewInit(): void {
    const salesData: ISalesAnalyticsResponse = [];

    this.getData();
  }

  getData() {
    this._analyticsService
      .getSalesAnalytics()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (data) => {
          this._snackbar.success('Sales analytics data fetched successfully');
          this.renderChart(data);
        },
        error: (error) => {
          this._snackbar.error('Failed to fetch sales analytics data');
        },
      });
  }

  renderChart(data: ISalesAnalyticsResponse) {
    new Chart('salesChart', {
      type: 'bar',
      data: {
        labels: data.map((item) => item.date),
        datasets: [
          {
            label: 'Sales Count',
            data: data.map((item) => item.salesCount),
          },
        ],
      },
    });
  }
}
