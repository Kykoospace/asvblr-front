import {Component, OnInit, ViewChild} from '@angular/core';
import {TeamCardComponent} from '../../shared/components/team-card/team-card.component';
import TeamList from '../../shared/models/responses/TeamList';
import {ActivatedRoute, Router} from '@angular/router';
import {TeamService} from '../../shared/services/api/team/team.service';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.scss']
})
export class CoachComponent implements OnInit {

  @ViewChild('teamCardComponent')
  teamCardComponent: TeamCardComponent;

  public team: TeamList;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.teamService.getTeam(params.id)
          .subscribe(
            team => this.team = team
          );
      }
    );
  }
}
