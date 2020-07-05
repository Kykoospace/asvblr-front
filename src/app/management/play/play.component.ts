import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TeamCardComponent} from '../../shared/components/team-card/team-card.component';
import TeamList from '../../shared/models/responses/TeamList';
import {TeamService} from '../../shared/services/api/team/team.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements AfterViewInit {

  @ViewChild('teamCardComponent')
  teamCardComponent: TeamCardComponent;

  public team: TeamList;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teamService: TeamService
  ) { }

  ngAfterViewInit(): void {
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
