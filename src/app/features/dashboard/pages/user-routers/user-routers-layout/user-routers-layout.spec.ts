import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoutersLayout } from './user-routers-layout';

describe('UserRoutersLayout', () => {
  let component: UserRoutersLayout;
  let fixture: ComponentFixture<UserRoutersLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRoutersLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRoutersLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
