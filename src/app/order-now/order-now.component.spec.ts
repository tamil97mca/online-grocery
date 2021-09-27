import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderNowComponent } from './order-now.component';

describe('OrderNowComponent', () => {
  let component: OrderNowComponent;
  let fixture: ComponentFixture<OrderNowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderNowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
