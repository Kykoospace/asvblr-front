import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public apiBaseUrl: string;

  constructor() { }

  public getApiBaseUrl(): string {
    return this.apiBaseUrl;
  }


}
