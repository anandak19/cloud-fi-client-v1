import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { ICollectionsResponse } from '@features/dashboard/models/collections.model';

@Component({
  selector: 'app-router-collection-summary-card',
  imports: [MatCard],
  templateUrl: './router-collection-summary-card.html',
  styleUrl: './router-collection-summary-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouterCollectionSummaryCard {
  @Input() collectionSummary = signal<ICollectionsResponse | null>(null);
}
