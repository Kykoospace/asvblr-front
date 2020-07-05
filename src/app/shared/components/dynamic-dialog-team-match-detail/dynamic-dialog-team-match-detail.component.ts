import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/api/team/team.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng';
import Match from '../../models/entities/Match';
import Drive from '../../models/entities/Drive';

@Component({
  selector: 'app-dynamic-dialog-team-match-detail',
  templateUrl: './dynamic-dialog-team-match-detail.component.html',
  styleUrls: ['./dynamic-dialog-team-match-detail.component.scss']
})
export class DynamicDialogTeamMatchDetailComponent implements OnInit {

  public match: Match;
  public enableDriveOptions: boolean = false;
  public drives: Drive[];

  constructor(
    private teamService: TeamService,
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.match = this.config.data.match;
    this.enableDriveOptions = this.config.data.enableDriveOptions;
    if (this.enableDriveOptions) {
      this.teamService.getMatchDrives(this.match.id)
        .subscribe(
          drives => this.drives = drives,
          err => console.error(err)
        );
    }
  }
}
