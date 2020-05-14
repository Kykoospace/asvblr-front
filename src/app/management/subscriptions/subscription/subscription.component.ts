import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService} from '../../../shared/services/api/team/team.service';
import Subscription from '../../../shared/models/entities/Subscription';
import {MessageService} from 'primeng';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  public subscription: Subscription = {
    id: 1,
    firstName: 'Kyllian',
    lastName: 'Gautier',
    gender: true,
    birthDate: new Date('07/03/1997'),
    nationality: 'Français',
    phoneNumber: '0625131440',
    email: 'kyllian.gt@hotmail.fr',
    address: '21 av du Fort',
    postcode: 92120,
    city: 'Montrouge',
    idCategory: 22,
    equipment: true,
    requestedJerseyNumber: 7,
    idTopSize: 19,
    idPantsSize: 19,
    insuranceRequested: false,
    coach: false,
    referee: false,
    idCNI: null,
    idIdentityPhoto: null,
    idMedicalCertificate: null,
    idPaymentMode: null,
    comment: 'Je souhaite rejoindre une équipe départementale',
    creationDate: new Date('13/05/2020'),
    validationDate: null,
    idPlayer: null,
    idSeason: 25,
    validated: false
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private messageService: MessageService
  ) {
    const idSubscription = +this.route.snapshot.paramMap.get('id');
    this.teamService.getSubscription(idSubscription)
      .subscribe((subscription: Subscription) => {
        this.subscription = subscription;
      },
        err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Inscription introuvable'
          });
          this.router.navigate(['/management/subscriptions']);
        });
  }

  ngOnInit(): void {
  }

  backNavigate() {
    this.router.navigate(['/management/subscriptions']);
  }
}
