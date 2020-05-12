import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamService } from '../../shared/services/api/team/team.service';
import { ManagementService } from '../../shared/services/api/management/management.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  public formLabelValues = {
    address: 'Adresse',
    birthCountry: 'Pays de naissance',
    birthDate: 'Date de naissance',
    city: 'Ville',
    coach: 'Êtes-vous un(e) coach ?',
    comment: 'Avez-vous autre chose à nous dire ?',
    email: 'Email',
    equipment: 'Souhaitez-vous acheter un tenue au couleurs de votre équipe ?',
    firstName: 'Prénom',
    gender: 'Sexe',
    idCategory: 'Catégorie de niveau souhaitée',
    idPaymentMode: 'Mode de paiement',
    insuranceRequested: 'Souhaitez-vous prendre l\'assurance supplémentaire ?',
    lastName: 'Nom de famille',
    pantSize: 'Taille de pantalon',
    phoneNumber: 'Numéro de téléphone',
    postCode: 'Code postal',
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
      firstName: ['', [ Validators.required ]],
      lastName: ['', [ Validators.required ]],
      gender: [false],
      email: ['', [ Validators.required ]],
      phoneNumber: ['', [ Validators.required ]],
      birthDate: ['', [ Validators.required ]],
      birthCountry: ['', [ Validators.required ]],
      address: ['', [ Validators.required ]],
      postcode: ['', [ Validators.required ]],
      city: ['', [ Validators.required ]],
      equipment: [false],
      requestedJerseyNumber: ['', [ Validators.required ]],
      topSize: ['', [ Validators.required ]],
      pantSize: ['', [ Validators.required ]],
      idCategory: [1, [ Validators.required ]],
      idPaymentMode: [1, [ Validators.required ]],
      insuranceRequested: [false],
      referee: [true],
      coach: [false],
      comment: [''],
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

  public sendSubscription() {
    const newSub = this.subscriptionForm.value;
    newSub.idSeason = 1;
    console.log(newSub);
  }

}
