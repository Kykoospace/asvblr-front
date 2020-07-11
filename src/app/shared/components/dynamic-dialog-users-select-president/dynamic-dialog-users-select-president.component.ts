import { Component, OnInit } from '@angular/core';
import {ManagementService} from '../../services/api/management/management.service';
import {DynamicDialogConfig, DynamicDialogRef, MessageService} from 'primeng';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dynamic-dialog-users-select-president',
  templateUrl: './dynamic-dialog-users-select-president.component.html',
  styleUrls: ['./dynamic-dialog-users-select-president.component.scss']
})
export class DynamicDialogUsersSelectPresidentComponent implements OnInit {

  public userOptions = [
    { label: "Président", value: null }
  ];

  constructor(
    private managementService: ManagementService,
    private messageService: MessageService,
    private router: Router,
    private ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.managementService.getAllUsers()
      .subscribe(
        users => users.forEach(user => this.userOptions.push({ label: user.fullName, value: user.id })),
        err => console.error(err)
      );
  }

  changePresident(idUser: number): void {
    this.managementService.givePresidentRole(idUser)
      .subscribe(
        user => {
          this.messageService.add({
            severity: 'success',
            summary: 'Les droits du président ont bien été transférés'
          });
          this.router.navigate(['/login/sign-out']);
          this.ref.close();
        }
      );
  }

  cancel(): void {
    this.ref.close();
  }
}
