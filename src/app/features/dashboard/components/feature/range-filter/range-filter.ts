import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/select';
import { ButtonComponent } from '@shared/components/ui/button-component/button-component';

@Component({
  selector: 'app-range-filter',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    FormsModule,
    MatLabel,
    MatDatepickerModule,
    MatInputModule,
    MatFormField,
    MatNativeDateModule,
    ButtonComponent,
  ],
  templateUrl: './range-filter.html',
  styleUrl: './range-filter.scss',
})
export class RangeFilter {
  @Output() filterApplied = new EventEmitter<{ startDate: string; endDate: string }>();
  @Output() filterReset = new EventEmitter<void>();

  private _fb = inject(FormBuilder);
  isSubmited = signal<boolean>(false)

  rangeForm = this._fb.group(
    {
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    },
    {
      validators: this.dateRangeValidator,
    },
  );

  /**
   * Custom Validator
   * startDate must be less than endDate
   */
  dateRangeValidator(control: AbstractControl): ValidationErrors | null {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;

    if (!startDate || !endDate) {
      return null;
    }

    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    /**
     * Invalid if:
     * start >= end
     */
    if (start >= end) {
      control.get('endDate')?.setErrors({ invalidDateRange: true });
      return {
        invalidDateRange: true,
      };
    }

    return null;
  }

  applyFilter() {
    this.isSubmited.set(true);
    if (this.rangeForm.invalid) return;

    const startDateValue = this.rangeForm.get('startDate')?.value;
    const endDateValue = this.rangeForm.get('endDate')?.value;
    if (!startDateValue || !endDateValue) return;
    
    this.filterApplied.emit({
      startDate: this.toDateString(startDateValue),
      endDate: this.toDateString(endDateValue),
    });
  }

  private toDateString(value: unknown): string {
    const date =
      value !== null && typeof value === 'object' && value instanceof Date
        ? value
        : new Date(String(value));

    return date.toISOString().split('T')[0];
  }

  reset() {
    this.rangeForm.reset();
    this.filterReset.emit();
  }

  get startDateError(): string {
    if (!this.isSubmited()) {
      return '';
    }
    const control = this.rangeForm.get('startDate');

    if (control?.hasError('required')) {
      return 'Start date is required';
    }

    if (this.rangeForm.hasError('invalidDateRange')) {
      return 'Invalid date range';
    }

    return '';
  }

  get endDateError(): string {
    if (!this.isSubmited()) {
      return '';
    }
    const control = this.rangeForm.get('endDate');

    if (control?.hasError('required')) {
      return 'End date is required';
    }

    if (this.rangeForm.hasError('invalidDateRange')) {
      return 'Invalid date range';
    }

    return '';
  }
}
