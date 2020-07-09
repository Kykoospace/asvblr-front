import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Ville {
  nom: string;
  code: string;
  codeDepartement: string;
  codeRegion: string;
  codesPosteaux: string[];
  population: number;
}

@Injectable({
  providedIn: 'root'
})
export class GouvService {

  constructor(
    private http: HttpClient
  ) { }

  public getCityByPostcode(postcode: number): Observable<Ville[]> {
    return this.http.get<Ville[]>('https://geo.api.gouv.fr/communes?codePostal=' + postcode);
  }
}
