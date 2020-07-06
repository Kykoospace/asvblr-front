import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Drive from '../../../models/entities/Drive';
import User from '../../../models/entities/User';
import {TeamService} from '../../../services/api/team/team.service';
import {AuthService} from '../../../services/api/auth/auth.service';
import {MessageService} from 'primeng';

@Component({
  selector: 'app-match-drive-card',
  templateUrl: './match-drive-card.component.html',
  styleUrls: ['./match-drive-card.component.scss']
})
export class MatchDriveCardComponent implements OnInit {

  @Output()
  public deleteDrive: EventEmitter<Drive> = new EventEmitter();

  @Output()
  public enterDrive: EventEmitter<Drive> = new EventEmitter();

  @Output()
  public leaveDrive: EventEmitter<Drive> = new EventEmitter();

  @Input()
  public drive: Drive;
  public passengers: User[];
  public loggedUser: User;

  constructor(
    private teamService: TeamService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.refreshDrive();
    this.loggedUser = this.authService.getLoggedUser();
  }

  public refreshDrive(): void {
    this.teamService.getDrivePassengers(this.drive.id)
      .subscribe(
        passengers => this.passengers = passengers,
        err => console.error(err)
      );
  }

  public deleteThisDrive(): void {
    this.deleteDrive.emit(this.drive);
  }

  public userCanEnter(): boolean {
    if (!this.passengers) {
      return false;
    }
    if (this.drive.idDriver === this.loggedUser.id) {
      return false;
    }
    if (!this.passengers.find(passenger => passenger.id === this.loggedUser.id)) {
      return true;
    }
    return false;
  }

  public enterThisDrive(): void {
    this.enterDrive.emit(this.drive);
  }

  public leaveThisDrive(): void {
    this.leaveDrive.emit(this.drive);
  }
}
