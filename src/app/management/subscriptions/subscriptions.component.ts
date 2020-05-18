import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../shared/services/api/team/team.service';
import Subscription from '../../shared/models/entities/Subscription';
import {Router} from '@angular/router';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

  public subscriptions: Subscription[];

  public subscriptionsView = false;
  public subscriptionsViewOptions = [
    { label: 'En cours', value: false, icon: 'pi pi-pencil' },
    { label: 'Validées', value: true, icon: 'pi pi-check' }
  ];


  public columns = [
    { column: 'Prénom', field: 'firstName' },
    { column: 'Nom', field: 'lastName' },
    { column: 'Sexe', field: 'gender' },
    { column: 'Date de naissance', field: 'birthDate' },
    { column: 'Numéro de tel', field: 'phoneNumber' },
    { column: 'Date', field: 'creationDate' }
  ];

  public genderOptions = [
    { label: 'Tous', value: null },
    { label: 'Homme', value: true },
    { label: 'Femme', value: false }
  ];
  public rowCountOptions = [15, 25, 50];
  public maxRowCount = this.rowCountOptions[0];

  constructor(
    private router: Router,
    private teamService: TeamService
  ) {
    this.teamService.getAllSubscriptions()
      .subscribe(subscriptions => {
        this.subscriptions = subscriptions;
      });
  }

  ngOnInit(): void { }

  public selectSubscription(subscription: Subscription) {
    this.router.navigate(['/management/subscriptions/', subscription.id]);
  }

  public formatDate(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    return date.getFullYear() + '/' + month + '/' + day;
  }

}
