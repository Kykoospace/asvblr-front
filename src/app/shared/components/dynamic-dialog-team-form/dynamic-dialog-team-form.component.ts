import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/api/team/team.service';
import { ManagementService } from '../../services/api/management/management.service';
import User from '../../models/entities/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng';
import {forkJoin} from 'rxjs';
import {AuthService} from '../../services/api/auth/auth.service';

@Component({
  selector: 'app-dynamic-dialog-team-form',
  templateUrl: './dynamic-dialog-team-form.component.html',
  styleUrls: ['./dynamic-dialog-team-form.component.scss']
})
export class DynamicDialogTeamFormComponent implements OnInit {

  public teamForm: FormGroup;

  public userOptions = [
    { label: 'Coach', value: null }
  ];

  public categoryOptions = [
    { label: 'Catégorie', value: null }
  ];

  constructor(
    private teamService: TeamService,
    private managementService: ManagementService,
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    this.teamForm = this.formBuilder.group({
      name: ['', [ Validators.required, Validators.minLength(3) ]],
      idTeamCategory: [null, [ Validators.required ]],
      idCoach: [null]
    });

    forkJoin({
      categories: this.teamService.getAllTeamCategories(),
      users: this.managementService.getAllUsers()
    })
      .subscribe(
        results => {
          results.categories.forEach(
            category => this.categoryOptions.push({ label: category.name, value: category.id })
          );
          results.users.forEach(
            user => this.userOptions.push({ label: user.firstName + ' ' + user.lastName.toUpperCase(), value: user.id })
          );
        },
        err => console.error(err)
      );
  }

  public createTeam() {
    if (this.teamForm.valid) {
      this.teamService.createTeam(this.teamForm.value)
        .subscribe(
          team => this.ref.close(team),
          err => console.log(err)
          );
    }
  }

  public close() {
    this.ref.close();
  }
}
