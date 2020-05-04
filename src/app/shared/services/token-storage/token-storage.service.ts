import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  public static TOKEN_KEY = 'asvblr-token';

  constructor() { }

  public storeToken(token: string): void {
    window.localStorage.setItem(TokenStorageService.TOKEN_KEY, token);
  }

  public getToken(): string {
    return window.localStorage.getItem(TokenStorageService.TOKEN_KEY);
  }

  public removeToken(): void {
    window.localStorage.removeItem(TokenStorageService.TOKEN_KEY);
  }

  public isTokenStored(): boolean {
    return window.localStorage.getItem(TokenStorageService.TOKEN_KEY) !== null;
  }
}
