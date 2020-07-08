import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {TeamService} from '../../services/api/team/team.service';
import Match from '../../models/entities/Match';
import {DialogService, DynamicDialogRef} from 'primeng';
import {DynamicDialogTeamMatchDetailComponent} from '../dynamic-dialog-team-match-detail/dynamic-dialog-team-match-detail.component';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-team-match-list',
  templateUrl: './team-match-list.component.html',
  styleUrls: ['./team-match-list.component.scss']
})
export class TeamMatchListComponent implements OnChanges {

  @Output()
  public matchChange: EventEmitter<void> = new EventEmitter();

  @Input()
  public matches: Match[] = [];

  @Input()
  public enableCoachOptions: boolean = false;

  @Input()
  public enableDriveOptions: boolean = false;

  public matchDetailDialogRef: DynamicDialogRef;

  public futuresMatches: Match[] = [];
  public passedMatches: Match[] = [];

  constructor(
    private teamService: TeamService,
    private dialogService: DialogService
  ) { }

  public ngOnChanges(changes: SimpleChanges) {
    if (this.matches) {
      this.futuresMatches = this.matches.filter(match => match.date.getTime() > Date.now());
      this.passedMatches = this.matches.filter(match => match.date.getTime() < Date.now());
    }
  }

  public selectMatch(match: Match) {
    this.matchDetailDialogRef = this.dialogService.open(
      DynamicDialogTeamMatchDetailComponent, {
        header: 'Détail de rencontre',
        width: '70%',
        data: {
          match,
          enableCoachOptions: this.enableCoachOptions,
          enableDriveOptions: this.enableDriveOptions
        }
      }
    );

    this.matchDetailDialogRef.onClose
      .subscribe(
        () => this.matchChange.emit()
      );
  }
}
