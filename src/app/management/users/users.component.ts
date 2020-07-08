import { Component, OnInit } from '@angular/core';
import User from '../../shared/models/entities/User';
import {ManagementService} from '../../shared/services/api/management/management.service';
import { ConfirmationService, DialogService, DynamicDialogRef, MessageService} from 'primeng';
import {AuthService} from '../../shared/services/api/auth/auth.service';
import AppConstants from '../../shared/AppConstants';
import {DynamicDialogCreateUserComponent} from '../../shared/components/dynamic-dialog-create-user/dynamic-dialog-create-user.component';
import {TeamService} from '../../shared/services/api/team/team.service';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public newUserDialogRef: DynamicDialogRef;
  public userDetailToggle: boolean;

  public users: User[];
  public selectedUser: User;
  public selectedRole: boolean;

  public roleOptions: any[];
  public roleSelectOptions = [
    { label: 'Membre', value: false, icon: 'fas fa-user' },
    { label: 'Gérant', value: true, icon: 'fas fa-user-tie' }
  ]

  public columns = [
    { column: 'Prénom', field: 'firstName' },
    { column: 'Nom', field: 'lastName' },
    { column: 'Email', field: 'email' },
    { column: 'Rôles', field: 'formatedRoles' }
  ];

  constructor(
    private managementService: ManagementService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private authService: AuthService,
    private teamService: TeamService,
    private dialogService: DialogService
  ) {
    this.userDetailToggle = false;
    this.roleOptions = [];
  }

  ngOnInit(): void {
    this.refreshUsers();
    this.authService.getAllRoles()
      .subscribe(
        roles => {
          roles.forEach(
            role => this.roleOptions.push({
              label: AppConstants.getRoleName(role.name),
              value: role.id })
          );
        },
        err => console.error(err)
      );
  }

  private refreshUsers(): void {
    this.managementService.getAllUsers()
      .subscribe(
        users => {
          this.users = users;
          this.users.forEach(
            user => {
              const roles = [];
              user.roles.forEach(
                role => roles.push(AppConstants.getRoleName(role))
              );
              user.formatedRoles = roles;
            }
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
    this.selectedUser = user;
    this.userDetailToggle = true;
    this.selectedRole = AuthService.userHasRole('ROLE_MANAGER', user.roles);
  }

  public openNewUserDialog() {
    this.newUserDialogRef = this.dialogService.open(DynamicDialogCreateUserComponent, { header: 'Nouvel utilisateur non joueur' });
    this.newUserDialogRef.onClose
      .subscribe(
        (data) => {
          if (data) {
            this.managementService.createUser({ firstName: data.firstName, lastName: data.lastName, email: data.email })
              .subscribe(
                user => {
                  if (data.type) {
                    // Si coach :
                    const calls = [];
                    data.teams.forEach(id => calls.push(this.teamService.setTeamCoach(id, user.id)));
                    forkJoin(calls).subscribe(() => this.refreshUsers());
                  } else {
                    // Si gérant :
                    this.managementService.giveManagerRole(user.id).subscribe(() => this.refreshUsers());
                  }
                },
                err => console.error(err)
              );
          }
        },
        err => console.error(err)
      );
  }

  public deleteUser(user: User): void {
    this.confirmationService.confirm({
      message: 'Voulez-vous supprimer l\'utilisateur ?',
      accept: () => {
        this.managementService.deleteUser(user.id).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Utilisateur supprimé'
            });
            this.userDetailToggle = false;
            this.refreshUsers();
          },
          err => console.error(err)
        );
      }
    });
  }

  public setManagerRole(user: User, value: boolean) {
    if (value) {
      this.confirmationService.confirm({
        message: 'Voulez-vous promouvoir l\'utilisateur ?',
        accept: () => {
          this.managementService.giveManagerRole(user.id)
            .subscribe(
            user => {
              this.messageService.add({
                severity: 'success',
                summary: 'Utilisateur promu gérant'
              });
              this.refreshUsers();
            },
            err => console.error(err)
          );
        },
        reject: () => this.selectedRole = false
      });
    } else {
      this.managementService.removeManagerRole(user.id)
        .subscribe(
          user => {
            this.messageService.add({
              severity: 'success',
              summary: 'Utilisateur rétrogradé'
            });
            this.refreshUsers();
          },
          err => console.error(err)
        );
    }
  }
}
