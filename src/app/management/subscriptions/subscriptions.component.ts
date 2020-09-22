import { Component, OnInit, ViewChild} from '@angular/core';
import { TeamService } from '../../shared/services/api/team/team.service';
import Subscription from '../../shared/models/entities/Subscription';
import {Router} from '@angular/router';
import SubscriptionCategory from '../../shared/models/entities/SubscriptionCategory';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

  @ViewChild('table') dt;

  public subscriptions: Subscription[];

  public subscriptionsView: boolean;
  public subscriptionsViewOptions = [
    { label: 'En cours', value: false, icon: 'fas fa-pen' },
    { label: 'Validées', value: true, icon: 'fas fa-check' }
  ];

  public columns = [
    { column: 'Prénom', field: 'firstName' },
    { column: 'Nom', field: 'lastName' },
    { column: 'Catégorie', field: 'idSubscriptionCategory' },
    { column: 'Numéro de tel', field: 'phoneNumber' },
    { column: 'Date de naissance', field: 'birthDate' }
  ];

  public subscriptionCategories: SubscriptionCategory[];
  public subscriptionCategoryOptions = [
    { label: '', value: null }
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

  ngOnInit(): void {
    this.teamService.getAllSubscriptionCategories()
      .subscribe(
        categories => {
          this.subscriptionCategories = categories;
          categories.forEach(
            category => this.subscriptionCategoryOptions
              .push({ label: category.name, value: category.id })
          );
        },
        err => console.error(err)
      );
  }

  public selectSubscription(subscription: Subscription) {
    this.router.navigate(['/management/subscriptions/', subscription.id]);
  }

  public getCategoryName(idSubscriptionCategory): string {
    return this.subscriptionCategories
      .find(category => category.id === idSubscriptionCategory).name;
  }
}
