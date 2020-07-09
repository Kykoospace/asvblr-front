import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from 'primeng';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TeamService} from '../../services/api/team/team.service';
import {ManagementService} from '../../services/api/management/management.service';
import {GouvService} from '../../services/gouv/gouv.service';
import Season from '../../models/entities/Season';
import AppConstants from '../../AppConstants';
import {forkJoin} from 'rxjs';
import Price from '../../models/entities/Price';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss']
})
export class SubscriptionFormComponent implements OnInit {

  public steps: MenuItem[];
  public activeStep: number;

  public currentSeason: Season;
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

  private confirmationMessage = {
    severity: 'success',
    summary: 'Demande envoyée',
    detail: 'Votre demande d\'inscription a bien été envoyée. Elle sera traîtée dans les plus brefs délais.'
  };

  private warningMessage = {
    severity: 'warn',
    summary: 'Formulaire incomplet',
    detail: 'Merci de renseigner tous les champs requis.'
  };

  private errorMessage = {
    severity: 'error',
    summary: 'Erreur lors de l\'envoi',
    detail: 'Une erreur est survenue pendant l\'envoi. Nous vous invitons à contacter le club.'
  };

  public paymentModesOptions = [];
  public categoryOptions = [
    { label: 'Catégorie', value: null }
  ];
  public clothingSizesOptions = [
    { label: 'Taille', value: null }
  ];

  public calendarLanguage: any;
  public minBirthDateValue = new Date('01/01/1900');
  public maxBirthDateValue = new Date();

  public subscriptionForm: FormGroup;
  public fileCNI: File;
  public fileMedicalCertificate: File;
  public fileIdentityPhoto: File;

  public cities: any[];

  constructor(
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    private managementService: ManagementService,
    private gouvService: GouvService,
    private messageService: MessageService
  ) {
    this.activeStep = -1;
    this.calendarLanguage = AppConstants.CALENDAR_OPTIONS;
  }

