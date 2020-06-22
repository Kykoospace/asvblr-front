import { Injectable } from '@angular/core';
import { TokenStorageService } from '../../token-storage/token-storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

  public static NO_BEARER_HEADER: string = 'no-bearer';

  private apiBaseUrl: string;

  constructor(
    private configService: ConfigService,
    private router: Router,
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {
    this.apiBaseUrl = this.configService.getApiBaseUrl();
  }

  public getAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': 'Bearer ' + this.getToken() });
  }

  public signIn(authCredentials: any): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(
      this.apiBaseUrl + 'auth/signin', authCredentials
      )
      .pipe(
        map(auth => {
          this.tokenStorageService.storeToken(auth);
          return auth;
        })
      );
  }

  public signOut(returnUrl: string = null): void {
    this.tokenStorageService.removeToken();
    this.router.navigate(['login', { returnUrl: returnUrl ? returnUrl : this.router.routerState.snapshot.url }]);
  }

  public isSignedIn(): boolean {
    return this.tokenStorageService.isTokenStored();
  }

  public getLoggedUser(): User {
    return this.tokenStorageService.getUser();
  }

  public getToken(): string {
    return this.tokenStorageService.getToken();
  }

  public resetPassword(email: string): Observable<any> {
    return this.http.post<any>(this.apiBaseUrl + 'users/reset-password', { email });
  }

  public changePassword(oldPassword: string, password: string): Observable<any> {
    console.log('oldPassword', oldPassword);
    console.log('password', password);
    return this.http.post(this.apiBaseUrl + 'users/update-password', { oldPassword: oldPassword, password: password }, { headers: this.getAuthorizationHeader() });
  }
}
