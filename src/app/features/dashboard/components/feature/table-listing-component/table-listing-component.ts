import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ButtonComponent } from '@shared/components/ui/button-component/button-component';
import { IMatColumns } from '@shared/interfaces/table.interface';

@Component({
  selector: 'app-table-listing-component',
  imports: [MatTableModule, CommonModule, ButtonComponent],
  templateUrl: './table-listing-component.html',
  styleUrl: './table-listing-component.scss',
})
export class TableListingComponent<T> {
  @Input() columns!: IMatColumns[]; // array of object containing column info
  @Input() dataSource: T[] = []; // array of data to show in table
  @Input() editable = true;
  @Input() actions = true;

  @Output() viewClicked = new EventEmitter<string>();
  @Output() editClicked = new EventEmitter<string>();

  get displayedColumns(): string[] {
    const cols = this.columns.map((c) => c.key);

    if (this.actions) {
      return [...cols, 'actions'];
    }

    return cols;
  }

  onViewBtnClick(id: string) {
    this.viewClicked.emit(id);
  }

  onEditBtnClick(id: string) {
    this.editClicked.emit(id);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource']) {
    }
  }
}
