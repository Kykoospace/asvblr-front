import { Component, OnInit } from '@angular/core';
import {ManagementService} from '../../shared/services/api/management/management.service';
import {MessageService} from 'primeng';
import Price from '../../shared/models/entities/Price';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnInit {

  public prices: Price[];

  constructor(
    private managementService: ManagementService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.managementService.getAllPrices()
      .subscribe(
        prices => this.prices = prices,
        err => console.error(err)
      );
  }

  public updatePrices(): void {
    if (this.allPricesValid()) {
      this.managementService.updatePrices(this.prices)
        .subscribe(
          prices => this.messageService.add({
            severity: 'success',
            summary: 'Les prix ont été mis à jour'
          })
        );
    }
  }

  public allPricesValid(): boolean {
    let invalid = false;
    this.prices.forEach(
      price => {
        if (typeof price.price !== 'number') {
          invalid = true;
        }
      }
    );
    return !invalid;
  }
}
