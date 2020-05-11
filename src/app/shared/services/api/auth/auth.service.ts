import { Injectable } from '@angular/core';
import { TokenStorageService } from '../../token-storage/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ConfigService } from '../../config/config.service';
import SignInResponse from '../../../models/responses/SignInResponse';
import User from '../../../models/entities/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // TODO : mettre cette constante dans un fichier de configuration
  private apiBaseUrl: string;

  constructor(
    private configService: ConfigService,
    private router: Router,
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {
    this.configService.getConfig()
      .subscribe(config => {
        this.apiBaseUrl = config.apiBaseUrl;
      });
  }

  public signIn(username: string, password: string): Observable<SignInResponse> {
    return this.http
      .post<SignInResponse>(
        this.apiBaseUrl + 'auth/signin',
        { username, password }
        )
      .pipe(
        map(auth => {
          this.tokenStorageService.storeToken(auth);
          return auth;
        })
      );
  }

  public signOut(): void {
    this.tokenStorageService.removeToken();
    this.router.navigate(['login', { returnUrl: this.router.routerState.snapshot.url }]);
  }

  public isSignedIn(): boolean {
    return this.tokenStorageService.isTokenStored();
  }

  public getLoggedUser(): User {
    return this.tokenStorageService.getUser();
  }
}
