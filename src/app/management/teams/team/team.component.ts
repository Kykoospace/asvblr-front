import { Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TeamService} from '../../../shared/services/api/team/team.service';
import {ConfirmationService, DialogService, DynamicDialogRef, MessageService} from 'primeng';
import {DynamicDialogTeamSelectPlayersComponent} from '../../../shared/components/dynamic-dialog-team-select-players/dynamic-dialog-team-select-players.component';
import Player from '../../../shared/models/entities/Player';
import {forkJoin} from 'rxjs';
import TeamPlayer from '../../../shared/models/entities/TeamPlayer';
import {DynamicDialogTeamSelectCoachComponent} from '../../../shared/components/dynamic-dialog-team-select-coach/dynamic-dialog-team-select-coach.component';
import TeamList from '../../../shared/models/responses/TeamList';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit, OnDestroy {

  public playerSelectorDialogRef: DynamicDialogRef;
  public coachSelectorDialogRef: DynamicDialogRef;

  public changeLicenceNumberToggle: boolean;

  public team: TeamList;
  public teamPlayers: TeamPlayer[];
  public selectedPlayer: TeamPlayer;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private teamService: TeamService,
    private dialogService: DialogService
  ) {
    this.changeLicenceNumberToggle = false;
  }

  ngOnInit(): void {
    this.refreshTeam();
  }

  ngOnDestroy(): void {
    if (this.playerSelectorDialogRef) {
      this.playerSelectorDialogRef.close();
    }
    // TODO: FERMER TOUTES les DialogRef dans tous les composants dans ngOnDestroy
  }

  public backNavigate() {
    this.router.navigate(['/management/teams']);
  }

  public refreshTeam(): void {
    // Get team id from route :
    const idTeam = +this.route.snapshot.paramMap.get('id');

    this.teamService.getTeam(idTeam)
      .subscribe(
        team => {
          this.team = team;
          this.refreshPlayers();
        },
        err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Équipe introuvable'
          });
          console.error(err);
          // this.backNavigate();
        }
      );
  }

  public refreshPlayers(): void {
    this.teamService.getAllTeamPlayers(this.team.id)
      .subscribe(
        teamPlayers => this.teamPlayers = teamPlayers,
        err => console.error(err)
      );
  }

  public deleteTeam() {
    // Call confirm dialog box :
    this.confirmationService.confirm({
      message: 'Voulez-vous supprimer l\'équipe '
        + this.team.teamName + ' ?',

      // Callback method when accepted :
      accept: () => {
        // Call delete route :
        this.teamService.deleteTeam(this.team.id)
          .subscribe(
            // If success :
            () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Équipe supprimée',
                detail: 'L\'équipe a bien été supprimée.'
              });
              this.backNavigate();
            },
            // If fail :
            err => {
              console.error(err);
              this.messageService.add({
                severity: 'error',
                summary: 'Suppression impossible',
                detail: 'Une erreur est survenue lors de la suppression de l\'équipe.'
              });
            });
      }
    });
  }

  public updatePlayers(newTeamPlayers: Player[]) {
    const playersToAdd: any[] = [];
    const playersToRemove: number[] = [];

    this.teamService.getAllTeamPlayers(this.team.id)
      .subscribe(
        oldTeamPlayers => {
          newTeamPlayers.forEach(
            newTeamPlayer => {
              if (oldTeamPlayers.find(pl => pl.idPlayer === newTeamPlayer.id) === undefined) {
                playersToAdd.push({ idPlayer: newTeamPlayer.id });
              }
            });
          oldTeamPlayers.forEach(
            oldTeamPlayer => {
              if (newTeamPlayers.find(pl => pl.id === oldTeamPlayer.idPlayer) === undefined) {
                playersToRemove.push(oldTeamPlayer.idPlayer);
              }
            });

          const requests: any = {};
          if (playersToAdd.length > 0) {
            requests.addPlayers = this.teamService.addTeamPlayer(this.team.id, playersToAdd);
          }
          if (playersToRemove.length > 0) {
            requests.removePlayers = this.teamService.removeTeamPlayer(this.team.id, playersToRemove);
          }

          forkJoin(requests)
            .subscribe(
              results => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Les joueurs de l\'équipe ont été mis à jour'
                });
                this.refreshPlayers();
              },
              err => console.error(err)
            );
        },
        err => console.error(err)
      );
  }

  public openPlayerSelectorDialog() {
    this.playerSelectorDialogRef
      = this.dialogService
      .open(DynamicDialogTeamSelectPlayersComponent, {
        header: 'Gérer les joueurs',
        data: {
          sourceHeader: 'Joueurs inscrits',
          targetHeader: 'Joueurs de l\'équipe',
          idTeam: this.team.id
        }
      });
    this.playerSelectorDialogRef.onClose
      .subscribe(
        teamPlayers => {
          if (teamPlayers) {
            this.updatePlayers(teamPlayers);
          }
        },
        err => console.error(err)
      );
  }

  public openCoachSelectorDialog(): void {
    this.coachSelectorDialogRef
      = this.dialogService.open(
        DynamicDialogTeamSelectCoachComponent,
      {
        header: 'Coach de l\'équipe',
        data: {
          coachName: this.team.coachFullName
        }
      }
    );
    this.coachSelectorDialogRef.onClose
      .subscribe(
        (idUser: number) => {
          if (idUser) {
            this.teamService.setTeamCoach(this.team.id, idUser)
              .subscribe(
                team => {
                  this.refreshTeam();
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Coach de l\'équipe mis à jour'
                  });
                }
              );
          }
        }
      );
  }

  public selectPlayer(player: TeamPlayer): void {
    this.selectedPlayer = player;
    this.changeLicenceNumberToggle = true;
  }

  public updatePlayerLicenceNumber(licenceNumber: string): void {
    this.teamService.updatePlayer(this.selectedPlayer.idPlayer, licenceNumber)
      .subscribe(
        () => {
          this.refreshPlayers();
          this.changeLicenceNumberToggle = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Numéro de licence mis à jour'
          });
        },
        err => console.error(err)
      );
  }
}
