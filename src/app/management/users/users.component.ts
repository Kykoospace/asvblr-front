import { Component, OnInit } from '@angular/core';
import User from '../../shared/models/entities/User';
import {ManagementService} from '../../shared/services/api/management/management.service';
import {MessageService} from 'primeng';
import {forkJoin} from 'rxjs';
import {AuthService} from '../../shared/services/api/auth/auth.service';
import AppConstants from '../../shared/AppConstants';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public newUserToggle: boolean;

  public users: User[];

  public roleOptions: any[];

  public columns = [
    { column: 'Prénom', field: 'firstName' },
    { column: 'Nom', field: 'lastName' },
    { column: 'Email', field: 'email' },
    { column: 'Rôles', field: 'roles' }
  ];

  constructor(
    private managementService: ManagementService,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    this.newUserToggle = false;
    this.roleOptions = [];
  }

  ngOnInit(): void {
    forkJoin({
      users: this.managementService.getAllUsers(),
      roles: this.authService.getAllRoles()
    }).subscribe(
        results => {
          this.users = results.users;
          this.users.forEach(
            user => {
              const roles = [];
              user.roles.forEach(
                role => roles.push(AppConstants.getRoleName(role))
              );
              user.roles = roles;
            }
          );
          results.roles.forEach(
            role => this.roleOptions.push({
              label: AppConstants.getRoleName(role.name),
              value: role.id })
          );
        },
        err => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Chargement des utilisateurs impossible',
            detail: 'Une erreur est survenue lors du chargement des utilisateurs.'
          });
        }
      );
  }

  public selectUser(user: User) {

  }
}
