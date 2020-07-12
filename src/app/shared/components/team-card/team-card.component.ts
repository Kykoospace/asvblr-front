import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import TeamPlayer from '../../models/entities/TeamPlayer';
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
export class TeamCardComponent implements AfterViewInit, OnChanges, OnDestroy {

  public playerEditDialogRef: DynamicDialogRef;
  public eventManagerDialogRef: DynamicDialogRef;

  @Input()
  public team: TeamList;

  @Input()
  public enableCoachOptions: boolean = false;

  @Input()
  public enableMatchCalendar: boolean = true;

  public players: TeamPlayer[] = [];
  public matches: Match[];
  public evolutionStats: any;
  public lastMatchStats: any;

  public lineChartOptions: any;
  public radarChartOptions: any;

  constructor(
    private teamService: TeamService,
    private dialogService: DialogService
  ) {
    this.lineChartOptions = AppConstants.LINE_CHART_OPTIONS;
    this.radarChartOptions = AppConstants.RADAR_CHART_OPTIONS;
  }

  ngAfterViewInit(): void {
    this.refreshTeam();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.refreshTeam();
  }

  ngOnDestroy(): void {
    if (this.eventManagerDialogRef) {
      this.eventManagerDialogRef.close();
    }

    if (this.playerEditDialogRef) {
      this.playerEditDialogRef.close();
    }
  }

  public refreshTeam() {
    const requests = {
      players: this.teamService.getAllTeamPlayers(this.team.id),
      matches: this.teamService.getAllTeamMatches(this.team.id),
      lastMatch: this.teamService.getLastTeamMatch(this.team.id)
    };

    forkJoin(requests)
      .subscribe(
        (results: any) => {
          this.players = results.players;
          this.matches = results.matches;
          if (results.lastMatch) {
            this.lastMatchStats = Match.getMatchData(results.lastMatch);
          }
          this.setEvolutionStats();
        },
        err => console.error(err)
      );
  }

  public refreshPlayers(): void {
    this.teamService.getAllTeamPlayers(this.team.id)
      .subscribe(
        players => this.players = players,
        err => console.error(err)
      );
  }

  public refreshMatches(): void {
    const requests = {
      matches: this.teamService.getAllTeamMatches(this.team.id),
      lastMatch: this.teamService.getLastTeamMatch(this.team.id)
    };

    forkJoin(requests)
      .subscribe(
        (results: any) => {
          this.matches = results.matches;
          this.setEvolutionStats();

          this.lastMatchStats =
            results.lastMatch
              ? Match.getMatchData(results.lastMatch)
              : null;
        },
        err => console.error(err)
      );
  }

  public setEvolutionStats(): void {
    const labels: string[] = [];
    const collectifDataset: number[] = [];
    const combativenessDataset: number[] = [];
    const offensiveDataset: number[] = [];
    const defensiveDataset: number[] = [];
    const technicalDataset: number[] = [];
    this.matches
      .filter(match => match.date.getTime() < Date.now())
      .filter(match => match.comment)
      .forEach(
      match => {
        labels.push(match.oppositeTeam + ' ' + (match.type ? '(aller)' : '(retour)'));
        collectifDataset.push(match.collectiveRating);
        combativenessDataset.push(match.combativenessRating);
        offensiveDataset.push(match.offensiveRating);
        defensiveDataset.push(match.defensiveRating);
        technicalDataset.push(match.technicalRating);
      }
    );
    this.evolutionStats = {
      labels,
      datasets: [
        {
          label: 'Collectif',
          data: collectifDataset,
          fill: false,
          borderColor: AppConstants.getColor(0)
        },
        {
          label: 'Combativité',
          data: combativenessDataset,
          fill: false,
          borderColor: AppConstants.getColor(1)
        },
        {
          label: 'Attaque',
          data: offensiveDataset,
          fill: false,
          borderColor: AppConstants.getColor(2)
        },
        {
          label: 'Défense',
          data: defensiveDataset,
          fill: false,
          borderColor: AppConstants.getColor(3)
        },
        {
          label: 'Technique',
          data: technicalDataset,
          fill: false,
          borderColor: AppConstants.getColor(4)
        },
      ]
    };
  }

  public openTeamPlayerEditDialog(player: TeamPlayer) {
    if (this.enableCoachOptions) {
      this.playerEditDialogRef = this.dialogService.open(
        DynamicDialogTeamPlayerListEditComponent, {
          header: player.fullName,
          data: {
            team: this.team,
            player
          }
        }
      );
      this.playerEditDialogRef.onClose
        .subscribe(
          () => this.refreshPlayers()
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
        () => this.refreshMatches()
      );
  }
}
