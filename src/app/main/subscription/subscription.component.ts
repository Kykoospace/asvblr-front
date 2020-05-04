import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  subscriptionForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.subscriptionForm = this.formBuilder.group({
      firstName: this.formBuilder.control('', [ Validators.required ]),
      lastName: this.formBuilder.control('', [ Validators.required ]),
      gender: this.formBuilder.control('', [ Validators.required ]),
      birthDate: this.formBuilder.control('', [ Validators.required ]),
      birthContry: this.formBuilder.control('', [ Validators.required ]),
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
  }

  ngOnInit(): void {
  }

}
