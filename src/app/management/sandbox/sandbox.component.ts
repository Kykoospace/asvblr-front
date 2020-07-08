import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TeamService} from '../../shared/services/api/team/team.service';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss']
})
export class SandboxComponent implements OnInit {

  public testForm: FormGroup;
  public file: File;

  constructor(
    private formBuilder: FormBuilder,
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
    this.testForm = this.formBuilder.group({
      idSubscription: [null, [ Validators.required ]]
    });
  }

  public onSelectFile(event) {
    this.file = <File>event.target.files[0];
  }

  public submit(): void {
    if (this.testForm.valid) {
      this.teamService.updateSubscriptionCNI(
        this.testForm.get('idSubscription').value,
        this.file
      )
        .subscribe(
          () => {
            console.log('success');
          },
          err => console.error(err)
        );
    }
  }
}
