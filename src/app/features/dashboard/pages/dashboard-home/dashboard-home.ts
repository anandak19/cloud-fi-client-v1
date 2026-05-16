import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DashboardHomeService } from '@features/dashboard/services/dashboard-home/dashboard-home-service';
import { IUser } from '@features/dashboard/models/user.model';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-home',
  imports: [MatIconModule, MatCard, DecimalPipe],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.scss',
})
export class DashboardHome implements OnInit {
  private _dashboardHomeService = inject(DashboardHomeService);
  private _destroyRef = inject(DestroyRef);

  // user: IUser = {
  //   id: '1',
  //   email: 'john@example.com',
  //   phoneNumber: '+91 9876543210',
  //   username: 'John Doe',
  //   userType: 'Admin',
  //   totalSales: 45000,
  //   totalCollectedCash: 43500,
  //   blanceLeft: 6500,
  //   userCollectedCash: 25000,
  // };

  userDetails = signal<IUser | null>(null);

  ngOnInit() {
    this._dashboardHomeService
      .getUserDetails()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (response) => {
          console.log('User details fetched successfully:', response);
          this.userDetails.set(response);
        },
        error: (error) => {
          console.error('Error fetching user details:', error);
        },
      });
  }
}
