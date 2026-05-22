import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {  IRouterList } from '@features/dashboard/models/routers.model';
import { ButtonComponent } from "@shared/components/ui/button-component/button-component";

@Component({
  selector: 'app-router-card',
  imports: [MatIconModule, ButtonComponent],
  templateUrl: './router-card.html',
  styleUrl: './router-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouterCard {
  @Input() router: IRouterList | null = null;
  @Output() viewSalesClicked = new EventEmitter<string>();
  @Output() viewCollectionClicked = new EventEmitter<string>();

  onViewSalesClick() {
    console.log('View clicked for router:', this.router);
    if (this.router) {
      this.viewSalesClicked.emit(this.router.id);
    }
  }

  onViewCollectionClick() {
    console.log('View Collection clicked for router:', this.router);
    if (this.router) {
      this.viewCollectionClicked.emit(this.router.id);
    }
  }
}
