import { Component, Input, signal } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { IRouterCashData } from '@features/dashboard/models/userRouters.model';

@Component({
  selector: 'app-router-sales-card-component',
  imports: [MatCard],
  templateUrl: './router-sales-card-component.html',
  styleUrl: './router-sales-card-component.scss',
})
export class RouterSalesCardComponent {
  @Input() routerCashData = signal<IRouterCashData | null>(null);
}
