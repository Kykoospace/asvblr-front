import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TeamService} from '../../../shared/services/api/team/team.service';
import Team from '../../../shared/models/entities/Team';
import {ConfirmationService, DialogService, DynamicDialogRef, MessageService} from 'primeng';
import {DynamicDialogTeamSelectPlayersComponent} from '../../../shared/components/dynamic-dialog-team-select-players/dynamic-dialog-team-select-players.component';
import {DynamicDialogTeamEventManagerComponent} from '../../../shared/components/dynamic-dialog-team-event-manager/dynamic-dialog-team-event-manager.component';
import {TeamCardComponent} from '../../../shared/components/team-card/team-card.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit, OnDestroy {

  @ViewChild(TeamCardComponent)
  private teamCardComponent: TeamCardComponent;

  public playerSelectorDialogRef: DynamicDialogRef;
  public eventManagerDialogRef: DynamicDialogRef;

  public team: Team;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private teamService: TeamService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    // Get team id from route :
    const idTeam = +this.route.snapshot.paramMap.get('id');

    this.teamService.getTeam(idTeam)
      .subscribe(
        team => this.team = team,
        err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Équipe introuvable'
          });
          this.backNavigate();
        }
      );
  }

  ngOnDestroy(): void {
    if (this.playerSelectorDialogRef) {
      this.playerSelectorDialogRef.close();
    }
    if (this.eventManagerDialogRef) {
      this.eventManagerDialogRef.close();
    }
  }

  public backNavigate() {
    this.router.navigate(['/management/teams']);
  }

  public deleteTeam() {
    // Call confirm dialog box :
    this.confirmationService.confirm({
      message: 'Voulez-vous supprimer l\'équipe '
        + this.team.name + ' ?',

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

  public openPlayerSelectorDialog() {
    this.playerSelectorDialogRef
      = this.dialogService
      .open(DynamicDialogTeamSelectPlayersComponent, {
        header: 'Gérer les joueurs',
        data: {
          idTeam: this.team.id
        }
      });
    this.playerSelectorDialogRef.onClose
      .subscribe(
        () => this.teamCardComponent.refreshPlayers()
      );
  }

  public openEventManagerDialog() {
    this.eventManagerDialogRef
      = this.dialogService
      .open(DynamicDialogTeamEventManagerComponent, {
        header: 'Gérer les rencontres de la saison',
        data: {
          idTeam: this.team.id
        }
      });
  }
}
