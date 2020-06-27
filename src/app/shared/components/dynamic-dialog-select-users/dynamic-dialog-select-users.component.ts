import {Component, Input, OnInit} from '@angular/core';
import User from '../../models/entities/User';
import {DynamicDialogConfig, DynamicDialogRef, MessageService} from 'primeng';
import {ManagementService} from '../../services/api/management/management.service';

@Component({
  selector: 'app-dynamic-dialog-select-users',
  templateUrl: './dynamic-dialog-select-users.component.html',
  styleUrls: ['./dynamic-dialog-select-users.component.scss']
})
export class DynamicDialogSelectUsersComponent implements OnInit {

  @Input()
  public sourceUsers: User[] = [];

  @Input()
  public targetUsers: User[] = [];

  constructor(
    private managementService: ManagementService,
    private messageService: MessageService,
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.managementService.getAllUsers()
      .subscribe(
        users => {
          const targetUsers = this.config.data.targetUsers;
          users.forEach(user => {
            if (targetUsers.find(targetUser => targetUser === user.id)) {
              this.targetUsers.push(user);
            } else {
              this.sourceUsers.push(user);
            }
          });
        },
        err => console.error(err)
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
