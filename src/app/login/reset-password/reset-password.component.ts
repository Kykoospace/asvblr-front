import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/api/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public token: string;
  public recoverSuccessToggle: boolean = false;

  public passwordRecoverErrorToggle: boolean = false;
  public passwordRecoverErrorMessage: string = 'Cet email ne correspond à aucun compte';

  public passwordRecoverForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.passwordRecoverForm = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email ]]
    });

    this.token = this.route.snapshot.paramMap.get('token');
  }

  public sendPasswordRecoverRequest() {
    if (this.passwordRecoverForm.valid) {
      this.authService.resetPassword(this.passwordRecoverForm.value.email)
        .subscribe(
          () => this.recoverSuccessToggle = true,
          err => {
            console.error(err);
            this.passwordRecoverErrorToggle = true;
          }
        );
    }
  }

  public backToConnexion() {
    this.router.navigate(['/login']);
  }
}
