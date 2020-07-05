import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import PlayerTeam from '../../models/entities/PlayerTeam';
import {TeamService} from '../../services/api/team/team.service';
import {forkJoin} from 'rxjs';
import TeamList from '../../models/responses/TeamList';
import Match from '../../models/entities/Match';
import {TeamMatchListComponent} from '../team-match-list/team-match-list.component';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements AfterViewInit, OnChanges {

  @Input()
  public team: TeamList;
  public players: PlayerTeam[] = [];
  public matches: Match[];

  constructor(
    private teamService: TeamService
  ) { }

  ngAfterViewInit(): void {
    this.refreshTeam();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.refreshTeam();
  }

  public refreshTeam() {
    const requests = {
      players: this.teamService.getAllPlayersTeam(this.team.id),
      matches: this.teamService.getAllTeamMatches(this.team.id)
    };

    forkJoin(requests)
      .subscribe(
        (results: any) => {
          this.players = results.players;
          this.matches = results.matches;
        },
        err => console.error(err)
      );
  }

  public changePlayerPosition() {
    console.log('Position changed');
  }
}
