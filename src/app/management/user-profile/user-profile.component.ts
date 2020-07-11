import { Component, OnInit } from '@angular/core';
import Season from '../../shared/models/entities/Season';
import {TeamService} from '../../shared/services/api/team/team.service';
import Subscription from '../../shared/models/entities/Subscription';
import {forkJoin} from 'rxjs';
import {AuthService} from '../../shared/services/api/auth/auth.service';
import User from '../../shared/models/entities/User';
import Player from '../../shared/models/entities/Player';
import {ManagementService} from '../../shared/services/api/management/management.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GouvService} from '../../shared/services/gouv/gouv.service';
import Price from '../../shared/models/entities/Price';
import {MessageService} from "primeng";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public loggedUser: User;

  public player: Player;
  public currentSeason: Season;
  public lastSubscription: Subscription;

  public reSubscriptionForm: FormGroup;
  public fileCNI: File;
  public fileMedicalCertificate: File;
  public fileIdentityPhoto: File;
  public prices: Price[];

  public formLabelValues = {
    address: 'Adresse',
    nationality: 'Nationalité',
    birthDate: 'Date de naissance',
    city: 'Ville',
    coach: 'Êtes-vous un(e) coach ?',
    comment: 'Avez-vous autre chose à nous dire ?',
    email: 'Adresse mail',
    equipment: 'Souhaitez-vous une tenue aux couleurs de votre équipe ?',
    firstName: 'Prénom',
    gender: 'Sexe',
    idSubscriptionCategory: 'Catégorie de niveau souhaitée',
    idsPaymentMode: 'Mode de paiement',
    insuranceRequested: 'Souhaitez-vous prendre l\'assurance supplémentaire ?',
    calendarRequested: 'Souhaitez-vous le calendrier du club ?',
    lastName: 'Nom de famille',
    idPantsSize: 'Taille de short',
    phoneNumber: 'Numéro de téléphone',
    postcode: 'Code postal',
    referee: 'Êtes-vous un(e) arbitre ?',
    requestedJerseyNumber: 'Numéro de maillot souhaité',
    idTopSize: 'Taille de haut',
    pc_allowToLeaveAlone: 'Autorise mon enfant à quitter seul le lieu d\'entrainement ou de compétition',
    pc_allowClubToRescue: 'Autorise les dirigeants du club à prendre toutes les mesures utiles en cas d\'incident',
    pc_allowToTravelWithTeamMate: 'Autorise mon enfant à prendre place dans une voiture particulière afin ' +
      'd\'effectuer les déplacements nécessités par les compétitions sportives officielles ou amicales ' +
      'au cours de la saison',
    pc_allowToPublish: 'Autorise l\'image de mon enfant à paraître sur les publications du club',
    pc_allowToWhatsapp: 'Autorise mon enfant à faire partie d\'un groupe Whatsapp pour l\'organisation des matchs',
    pc_unaccountability: 'Je déclare avoir pris connaissance que ' +
      'l\'ASBR Volley-Ball n\'est en aucun cas responsable du vol, de la perte ou de ' +
      'l\'endomagement d\'objets personnels (vêtements, sacs, bijoux, téléphones portables ...) ' +
      'dans tous les équipements sportifs fréquentés',
    cni: 'Carte nationale d\'identité recto ET verso',
    identityPhoto: 'Photo d\'identité',
    medicalCertificate: 'Certificat médical de moins de deux ans'
  };

  public requestedEquipmentTooltip = 'Maillot obligatoire en compétition, short également obligatoire en régional et supérieur. Renseignez-vous auprès de votre entraîneur.';
  public requestedJerseyNumberTooltip = 'Vous avez un numéro favori ? Nous ferons notre possible pour vous le procurer !';

  public cities: any[];

  public paymentModesOptions = [];
  public categoryOptions = [
    { label: 'Catégorie', value: null }
  ];
  public clothingSizesOptions = [
    { label: 'Taille', value: null }
  ];

  constructor(
    private managementService: ManagementService,
    private teamService: TeamService,
    private authService: AuthService,
    private gouvService: GouvService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.loggedUser = this.authService.getLoggedUser();
  }

  ngOnInit(): void {
    forkJoin({
      player: this.managementService.getUserPlayer(this.loggedUser.id),
      currentSeason: this.teamService.getCurrentSeason(),
      lastSubscription: this.teamService.getPlayerLastSubscription(this.loggedUser.idPlayer)
    })
      .subscribe(
        (results: any) => {
          this.player = results.player;
          this.currentSeason = results.currentSeason;
          this.lastSubscription = results.lastSubscription;
          if (this.lastSubscription) {
            this.initForm();
            // Récupération des datasets et de la saison en cours:
            forkJoin({
              paymentModes: this.managementService.getAllPaymentModes(),
              subscriptionCategories: this.teamService.getAllSubscriptionCategories(),
              clothingSizes: this.teamService.getAllClothingSizes(),
              prices: this.managementService.getAllPrices()
            })
              .subscribe(
                (results: any) => {
                  results.paymentModes.forEach(paymentMode => {
                    this.paymentModesOptions.push({
                      label: paymentMode.name,
                      value: paymentMode.id
                    });
                  });
                  results.subscriptionCategories.forEach(category => {
                    this.categoryOptions.push({
                      label: category.name,
                      value: category.id
                    });
                  });
                  results.clothingSizes.forEach(clothingSize => {
                    this.clothingSizesOptions.push({
                      label: clothingSize.name,
                      value: clothingSize.id
                    });
                  });
                  this.prices = results.prices;
                },
                err => console.error(err)
              );
          }
        }
      );
  }

  public initForm(): void {
    this.reSubscriptionForm = this.formBuilder.group({
      idPlayer: [this.player.id],
      firstName: [{ value: this.lastSubscription.firstName, disabled: true }, [ Validators.required ]],
      lastName: [{ value: this.lastSubscription.lastName, disabled: true }, [ Validators.required ]],
      gender: [{ value: this.lastSubscription.gender, disabled: true }, [ Validators.required ]],
      email: [this.lastSubscription.email, [ Validators.required, Validators.email ]],
      phoneNumber: [this.lastSubscription.phoneNumber],
      birthDate: [{ value: this.lastSubscription.birthDate, disabled: true }, [ Validators.required ]],
      nationality: [this.lastSubscription.nationality, [ Validators.required ]],
      address: [this.lastSubscription.address, [ Validators.required ]],
      postcode: [this.lastSubscription.postcode, [ Validators.required ]],
      city: [this.lastSubscription.city, [ Validators.required ]],
      idSubscriptionCategory: [this.lastSubscription.idSubscriptionCategory, [ Validators.required ]],
      insuranceRequested: [this.lastSubscription.insuranceRequested, [ Validators.required ]],
      referee: [this.lastSubscription.referee, [ Validators.required ]],
      coach: [this.lastSubscription.coach, [ Validators.required ]],
      calendarRequested: [false, [ Validators.required ]],
      equipment: [false],
      requestedJerseyNumber: [null],
      idTopSize: [],
      idPantsSize: [],
      comment: [''],
      pc_allowToLeaveAlone: [this.lastSubscription.pc_allowToLeaveAlone],
      pc_allowClubToRescue: [this.lastSubscription.pc_allowClubToRescue],
      pc_allowToTravelWithTeamMate: [this.lastSubscription.pc_allowToTravelWithTeamMate],
      pc_allowToPublish: [this.lastSubscription.pc_allowToPublish],
      pc_allowToWhatsapp: [this.lastSubscription.pc_allowToWhatsapp],
      pc_unaccountability: [false],
      idsPaymentMode: [null, [ Validators.required ]]
    }, { validators: this.fileValidator });
    console.log(this.lastSubscription);

    this.reSubscriptionForm.get('birthDate').valueChanges
      .subscribe((birthDate: Date) => {
        const controls: AbstractControl[] = [
          this.reSubscriptionForm.get('pc_allowToLeaveAlone'),
          this.reSubscriptionForm.get('pc_allowClubToRescue'),
          this.reSubscriptionForm.get('pc_allowToTravelWithTeamMate'),
          this.reSubscriptionForm.get('pc_allowToPublish'),
          this.reSubscriptionForm.get('pc_allowToWhatsapp')
        ];
        const unaccountabilityControl = this.reSubscriptionForm.get('pc_unaccountability');

        if (this.isMinor(birthDate)) {
          controls.forEach(control => {
            control.setValidators(Validators.required);
          });
          unaccountabilityControl.setValidators(Validators.requiredTrue);
        } else {
          controls.forEach(control => {
            control.clearValidators();
          });
          unaccountabilityControl.clearValidators();
        }
        controls.forEach(control => {
          control.updateValueAndValidity();
        });
        unaccountabilityControl.updateValueAndValidity();
      });

    this.reSubscriptionForm.get('equipment').valueChanges
      .subscribe((equipment) => {
        const topSize = this.reSubscriptionForm.get('idTopSize');
        const pantsSize = this.reSubscriptionForm.get('idPantsSize');
        const requestedJerseyNumber = this.reSubscriptionForm.get('requestedJerseyNumber');
        if (equipment) {
          topSize.setValidators(Validators.required);
          topSize.enable();
          pantsSize.setValidators(Validators.required);
          pantsSize.enable();
          requestedJerseyNumber.enable();
        } else {
          topSize.clearValidators();
          topSize.disable();
          pantsSize.clearValidators();
          pantsSize.disable();
          requestedJerseyNumber.disable();
        }
        topSize.updateValueAndValidity();
        pantsSize.updateValueAndValidity();
        requestedJerseyNumber.updateValueAndValidity();
      });
  }

  public sendSubscription(): void {
    if (this.reSubscriptionForm.valid) {
      this.teamService.createReSubscription(this.reSubscriptionForm.getRawValue())
        .subscribe(
          subscription => {
            this.teamService.updateSubscriptionDocuments(subscription.id, this.fileCNI, this.fileIdentityPhoto, this.fileMedicalCertificate)
              .subscribe(
                () => {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Votre demande de réinscription a bien été envoyée'
                  });
                  this.lastSubscription = subscription;
                },
                err => this.messageService.add({
                  severity: 'error',
                  summary: 'Une erreur est survenue lors de l\'envoi des documents'
                })
              );
          },
          err => console.error(err)
        );
    }
  }

  private isMinor(birthDate: Date = this.reSubscriptionForm.get('birthDate').value) {
    const date = new Date(birthDate);
    date.setFullYear(date.getFullYear() + 18);
    return date.getTime() > Date.now();
  }

  private fileValidator = () => {
    if (this.fileCNI === undefined) {
      return { noCNI: true };
    }
    if (this.fileIdentityPhoto === undefined) {
      return { noIdentityPhoto: true };
    }
    if (this.fileMedicalCertificate === undefined) {
      return { noMedicalCertificate: true };
    }
    return null;
  }


  public reSubscriptionAvailable(): boolean {
    if (!this.lastSubscription) {
      return false;
    }
    return this.currentSeason.id !== this.lastSubscription.idSeason;
  }

  public cniFileHandler(event) {
    this.fileCNI = event.target.files[0] as File;
    this.reSubscriptionForm.updateValueAndValidity();
  }

  public identityPhotoFileHandler(event) {
    this.fileIdentityPhoto = event.target.files[0] as File;
    this.reSubscriptionForm.updateValueAndValidity();
  }

  public medicalCertificateFileHandler(event) {
    this.fileMedicalCertificate = event.target.files[0] as File;
    this.reSubscriptionForm.updateValueAndValidity();
  }

  public updateCity(postcode: number) {
    const cityControl = this.reSubscriptionForm.get('city');
    this.gouvService.getCityByPostcode(postcode)
      .subscribe(cities => {
        if (cities.length > 1) {
          this.cities = cities;
        } else if (cities.length > 0) {
          cityControl.patchValue(cities[0].nom);
        } else {
          this.cities = null;
        }
      }, err => {
        console.error(err);
        cityControl.patchValue(null);
      });
  }

  public setCity(cityName: string) {
    this.reSubscriptionForm
      .get('city')
      .patchValue(cityName);
    this.cities = null;
  }

  public equipmentRequested(): boolean {
    return this.reSubscriptionForm.get('equipment').value;
  }
}
