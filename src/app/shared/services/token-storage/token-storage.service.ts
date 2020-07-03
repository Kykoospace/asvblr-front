import { Injectable } from '@angular/core';
import SignInResponse from '../../models/responses/SignInResponse';
import User from '../../models/entities/User';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  public static TOKEN_KEY = 'asvblr-token';

  constructor() { }

  public storeToken(auth: SignInResponse): void {
    window.localStorage.setItem(TokenStorageService.TOKEN_KEY, JSON.stringify(auth));
  }

  public getToken(): string {
    const session = window.localStorage
      .getItem(TokenStorageService.TOKEN_KEY)
    return (session) ? JSON.parse(session).token : session;
  }

  public getUser(): User {
    return JSON.parse(
      window.localStorage
        .getItem(TokenStorageService.TOKEN_KEY)
    ).user;
  }

  public setUser(user: User): void {
    const auth = JSON.parse(window.localStorage.getItem(TokenStorageService.TOKEN_KEY));
    if (auth) {
      auth.user = user;
      window.localStorage.setItem(TokenStorageService.TOKEN_KEY, JSON.stringify(auth));
    }
  }

  public removeToken(): void {
    window.localStorage.removeItem(TokenStorageService.TOKEN_KEY);
  }

  public isTokenStored(): boolean {
    return window.localStorage.getItem(TokenStorageService.TOKEN_KEY) !== null;
  }
}
