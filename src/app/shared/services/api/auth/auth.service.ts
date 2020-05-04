import { Injectable } from '@angular/core';
import { TokenStorageService } from '../../token-storage/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';

interface SignInResponse {
  id: number;
  username: string;
  email: string;
  roles: string[];
  type: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static API_URL = 'http://127.0.0.1:8080/api/';

  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) { }

  public signIn(username: string, password: string): Observable<SignInResponse> {
    return this.http
      .post<SignInResponse>(
        AuthService.API_URL + 'auth/signin',
        { username, password }
        )
      .pipe(
        map(auth => {
          this.tokenStorageService.storeToken(auth.token);
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
}
