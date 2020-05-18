import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public apiBaseUrl: string;
  public apiGouvBaseUrl: string;

  constructor() { }

  public getApiBaseUrl(): string {
    return this.apiBaseUrl;
  }

  public getApiGouvBaseUrl(): string {
    return this.apiGouvBaseUrl;
  }
}
