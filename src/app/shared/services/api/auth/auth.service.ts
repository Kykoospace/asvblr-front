import { Injectable } from '@angular/core';
import { TokenStorageService } from '../../token-storage/token-storage.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ConfigService } from '../../config/config.service';
import SignInResponse from '../../../models/responses/SignInResponse';
import User from '../../../models/entities/User';
import Role from '../../../models/entities/Role';

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

  public sendRequestResetPassword(email: string): Observable<any> {
    return this.http.post<any>(this.apiBaseUrl + 'users/reset-password', { email });
  }

  public changePassword(oldPassword: string, password: string): Observable<any> {
    return this.http.post<any>(
      this.apiBaseUrl + 'users/update-password',
      { oldPassword, password },
      { headers: this.getAuthorizationHeader() });
  }

  public checkResetPasswordToken(token: string): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl + 'users/change-password?token=' + token);
  }

  public resetPassword(password: string, token: string): Observable<any> {
    return this.http.post<any>(this.apiBaseUrl + 'users/save-password?password=' + password + '&token=' + token, {});
  }




  public getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiBaseUrl + 'roles', { headers: this.getAuthorizationHeader() });
  }

  public getRole(idRole: number): Observable<Role> {
    return this.http.get<Role>(this.apiBaseUrl + 'roles/' + idRole);
  }
}
