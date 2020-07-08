import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import PlayerTeam from '../../models/entities/PlayerTeam';
import {TeamService} from '../../services/api/team/team.service';
import {forkJoin} from 'rxjs';
import TeamList from '../../models/responses/TeamList';
import Match from '../../models/entities/Match';
import {TeamMatchListComponent} from '../team-match-list/team-match-list.component';
import {DialogService, DynamicDialogRef} from 'primeng';
import {DynamicDialogTeamPlayerListEditComponent} from '../dynamic-dialog-team-player-list-edit/dynamic-dialog-team-player-list-edit.component';
import {DynamicDialogTeamEventManagerComponent} from '../dynamic-dialog-team-event-manager/dynamic-dialog-team-event-manager.component';
import AppConstants from '../../AppConstants';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements AfterViewInit, OnChanges {

  public playerEditDialogRef: DynamicDialogRef;
  public eventManagerDialogRef: DynamicDialogRef;

  @Input()
  public team: TeamList;

  @Input()
  public enableCoachOptions: boolean = false;

  public players: PlayerTeam[] = [];
  public matches: Match[];
  public lastMatchStats: any;

  public chartOptions = {
    legend: {
      position: 'bottom',
      labels: {
        fontSize: 14,
        padding: 12,
        fontFamily: 'Roboto',
        fontColor: '#303030'
      }
    },
    elements: {
      line: {
        borderWidth: 2
      }
    }
  };

  constructor(
    private teamService: TeamService,
    private dialogService: DialogService
  ) { }

  ngAfterViewInit(): void {
    this.refreshTeam();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.refreshTeam();
  }

  public refreshTeam() {
    const requests = {
      players: this.teamService.getAllPlayersTeam(this.team.id),
      matches: this.teamService.getAllTeamMatches(this.team.id),
      // TODO: lastMatch
    };

    forkJoin(requests)
      .subscribe(
        (results: any) => {
          this.players = results.players;
          this.matches = results.matches;

          // TODO: lastMatch
          this.lastMatchStats = {
            labels: ['Collectif', 'Combativité', 'Attaque', 'Défense', 'Technique'],
            datasets: [{
              data: [8, 7, 7, 6, 4],
              label: 'Antony 23/04/2020',
              backgroundColor: 'rgba(0, 166, 156, .2)',
              borderColor: AppConstants.getColor(),
              pointBackgroundColor: AppConstants.getColor(),
              pointBorderColor: '#ffffff',
              pointHoverBackgroundColor: '#ffffff',
              pointHoverBorderColor: AppConstants.getColor()
            }]
          };
        },
        err => console.error(err)
      );
  }

  public selectPlayer(player: PlayerTeam) {
    if (this.enableCoachOptions) {
      this.playerEditDialogRef = this.dialogService.open(
        DynamicDialogTeamPlayerListEditComponent, {
          header: 'Fiche du joueur',
          data: {
            player
          }
        }
      );
      this.playerEditDialogRef.onClose
        .subscribe(
          () => this.refreshTeam()
        );
    }
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
    this.eventManagerDialogRef.onClose
      .subscribe(
        () => this.refreshTeam()
      );
  }
}
