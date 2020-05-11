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

  public static formLabelValues = {
    address: 'Adresse',
    birthCountry: 'Pays de naissance',
    birthDate: 'Date de naissance',
    city: 'Ville',
    coach: 'Êtes-vous un(e) coach ?',
    email: 'Email',
    equipment: 'Souhaitez-vous acheter un tenue au couleurs de votre équipe ?',
    firstName: 'Prénom',
    gender: 'Sexe',
    idCategory: 'Catégorie de niveau souhaitée',
    idPaymentMode: 'Mode de paiement',
    insurance: 'Souhaitez-vous prendre l\'assurance supplémentaire ?',
    lastName: 'Nom de famille',
    pantsSize: 'Taille de pantalon',
    phoneNumber: 'Nméro de téléphone',
    postcode: 'Code postal',
    referee: 'Êtes-vous un(e) arbitre ?',
    requestedJerseyNumber: 'Numéro de maillot souhaité',
    topSize: 'Taille de haut'
  };

  paymentModesOptions = [];
  categoryOptions = [];

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
      email: this.formBuilder.control('', [ Validators.required ]),
      phoneNumber: this.formBuilder.control('', [ Validators.required ]),
      birthDate: this.formBuilder.control('', [ Validators.required ]),
      birthCountry: this.formBuilder.control('', [ Validators.required ]),
      address: this.formBuilder.control('', [ Validators.required ]),
      postcode: this.formBuilder.control('', [ Validators.required ]),
      city: this.formBuilder.control('', [ Validators.required ]),
      equipment: this.formBuilder.control('', [ Validators.required ]),
      requestedJerseyNumber: this.formBuilder.control('', [ Validators.required ]),
      topSize: this.formBuilder.control('', [ Validators.required ]),
      pantSize: this.formBuilder.control('', [ Validators.required ]),
      idCategory: this.formBuilder.control('', [ Validators.required ]),
      idPaymentMode: this.formBuilder.control('', [ Validators.required ]),
      idSeason: this.formBuilder.control('', [ Validators.required ]),
      insurance: this.formBuilder.control('', [ Validators.required ]),
      referee: this.formBuilder.control('', [ Validators.required ]),
      coach: this.formBuilder.control('', [ Validators.required ]),
      comment: this.formBuilder.control(''),
    });

    console.log('Get all payment modes');
    this.managementService.getAllPaymentModes()
      .subscribe(paymentModes => {
        paymentModes.forEach(paymentMode => {
          this.paymentModesOptions.push({
            label: paymentMode.name,
            value: paymentMode.id
          });
        });
      });

    console.log('Get all categories');
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

  public sendSubscription() { }

}
