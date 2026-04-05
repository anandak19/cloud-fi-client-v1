import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterSalesCardComponent } from './router-sales-card-component';

describe('RouterSalesCardComponent', () => {
  let component: RouterSalesCardComponent;
  let fixture: ComponentFixture<RouterSalesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterSalesCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouterSalesCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
