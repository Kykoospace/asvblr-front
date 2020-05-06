import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/api/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginErrorToggle = false;
  loginErrorMessage = 'Identifiants incorrects';
  formErrorUsernameToggle = false;
  formErrorUsernameMessage = 'Identifiant manquant';
  formErrorPasswordToggle = false;
  formErrorPasswordMessage = 'Mot de passe manquant';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: this.formBuilder.control('', [ Validators.required ]),
      password: this.formBuilder.control('', [ Validators.required ])
    });
  }

  ngOnInit(): void { }

  public signIn() {
    this.loginErrorToggle = false;
    this.formErrorUsernameToggle = false;
    this.formErrorPasswordToggle = false;

    if (this.loginForm.valid) {
      this.authService.signIn(
        this.loginForm.controls.username.value,
        this.loginForm.controls.password.value
      ).subscribe(
        auth => {
          const nextUrl = this.route.snapshot.paramMap.get('returnUrl') || 'management';
          this.router.navigate([nextUrl]);
        },
        err => {
          this.loginErrorToggle = true;
        }
      );
    } else {
      if (this.loginForm.value.username === '') {
        this.formErrorUsernameToggle = true;
      }
      if (this.loginForm.value.password === '') {
        this.formErrorPasswordToggle = true;
      }
    }
  }
}
