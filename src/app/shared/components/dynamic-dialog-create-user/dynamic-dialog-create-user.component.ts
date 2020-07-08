import { Component, OnInit } from '@angular/core';
import {TeamService} from '../../services/api/team/team.service';
import TeamList from '../../models/responses/TeamList';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ManagementService} from '../../services/api/management/management.service';
import {DynamicDialogRef, MessageService} from 'primeng';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-dynamic-dialog-create-user',
  templateUrl: './dynamic-dialog-create-user.component.html',
  styleUrls: ['./dynamic-dialog-create-user.component.scss']
})
export class DynamicDialogCreateUserComponent implements OnInit {

  public newUserForm: FormGroup;

  public formLabelValues = {
    firstName: 'Prénom',
    lastName: 'Nom de famille',
    email: 'Adresse mail',
    type: 'Type d\'utilisateur',
    teams: 'Équipes à entrainer'
  }

  public teams: any[] = [];

  constructor(
    private ref: DynamicDialogRef,
    private managementService: ManagementService,
    private teamService: TeamService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.newUserForm = this.formBuilder.group({
      type: [null, [ Validators.required ]],
      firstName: ['', [ Validators.required, Validators.minLength(3) ]],
      lastName: ['', [ Validators.required, Validators.minLength(3) ]],
      email: ['', [ Validators.required, Validators.email ]],
      teams: [null]
    });
    this.newUserForm.get('type').valueChanges
      .subscribe(
        value => {
          if (value) {
            this.newUserForm.get('teams').setValidators(Validators.required);
          } else {
            this.newUserForm.get('teams').clearValidators();
          }
          this.newUserForm.get('teams').updateValueAndValidity();
        }
      );

    this.teamService.getAllTeams()
      .subscribe(
        teams => teams.forEach(team => this.teams.push({ label: team.name, value: team.id })),
        err => console.error(err)
      );
  }

  public createUser(): void {
    if (this.newUserForm.valid) {
      const data = this.newUserForm.value;
      this.managementService.createUser({ firstName: data.firstName, lastName: data.lastName, email: data.email })
        .subscribe(
          user => {
            if (data.type) {
              // Si coach :
              const calls = [];
              data.teams.forEach(id => calls.push(this.teamService.setTeamCoach(id, user.id)));
              forkJoin(calls).subscribe(() => this.ref.close());
            } else {
              // Si gérant :
              this.managementService.giveManagerRole(user.id).subscribe(() => this.ref.close());
            }
          },
          err => this.messageService.add({
            severity: 'error',
            summary: 'Email déjà utilisé'
          })
        );
    }
  }

  public close() {
    this.ref.close();
  }
}
