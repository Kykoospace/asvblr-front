import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Drive from '../../models/entities/Drive';
import {AuthService} from '../../services/api/auth/auth.service';
import User from '../../models/entities/User';
import Match from '../../models/entities/Match';
import {TeamService} from '../../services/api/team/team.service';
import {MessageService} from 'primeng';

@Component({
  selector: 'app-match-drive-list',
  templateUrl: './match-drive-list.component.html',
  styleUrls: ['./match-drive-list.component.scss']
})
export class MatchDriveListComponent implements OnInit {

  @Output()
  public deleteDrive: EventEmitter<Drive> = new EventEmitter();

  @Output()
  public enterDrive: EventEmitter<Drive> = new EventEmitter();

  @Output()
  public leaveDrive: EventEmitter<Drive> = new EventEmitter();

  @Input()
  public drives: Drive[];

  @Input()
  public match: Match;

  constructor() { }

  ngOnInit(): void { }

  public onDeleteDrive(drive: Drive): void {
    this.deleteDrive.emit(drive);
  }

  public onEnterDrive(drive: Drive): void {
    this.enterDrive.emit(drive);
  }

  public onLeaveDrive(drive: Drive): void {
    this.leaveDrive.emit(drive);
  }
}
