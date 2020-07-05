import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef, MessageService} from 'primeng';
import {ManagementService} from '../../services/api/management/management.service';

@Component({
  selector: 'app-dynamic-dialog-team-select-coach',
  templateUrl: './dynamic-dialog-team-select-coach.component.html',
  styleUrls: ['./dynamic-dialog-team-select-coach.component.scss']
})
export class DynamicDialogTeamSelectCoachComponent implements OnInit {

  public coachName: string;
  public newCoach: number;

  public userOptions: any[];

  constructor(
    private managementService: ManagementService,
    private messageService: MessageService,
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {
    this.newCoach = null;
    this.userOptions = [];
  }

  ngOnInit(): void {
    this.coachName = this.config.data.coachName;
    this.managementService.getAllUsers()
      .subscribe(
        users => {
          users.forEach(
            user => this.userOptions.push({
              label: user.fullName,
              value: user.id
            })
          );
        },
        err => console.error(err)
      );
  }

  public getCoachName(): string {
    if (this.coachName) {
      return this.coachName;
    }
    return 'Aucun coach';
  }

  public cancel(): void {
    this.ref.close();
  }

  public close(): void {
    this.ref.close(this.newCoach);
  }
}
