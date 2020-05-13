import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamService } from '../../shared/services/api/team/team.service';
import { ManagementService } from '../../shared/services/api/management/management.service';
import {MessageService} from 'primeng';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  public formLabelValues = {
    address: 'Adresse',
    nationality: 'Nationalité',
    birthDate: 'Date de naissance',
    city: 'Ville',
    coach: 'Êtes-vous un(e) coach ?',
    comment: 'Avez-vous autre chose à nous dire ?',
    email: 'Email',
    equipment: 'Souhaitez-vous acheter un tenue aux couleurs de votre équipe ?',
    firstName: 'Prénom',
    gender: 'Sexe',
    idCategory: 'Catégorie de niveau souhaitée',
    idPaymentMode: 'Mode de paiement',
    insuranceRequested: 'Souhaitez-vous prendre l\'assurance supplémentaire ?',
    lastName: 'Nom de famille',
    idPantsSize: 'Taille de pantalon',
    phoneNumber: 'Numéro de téléphone',
    postcode: 'Code postal',
    referee: 'Êtes-vous un(e) arbitre ?',
    requestedJerseyNumber: 'Numéro de maillot souhaité',
    idTopSize: 'Taille de haut'
  };

  public paymentModesOptions = [];
  public categoryOptions = [];
  public clothingSizesOptions = [];

  public calendarLanguage = {
    firstDayOfWeek: 1,
    dayNames: [ 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi' ],
    dayNamesShort: [ 'Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam' ],
    dayNamesMin: [ 'D', 'L', 'M', 'M', 'J', 'V', 'S' ],
    monthNames: [ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ],
    monthNamesShort: [ 'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc' ],
    today: 'Aujourd\'hui',
    clear: 'Effacer'
  };
  public minBirthDateValue = new Date('01/01/1900');
  public maxBirthDateValue = new Date();

  public subscriptionForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    private managementService: ManagementService,
    private messageService: MessageService
  ) {
    this.subscriptionForm = this.formBuilder.group({
      firstName: ['', [ Validators.required ]],
      lastName: ['', [ Validators.required ]],
      gender: [null, [ Validators.required ]],
      email: ['', [ Validators.required ]],
      phoneNumber: [''],
      birthDate: ['', [ Validators.required ]],
      nationality: ['', [ Validators.required ]],
      address: ['', [ Validators.required ]],
      postcode: ['', [ Validators.required ]],
      city: ['', [ Validators.required ]],
      equipment: [false],
      requestedJerseyNumber: ['', [ Validators.required ]],
      idTopSize: ['', [ Validators.required ]],
      idPantsSize: ['', [ Validators.required ]],
      idCategory: ['', [ Validators.required ]],
      idPaymentMode: ['' , [ Validators.required ]],
      insuranceRequested: [false],
      referee: [false],
      coach: [false],
      comment: [''],
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

    this.teamService.getAllClothingSizes()
      .subscribe(clothingSizes => {
        clothingSizes.forEach(clothingSize => {
          this.clothingSizesOptions.push({
            label: clothingSize.name,
            value: clothingSize.id
          });
        });
      });
  }

  ngOnInit(): void { }

  public sendSubscription() {
    if (this.subscriptionForm.valid) {
      const newSub = this.subscriptionForm.value;
      newSub.idSeason = 25;

      this.teamService.createSubscription(newSub)
        .subscribe(sub => {
            console.log('Nouvelle inscription', sub);
          },
          err => {
            console.error(err);
          });
    }
  }
}
