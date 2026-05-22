import { Component, DestroyRef, inject, Input, OnInit, signal } from '@angular/core';
import { PageTitleComponent } from '@features/dashboard/components/ui/page-title-component/page-title-component';
import { BackButtonComponent } from '@features/dashboard/components/ui/back-button-component/back-button-component';
import { ICollectionsResponse } from '@features/dashboard/models/collections.model';
import { RouterCollectionSummaryCard } from '@features/dashboard/components/feature/router-collection-summary-card/router-collection-summary-card';
import { CashCollectionsService } from '@features/dashboard/services/cash-collections/cash-collections';
import { SnackbarService } from '@core/services/snackbar/snackbar-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cash-collections',
  imports: [PageTitleComponent, BackButtonComponent, RouterCollectionSummaryCard],
  templateUrl: './cash-collections.html',
  styleUrl: './cash-collections.scss',
})
export class CashCollections implements OnInit {
  @Input() routerId!: string;
  collectionSummary = signal<ICollectionsResponse | null>(null);

  private _cashCollectionsService = inject(CashCollectionsService);
  private _snackbar = inject(SnackbarService);
  private _destroyRef = inject(DestroyRef);

  // collection summary
  getCollectionSummary() {
    this._cashCollectionsService.getRouterCashCollectionSummary(this.routerId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (response) => {
          this.collectionSummary.set(response);
        },
        error: () => {
          this._snackbar.error('Error fetching cash collection data');
        }
      });
  }

  ngOnInit() {
    if(!this.routerId) {
      this._snackbar.error('Select a router to view collection summary');
      return;
    }
    this.getCollectionSummary();
  }
}
