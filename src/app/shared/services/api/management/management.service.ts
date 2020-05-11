import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import PaymentMode from '../../../models/entities/PaymentMode';
import {ConfigService} from '../../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  private apiBaseUrl: string;

  constructor(
    private configService: ConfigService,
    private http: HttpClient
  ) {
    this.configService.getConfig()
      .subscribe(config => {
        this.apiBaseUrl = config.apiBaseUrl;
      });
  }

  // ------------------------------------------------
  // PaymentMode routes :
  // ------------------------------------------------

  public getAllPaymentModes(): Observable<PaymentMode[]> {
    return this.http.get<PaymentMode[]>(this.apiBaseUrl + 'paymentModes/');
  }

  public getPaymentMode(paymentModeId: number): Observable<PaymentMode> {
    return this.http.get<PaymentMode>(this.apiBaseUrl + 'paymentModes/' + paymentModeId);
  }
}
