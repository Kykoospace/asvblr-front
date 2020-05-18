import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GouvService {

  private apiBaseUrl: string;

  constructor(
    private configService: ConfigService,
    private http: HttpClient
  ) {
    this.apiBaseUrl = this.configService.getApiGouvBaseUrl();
  }

  public getCityByPostcode(postcode: number): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl + 'communes?codePostal=' + postcode)
      .pipe(map((cities: any[]) => {
        return cities.pop();
      }));
  }
}
