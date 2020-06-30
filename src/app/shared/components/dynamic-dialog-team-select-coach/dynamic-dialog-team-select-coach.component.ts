import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef, MessageService} from 'primeng';
import User from '../../models/entities/User';
import {ManagementService} from '../../services/api/management/management.service';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-dynamic-dialog-team-select-coach',
  templateUrl: './dynamic-dialog-team-select-coach.component.html',
  styleUrls: ['./dynamic-dialog-team-select-coach.component.scss']
})
export class DynamicDialogTeamSelectCoachComponent implements OnInit {

  public coach: User;
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
    forkJoin({
      coach: this.managementService.getUser(this.config.data.idCoach),
      users: this.managementService.getAllUsers()
    })
      .subscribe(
        results => {
          this.coach = results.coach;
          results.users.forEach(
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
    if (this.coach) {
      return this.coach.fullName;
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
