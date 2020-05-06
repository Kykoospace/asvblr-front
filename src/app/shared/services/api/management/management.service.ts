import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import PaymentMode from '../../../models/entities/PaymentMode';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  // TODO : mettre cette constante dans un fichier de configuration
  private static API_URL = 'http://127.0.0.1:8080/api/';

  constructor(
    private http: HttpClient
  ) { }

  // ------------------------------------------------
  // PaymentMode routes :
  // ------------------------------------------------

  public getAllPaymentModes(): Observable<PaymentMode[]> {
    return this.http.get<PaymentMode[]>(ManagementService.API_URL + 'paymentModes/');
  }

  public getPaymentMode(paymentModeId: number): Observable<PaymentMode> {
    return this.http.get<PaymentMode>(ManagementService.API_URL + 'paymentModes/' + paymentModeId);
  }
}