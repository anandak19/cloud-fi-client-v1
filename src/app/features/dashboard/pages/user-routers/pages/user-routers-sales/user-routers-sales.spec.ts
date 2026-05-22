import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoutersSales } from './user-routers-sales';

describe('UserRoutersSales', () => {
  let component: UserRoutersSales;
  let fixture: ComponentFixture<UserRoutersSales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRoutersSales]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRoutersSales);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
