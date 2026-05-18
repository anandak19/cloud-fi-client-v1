import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IRouter, IRouterList } from '@features/dashboard/models/routers.model';

@Component({
  selector: 'app-router-card',
  imports: [MatIconModule],
  templateUrl: './router-card.html',
  styleUrl: './router-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouterCard {
  @Input() router: IRouterList | null = null;
  @Output() viewClicked = new EventEmitter<string>();

  onViewClick() {
    console.log('View clicked for router:', this.router);
    if (this.router) {
      this.viewClicked.emit(this.router.id);
    }
  }
}
