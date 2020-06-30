import {Component, Input, OnInit} from '@angular/core';
import User from '../../models/entities/User';
import {DynamicDialogConfig, DynamicDialogRef, MessageService} from 'primeng';
import {ManagementService} from '../../services/api/management/management.service';
import {forkJoin} from 'rxjs';
import {TeamService} from '../../services/api/team/team.service';
import TeamList from '../../models/responses/TeamList';

@Component({
  selector: 'app-dynamic-dialog-select-users',
  templateUrl: './dynamic-dialog-select-users.component.html',
  styleUrls: ['./dynamic-dialog-select-users.component.scss']
})
export class DynamicDialogSelectUsersComponent implements OnInit {

  public sourceUsers: User[];
  public targetUsers: User[];

  public teamOptions: any;

  constructor(
    private managementService: ManagementService,
    private teamService: TeamService,
    private messageService: MessageService,
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {
    this.sourceUsers = [];
    this.targetUsers = [];
    this.teamOptions = [
      { label: 'Équipe', value: null }
    ];
  }

  ngOnInit(): void {
    const requests: any = {
      users: this.managementService.getAllUsers(),
      teams: this.teamService.getTeamList()
    };

    forkJoin(requests)
      .subscribe(
        (results: any) => {
          const targetUsers = this.config.data.targetUsers;
          results.users.forEach(user => {
            if (targetUsers.find(targetUser => targetUser === user.id)) {
              this.targetUsers.push(user);
            } else {
              this.sourceUsers.push(user);
            }
          });
          results.teams.forEach(
            (team: TeamList) => this.teamOptions.push({
              label: team.teamName,
              value: team.id
            })
          );
        },
        err => console.error(err)
      );
  }

  public addTeamUsers(idTeam: number) {
    this.teamService.getAllTeamUsers(idTeam)
      .subscribe(
        users => this.addCollectionToTarget(users)
      );
  }

  public addCollectionToTarget(users: User[]): void {
    const sourceUsers = [];
    const targetUsers = this.targetUsers;
    this.sourceUsers.forEach(
      sourceUser => {
        if (users.find(user => user.id === sourceUser.id)) {
          targetUsers.push(sourceUser);
        } else {
          sourceUsers.push(sourceUser);
        }
      }
    );
    this.sourceUsers = sourceUsers;
    this.targetUsers = targetUsers;
  }

  public cancel(): void {
    this.ref.close();
  }

  public close(): void {
    this.ref.close(this.targetUsers);
  }
}
