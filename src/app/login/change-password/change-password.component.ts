import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService} from '../../shared/services/api/auth/auth.service';
import { MessageService} from 'primeng';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public changePasswordForm: FormGroup;

  public changePasswordErrorMessage: string;
  public changePasswordErrorToggle: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.changePasswordErrorMessage = 'Les mots de passes sont différents';
    this.changePasswordErrorToggle = false;
  }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', [ Validators.required ]],
      password: ['', [ Validators.required, Validators.minLength(5) ]],
      confirmation: ['', [ Validators.required, Validators.minLength(5) ]]
    }, { validators: this.checkPasswords });
  }

  public checkPasswords(group: FormGroup) {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmation').value;

    return pass === confirmPass ? null : { notSame: true };
  }

  public changePassword() {
    if (this.changePasswordForm.valid) {
      const form = this.changePasswordForm.value;
      console.log('Change password');
      this.authService.changePassword(form.oldPassword, form.password)
        .subscribe(
          (user) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Mot de passe changé'
            });
            this.authService.signOut('/management');
          },
          err => this.messageService.add({
            severity: 'error',
            summary: 'Le mot de passe est incorrect'
          })
        );
    }
  }
}
