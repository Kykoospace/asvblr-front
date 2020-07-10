import { Component, OnInit } from '@angular/core';
import Season from '../../shared/models/entities/Season';
import {TeamService} from '../../shared/services/api/team/team.service';
import Subscription from '../../shared/models/entities/Subscription';
import {forkJoin} from 'rxjs';
import {AuthService} from '../../shared/services/api/auth/auth.service';
import User from '../../shared/models/entities/User';
import Player from '../../shared/models/entities/Player';
import {ManagementService} from '../../shared/services/api/management/management.service';

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

  constructor(
    private managementService: ManagementService,
    private teamService: TeamService,
    private authService: AuthService
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
        }
      );
  }

  public reSubscriptionAvailable(): boolean {
    if (!this.lastSubscription) {
      return false;
    }
    return this.currentSeason.id !== this.lastSubscription.idSeason;
  }
}
