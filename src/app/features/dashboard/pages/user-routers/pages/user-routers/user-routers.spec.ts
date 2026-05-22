import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRouters } from './user-routers';

describe('UserRouters', () => {
  let component: UserRouters;
  let fixture: ComponentFixture<UserRouters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRouters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRouters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
