import {Component, Input } from '@angular/core';
import {TeamService} from '../../services/api/team/team.service';
import Match from '../../models/entities/Match';
import {DialogService, DynamicDialogRef} from 'primeng';
import {DynamicDialogTeamMatchDetailComponent} from '../dynamic-dialog-team-match-detail/dynamic-dialog-team-match-detail.component';

@Component({
  selector: 'app-team-match-list',
  templateUrl: './team-match-list.component.html',
  styleUrls: ['./team-match-list.component.scss']
})
export class TeamMatchListComponent {

  @Input()
  public matches: Match[];

  @Input()
  public enableDriveOptions: boolean = false;

  public matchDetailDialogRef: DynamicDialogRef;

  constructor(
    private teamService: TeamService,
    private dialogService: DialogService
  ) { }

  public selectMatch(match: Match) {
    this.matchDetailDialogRef = this.dialogService.open(
      DynamicDialogTeamMatchDetailComponent, {
        header: 'Détail de rencontre',
        data: {
          match: match,
          enableDriveOptions: this.enableDriveOptions
        }
      }
    );
  }
}
