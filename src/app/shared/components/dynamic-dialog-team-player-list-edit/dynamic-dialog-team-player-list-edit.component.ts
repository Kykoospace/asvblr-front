import { Component, OnInit } from '@angular/core';
import {ManagementService} from '../../services/api/management/management.service';
import {DynamicDialogConfig, DynamicDialogRef, MessageService} from 'primeng';
import {TeamService} from '../../services/api/team/team.service';
import PlayerTeam from '../../models/entities/PlayerTeam';

@Component({
  selector: 'app-dynamic-dialog-team-player-list-edit',
  templateUrl: './dynamic-dialog-team-player-list-edit.component.html',
  styleUrls: ['./dynamic-dialog-team-player-list-edit.component.scss']
})
export class DynamicDialogTeamPlayerListEditComponent implements OnInit {

  public player: PlayerTeam;
  public positionOptions = [];

  constructor(
    private teamService: TeamService,
    private messageService: MessageService,
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {
    this.player = this.config.data.player;
  }

  ngOnInit(): void {
    this.teamService.getAllPositions()
      .subscribe(
        positions => positions.forEach(
          position => this.positionOptions.push({
            label: position.name,
            value: position.id
          })
        ),
        err => console.error(err)
      );
  }

  public cancel(): void {
    this.ref.close();
  }

  public updatePlayer(): void {
    this.ref.close();
  }
}
