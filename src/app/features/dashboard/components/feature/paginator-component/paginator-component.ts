import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator-component',
  imports: [MatPaginatorModule],
  templateUrl: './paginator-component.html',
  styleUrl: './paginator-component.scss',
})
export class PaginatorComponent {
  @Input() dataLength!: number;
  @Input() size!: number;
  @Output() onPaginatorEvent = new EventEmitter<PageEvent>();

  onPageEvent(data: PageEvent) {
    this.onPaginatorEvent.emit(data);
  }
}
