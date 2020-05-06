import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  // TODO : mettre cette constante dans un fichier de configuration
  private static API_URL = 'http://127.0.0.1:8080/api/';

  constructor(
    private http: HttpClient
  ) { }

  public getAllSubscriptions
}
