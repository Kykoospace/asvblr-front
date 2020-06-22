import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/api/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public token: string;
  public recoverSuccessToggle: boolean;

  public passwordRecoverErrorToggle: boolean;
  public passwordRecoverErrorMessage: string;

  public changePasswordErrorMessage: string;

  public passwordRecoverForm: FormGroup;
  public changePasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.recoverSuccessToggle = false;
    this.passwordRecoverErrorToggle = false;
    this.passwordRecoverErrorMessage = 'Cet email ne correspond à aucun compte';
    this.changePasswordErrorMessage = 'Les mots de passes sont différents';
  }

  ngOnInit(): void {
    this.passwordRecoverForm = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email ]]
    });

    this.changePasswordForm = this.formBuilder.group({
      password: ['', [ Validators.required ]],
      confirmation: ['', [ Validators.required ]]
    }, { validators: this.checkPasswords });

    this.route.queryParams
      .subscribe(
        params => {
          if (params.token) {
            this.authService.checkResetPasswordToken(params.token).subscribe(
              (results) => {
                this.token = params.token;
              },
              err => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Lien expiré',
                  detail: 'Vous pouvez demander un nouveau lien de récupération de mot de passe en suivant le lien mot de passe oublié'
                });
              }
            );
          }
        }
      );
  }

  public checkPasswords(group: FormGroup) {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmation').value;

    return pass === confirmPass ? null : { notSame: true };
  }

  public sendPasswordRecoverRequest() {
    if (this.passwordRecoverForm.valid) {
      this.authService.sendRequestResetPassword(this.passwordRecoverForm.value.email)
        .subscribe(
          () => this.recoverSuccessToggle = true,
          err => {
            console.error(err);
            this.passwordRecoverErrorToggle = true;
          }
        );
    }
  }

  public changePassword() {
    console.log('Change password requested');
  }

  public backToConnexion() {
    this.router.navigate(['/login']);
  }
}
