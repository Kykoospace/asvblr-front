import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Config from '../../models/config/Config';
import { Observable } from 'rxjs';

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
