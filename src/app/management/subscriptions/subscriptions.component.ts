import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../shared/services/api/team/team.service';
import Subscription from '../../shared/models/entities/Subscription';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

  subscriptions: Subscription[];

  constructor(
    private teamService: TeamService
  ) {
    this.teamService.getAllSubscriptions()
      .subscribe(subscriptions => {
        this.subscriptions = subscriptions;
      });
  }

  ngOnInit(): void { }

}
