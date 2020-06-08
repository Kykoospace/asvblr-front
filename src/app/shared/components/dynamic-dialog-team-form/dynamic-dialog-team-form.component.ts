import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/api/team/team.service';
import { ManagementService } from '../../services/api/management/management.service';
import User from '../../models/entities/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng';

@Component({
  selector: 'app-dynamic-dialog-team-form',
  templateUrl: './dynamic-dialog-team-form.component.html',
  styleUrls: ['./dynamic-dialog-team-form.component.scss']
})
export class DynamicDialogTeamFormComponent implements OnInit {

  public teamForm: FormGroup;

  public users: User[];
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

    this.teamService.getAllTeamCategories()
      .subscribe(
        categories => {
          categories.forEach(
            category => this.categoryOptions.push({ label: category.name, value: category.id })
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
