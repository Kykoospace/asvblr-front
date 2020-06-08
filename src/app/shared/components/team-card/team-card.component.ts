import {Component, Input, OnInit} from '@angular/core';
import Team from '../../models/entities/Team';
import PlayerTeam from '../../models/entities/PlayerTeam';
import {TeamService} from '../../services/api/team/team.service';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit {

  @Input()
  public team: Team;

  public players: PlayerTeam[] = [];

  constructor(
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
    this.teamService.getAllPlayersTeam(this.team.id)
      .subscribe(
        players => this.players = players,
        err => console.error(err)
      );
  }

  public refreshPlayers() {
    this.teamService.getAllPlayersTeam(this.team.id)
      .subscribe(
        players => this.players = players,
        err => console.error(err)
      );
  }

  public changePlayerPosition() {
    console.log('Position changed');
  }
}
