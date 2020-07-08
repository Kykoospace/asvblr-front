import { Component, OnInit, Input } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef, MessageService} from 'primeng';
import {TeamService} from '../../services/api/team/team.service';
import Player from '../../models/entities/Player';
import {forkJoin} from 'rxjs';
import SubscriptionCategory from '../../models/entities/SubscriptionCategory';

@Component({
  selector: 'app-dynamic-dialog-team-select-players',
  templateUrl: './dynamic-dialog-team-select-players.component.html',
  styleUrls: ['./dynamic-dialog-team-select-players.component.scss']
})
export class DynamicDialogTeamSelectPlayersComponent implements OnInit {

  private idTeam: number;
  public subscriptionCategories: SubscriptionCategory[] = [];

  public sourcePlayers: Player[] = [];
  public targetPlayers: Player[] = [];

  constructor(
    private teamService: TeamService,
    private messageService: MessageService,
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {
    this.idTeam = this.config.data.idTeam;
  }

  ngOnInit(): void {
    forkJoin({
      players: this.teamService.getAllPlayers(),
      teamPlayers: this.teamService.getAllTeamPlayers(this.idTeam),
      subscriptionCategories: this.teamService.getAllSubscriptionCategories()
    })
      .subscribe(
        results => {
          results.players.forEach(
            player => {
              if (results.teamPlayers.find(element => element.idPlayer === player.id)) {
                this.targetPlayers.push(player);
              } else {
                this.sourcePlayers.push(player);
              }
            }
          );
          this.subscriptionCategories = results.subscriptionCategories;
        },
        err => console.error(err)
      );
  }

  public close() {
    this.ref.close(this.targetPlayers);
  }

  public cancel() {
    this.ref.close();
  }
}