  ngOnInit() {
    this.steps = [
      { label: 'Informations personnelles' },
      { label: 'Suppléments' },
      { label: 'Autorisation parentale' },
      { label: 'Documents & règlement' }
    ];

    // Initialisation du formulaire :
    this.subscriptionForm = this.formBuilder.group({
      // Informations personnelles :
      firstStep: this.formBuilder.group({
        firstName: ['', [ Validators.required ]],
        lastName: ['', [ Validators.required ]],
        gender: [null, [ Validators.required ]],
        email: ['', [ Validators.required, Validators.email ]],
        phoneNumber: [''],
        birthDate: ['', [ Validators.required ]],
        nationality: ['', [ Validators.required ]],
        address: ['', [ Validators.required ]],
        postcode: ['', [ Validators.required ]],
        city: ['', [ Validators.required ]],
        idSubscriptionCategory: [null, [ Validators.required ]],
      }),

      // Suppléments :
      secondStep: this.formBuilder.group({
        insuranceRequested: [false, [ Validators.required ]],
        referee: [false, [ Validators.required ]],
        coach: [false, [ Validators.required ]],
        calendarRequested: [false, [ Validators.required ]],
        equipment: [false],
        requestedJerseyNumber: [''],
        idTopSize: [null],
        idPantsSize: [null],
        comment: ['']
      }),

      // Autorisation parentale :
      thirdStep: this.formBuilder.group({
        pc_allowToLeaveAlone: [false],
        pc_allowClubToRescue: [false],
        pc_allowToTravelWithTeamMate: [false],
        pc_allowToPublish: [false],
        pc_allowToWhatsapp: [false],
        pc_unaccountability: [false]
      }),

      // Documents & règlement :
      fourthStep: this.formBuilder.group({
        idsPaymentMode: [null, [ Validators.required ]]
      })
    }, { validators: this.fileValidator });

    // Initialisation des custom validators :
    const firstStep: AbstractControl = this.subscriptionForm.get('firstStep');
    const secondStep: AbstractControl = this.subscriptionForm.get('secondStep');
    const thirdStep: AbstractControl = this.subscriptionForm.get('thirdStep');

    // remove after test :
    firstStep.get('firstName').valueChanges
      .subscribe(
        firstName => {
          if (firstName === 'Kyllian') {
            this.test();
          }
        }
      );

    firstStep.get('birthDate').valueChanges
      .subscribe((birthDate: Date) => {
        const controls: AbstractControl[] = [];
        controls.push(thirdStep.get('pc_allowToLeaveAlone'));
        controls.push(thirdStep.get('pc_allowClubToRescue'));
        controls.push(thirdStep.get('pc_allowToTravelWithTeamMate'));
        controls.push(thirdStep.get('pc_allowToPublish'));
        controls.push(thirdStep.get('pc_allowToWhatsapp'));
        const unaccountabilityControl = thirdStep.get('pc_unaccountability');
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

    secondStep.get('equipment').valueChanges
      .subscribe((equipment) => {
        const topSize = secondStep.get('idTopSize');
        const pantsSize = secondStep.get('idPantsSize');
        if (equipment) {
          topSize.setValidators(Validators.required);
          pantsSize.setValidators(Validators.required);
        } else {
          topSize.clearValidators();
          pantsSize.clearValidators();
        }
        topSize.updateValueAndValidity();
        pantsSize.updateValueAndValidity();
      });

    // Récupération des datasets et de la saison en cours:
    forkJoin({
      currentSeason: this.teamService.getCurrentSeason(),
      paymentModes: this.managementService.getAllPaymentModes(),
      subscriptionCategories: this.teamService.getAllSubscriptionCategories(),
      clothingSizes: this.teamService.getAllClothingSizes(),
      prices: this.managementService.getAllPrices()
    })
      .subscribe(
        (results: any) => {
          this.currentSeason = results.currentSeason;
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

  public fileValidator = () => {
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

  public sendSubscription() {
    if (this.subscriptionForm.valid) {
      // Envoi du formulaire d'inscription :
      const data: any = {};
      const firstStep = this.subscriptionForm.get('firstStep').value;
      const secondStep = this.subscriptionForm.get('secondStep').value;
      const thirdStep = this.subscriptionForm.get('thirdStep').value;
      const fourthStep = this.subscriptionForm.get('fourthStep').value;

      for (const firstStepKey in firstStep) {
        data[firstStepKey] = firstStep[firstStepKey];
      }

      for (const secondStepKey in secondStep) {
        data[secondStepKey] = secondStep[secondStepKey];
      }

      for (const thirdStepKey in thirdStep) {
        data[thirdStepKey] = thirdStep[thirdStepKey];
      }

      data.idsPaymentMode = fourthStep.idsPaymentMode;

      this.teamService.createSubscription(data)
        .subscribe(
          subscription => {
            this.teamService.updateSubscriptionDocuments(
              subscription.id,
              this.fileCNI,
              this.fileIdentityPhoto,
              this.fileMedicalCertificate
            )
              .subscribe(
                result => {
                  this.messageService.add(this.confirmationMessage);
                  this.activeStep = 4;
                },
                err => {
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur lors de l\'envoi de l\'inscription',
                    detail: 'Une erreur est survenu lors de l\'envoi des documents'
                  });
                  console.error(err);
                }
              );
          },
          err => {
            this.messageService.add(this.errorMessage);
            console.error(err);
          }
        );
    } else {
      this.messageService.add(this.warningMessage);
    }
  }

  public cniFileHandler(event) {
    this.fileCNI = <File>event.target.files[0];
    this.subscriptionForm.updateValueAndValidity();
  }

  public identityPhotoFileHandler(event) {
    this.fileIdentityPhoto = <File>event.target.files[0];
    this.subscriptionForm.updateValueAndValidity();
  }

  public medicalCertificateFileHandler(event) {
    this.fileMedicalCertificate = <File>event.target.files[0];
    this.subscriptionForm.updateValueAndValidity();
  }

  public updateCity(postcode: number) {
    const cityControl = this.subscriptionForm.get('firstStep').get('city');
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
    this.subscriptionForm
      .get('firstStep')
      .get('city')
      .patchValue(cityName);
    this.cities = null;
  }

  public isMinor(birthDate: Date = this.subscriptionForm.get('firstStep').get('birthDate').value) {
    const date = new Date(birthDate);
    date.setFullYear(date.getFullYear() + 18);
    return date > new Date();
  }

  public resetForm() {
    this.activeStep = 0;
    this.subscriptionForm.reset();
  }

  public test() {
    const firstStep = this.subscriptionForm.get('firstStep');
    firstStep.get('lastName').setValue('Gautier');
    firstStep.get('gender').setValue(true);
    firstStep.get('birthDate').setValue(new Date('03/07/1997'));
    firstStep.get('nationality').setValue('Française');
    firstStep.get('email').setValue('kyllian.gt@hotmail.fr');
    firstStep.get('phoneNumber').setValue('0625131440');
    firstStep.get('address').setValue('21 av du Fort');
    firstStep.get('postcode').setValue(92120);
    firstStep.get('idSubscriptionCategory').setValue(25);
  }
}
