import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { ISalesSummery } from '@features/dashboard/models/sales.model';
import { IRouterCashData } from '@features/dashboard/models/userRouters.model';

@Component({
  selector: 'app-router-sales-card-component',
  imports: [MatCard],
  templateUrl: './router-sales-card-component.html',
  styleUrl: './router-sales-card-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouterSalesCardComponent {
  @Input() routerSalesSummary = signal<ISalesSummery | null>(null);
}
