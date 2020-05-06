import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TeamService} from '../../shared/services/api/team/team.service';
import PaymentMode from '../../shared/models/entities/PaymentMode';
import {ManagementService} from '../../shared/services/api/management/management.service';
import Subscription from '../../shared/models/entities/Subscription';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  paymentModesOptions = [];
  categoryOptions= [];

  subscriptionForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    private managementService: ManagementService
  ) {
    this.subscriptionForm = this.formBuilder.group({
      firstName: this.formBuilder.control('', [ Validators.required ]),
      lastName: this.formBuilder.control('', [ Validators.required ]),
      gender: this.formBuilder.control('', [ Validators.required ]),
      birthDate: this.formBuilder.control('', [ Validators.required ]),
      birthCountry: this.formBuilder.control('', [ Validators.required ]),
      address: this.formBuilder.control('', [ Validators.required ]),
      postcode: this.formBuilder.control('', [ Validators.required ]),
      city: this.formBuilder.control('', [ Validators.required ]),
      email: this.formBuilder.control('', [ Validators.required ]),
      phoneNumber: this.formBuilder.control('', [ Validators.required ]),
      idCategory: this.formBuilder.control('', [ Validators.required ]),
      idPaymentMode: this.formBuilder.control('', [ Validators.required ]),
      idSeason: this.formBuilder.control('', [ Validators.required ]),
      insurance: this.formBuilder.control('', [ Validators.required ])
    });

    this.managementService.getAllPaymentModes()
      .subscribe(paymentModes => {
        paymentModes.forEach(paymentMode => {
          this.paymentModesOptions.push({
            label: paymentMode.name,
            value: paymentMode.id
          });
        });
      });

    this.teamService.getAllCategories()
      .subscribe(categories => {
        categories.forEach(category => {
          this.categoryOptions.push({
            label: category.name,
            value: category.id
          });
        });
      });
  }

  ngOnInit(): void { }

  public sendSubscription() {
    let subscription: Subscription = this.subscriptionForm.value;
    subscription.season = 1;
    console.log(subscription);
    this.teamService.createSubscription(this.subscriptionForm.value)
      .subscribe(subscription => {
        console.log('Inscription faite');
      });
  }

}
