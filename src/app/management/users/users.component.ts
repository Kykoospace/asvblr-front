import {Component, OnDestroy, OnInit} from '@angular/core';
import User from '../../shared/models/entities/User';
import {ManagementService} from '../../shared/services/api/management/management.service';
import { ConfirmationService, DialogService, DynamicDialogRef, MessageService} from 'primeng';
import {AuthService} from '../../shared/services/api/auth/auth.service';
import AppConstants from '../../shared/AppConstants';
import {DynamicDialogCreateUserComponent} from '../../shared/components/dynamic-dialog-create-user/dynamic-dialog-create-user.component';
import {TeamService} from '../../shared/services/api/team/team.service';
import {DynamicDialogUsersSelectPresidentComponent} from '../../shared/components/dynamic-dialog-users-select-president/dynamic-dialog-users-select-president.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  public changePresidentDialogRef: DynamicDialogRef;
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

  ngOnDestroy(): void {
    if (this.newUserDialogRef) {
      this.newUserDialogRef.close();
    }
    if (this.changePresidentDialogRef) {
      this.changePresidentDialogRef.close();
    }
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
      .subscribe(() => this.refreshUsers());
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

  public openChangePresidentDialog(): void {
    this.changePresidentDialogRef = this.dialogService.open(
      DynamicDialogUsersSelectPresidentComponent,
      {
        header: 'Changement de président'
      }
    );
  }
}
