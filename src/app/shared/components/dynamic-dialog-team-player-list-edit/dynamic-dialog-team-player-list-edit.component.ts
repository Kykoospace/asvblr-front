import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef, MessageService} from 'primeng';
import {TeamService} from '../../services/api/team/team.service';
import TeamPlayer from '../../models/entities/TeamPlayer';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import TeamList from '../../models/responses/TeamList';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-dynamic-dialog-team-player-list-edit',
  templateUrl: './dynamic-dialog-team-player-list-edit.component.html',
  styleUrls: ['./dynamic-dialog-team-player-list-edit.component.scss']
})
export class DynamicDialogTeamPlayerListEditComponent implements OnInit {

  public team: TeamList;
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
    this.team = this.config.data.team;
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
      idPosition: [null, [ Validators.required ]],
      licenceNumber: [this.player.licenceNumber]
    });
  }

  public cancel(): void {
    this.ref.close();
  }

  public updatePlayer(): void {
    if (this.teamPlayerDetailForm.valid) {
      const requests: any = {
        updatePlayerPosition: this.teamService.updateTeamPlayer(
          this.team.id,
          this.player.idPlayer,
          {
            number: this.teamPlayerDetailForm.get('number').value,
            idPosition: this.teamPlayerDetailForm.get('idPosition').value
          })
      };

      if (this.player.licenceNumber !== this.teamPlayerDetailForm.get('licenceNumber').value) {
        requests.updateLicenceNumber
          = this.teamService.updatePlayer(this.player.idPlayer, this.teamPlayerDetailForm.get('licenceNumber').value);
      }

      forkJoin(requests)
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

  public setLeader(): void {
    this.teamService.setTeamLeader(this.team.id, this.player.idPlayer)
      .subscribe(
        team => {
          this.messageService.add({
            severity: 'success',
            summary: 'Joueur promu capitaine'
          });
          this.team.idPlayerLeader = this.player.idPlayer;
        },
        err => console.error(err)
      );
  }
}
