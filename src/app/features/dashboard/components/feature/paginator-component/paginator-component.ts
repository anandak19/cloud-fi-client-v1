import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator-component',
  imports: [MatPaginatorModule],
  templateUrl: './paginator-component.html',
  styleUrl: './paginator-component.scss',
})
export class PaginatorComponent {
  @Input() dataLength!: number; // total in db
  @Input() size!: number; // current showing total
  @Output() onPaginatorEvent = new EventEmitter<PageEvent>();

  onPageEvent(data: PageEvent) {
    this.onPaginatorEvent.emit(data);
  }

  /**
   * Needs:
   * - total: total data count in the db
   * - page: current page index
   * - limit: number of items per page (page size: 5, 10, 25, etc)
   * - totalPages: total number of pages (calculated as Math.ceil(total / limit))
   */
}
