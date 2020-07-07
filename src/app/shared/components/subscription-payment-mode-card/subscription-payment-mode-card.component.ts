import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import SubscriptionPaymentMode from '../../models/responses/SubscriptionPaymentMode';

@Component({
  selector: 'app-subscription-payment-mode-card',
  templateUrl: './subscription-payment-mode-card.component.html',
  styleUrls: ['./subscription-payment-mode-card.component.scss']
})
export class SubscriptionPaymentModeCardComponent implements OnInit {

  @Output()
  private payPaymentMode: EventEmitter<SubscriptionPaymentMode> = new EventEmitter();
  @Output()
  private unpayPaymentMode: EventEmitter<SubscriptionPaymentMode> = new EventEmitter();

  @Input()
  public subscriptionPaymentMode: SubscriptionPaymentMode;

  constructor() { }

  ngOnInit(): void { }

  public setPaymentModePaied(): void {
    this.payPaymentMode.emit(this.subscriptionPaymentMode);
  }

  public setPaymentModeUnpaied(): void {
    this.unpayPaymentMode.emit(this.subscriptionPaymentMode);
  }
}
