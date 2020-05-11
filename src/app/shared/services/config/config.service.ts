import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Config from '../../models/Config/Config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private confFileUrl = 'assets/config/config.json';

  constructor(
    private http: HttpClient
  ) { }

  public getConfig(): Observable<Config> {
    return this.http.get<Config>(this.confFileUrl);
  }
}
