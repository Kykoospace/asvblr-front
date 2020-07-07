import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPaymentModeCardComponent } from './subscription-payment-mode-card.component';

describe('SubscriptionPaymentModeCardComponent', () => {
  let component: SubscriptionPaymentModeCardComponent;
  let fixture: ComponentFixture<SubscriptionPaymentModeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionPaymentModeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionPaymentModeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
