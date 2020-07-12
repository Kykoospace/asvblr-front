import { Component, OnInit } from '@angular/core';
import {TeamService} from '../../shared/services/api/team/team.service';
import TeamList from '../../shared/models/responses/TeamList';
import {ActivatedRoute, Router} from '@angular/router';
import Team from '../../shared/models/entities/Team';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  public teams: Team[];
  public team: TeamList;

  constructor(
    private teamService: TeamService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const idTeam = +this.route.snapshot.paramMap.get('id');
    if (idTeam) {
      this.teamService.getTeam(idTeam)
        .subscribe(
          team => this.team = team,
          err => this.router.navigate(['/main/teams'])
        );
    } else {
      this.teamService.getAllTeams()
        .subscribe(
          teams => this.teams = teams,
          err => console.error(err)
        );
    }
  }
}
