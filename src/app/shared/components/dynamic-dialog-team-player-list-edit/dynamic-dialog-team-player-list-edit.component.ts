import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef, MessageService} from 'primeng';
import {TeamService} from '../../services/api/team/team.service';
import TeamPlayer from '../../models/entities/TeamPlayer';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-dynamic-dialog-team-player-list-edit',
  templateUrl: './dynamic-dialog-team-player-list-edit.component.html',
  styleUrls: ['./dynamic-dialog-team-player-list-edit.component.scss']
})
export class DynamicDialogTeamPlayerListEditComponent implements OnInit {

  public idTeam: number;
  public player: TeamPlayer;
  public positionOptions = [
    { label: 'Poste', value: null }
  ];
  public teamPlayerDetailForm: FormGroup;

  constructor(
    private teamService: TeamService,
    private messageService: MessageService,
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private formBuilder: FormBuilder
  ) {
    this.idTeam = this.config.data.idTeam;
    this.player = this.config.data.player;
  }

  ngOnInit(): void {
    this.teamService.getAllPositions()
      .subscribe(
        positions => {
          positions.forEach(
            position => this.positionOptions.push({
              label: position.name,
              value: position.id
            })
          );
          this.teamPlayerDetailForm.get('idPosition').setValue(this.player.idPosition);
        },
        err => console.error(err)
      );
    this.teamPlayerDetailForm = this.formBuilder.group({
      number: [this.player.jerseyNumber],
      idPosition: [null, [ Validators.required ]]
    });
  }

  public cancel(): void {
    this.ref.close();
  }

  public updatePlayer(): void {
    if (this.teamPlayerDetailForm.valid) {
      this.teamService.updateTeamPlayer(this.config.data.idTeam, this.player.idPlayer, this.teamPlayerDetailForm.value)
        .subscribe(
            () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Poste du joueur mis à jour'
              });
              this.ref.close();
            },
            err => console.error(err)
          );
    }
  }
}
