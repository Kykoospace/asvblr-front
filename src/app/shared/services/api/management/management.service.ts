import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { Observable } from 'rxjs';
import PaymentMode from '../../../models/entities/PaymentMode';
import Article from '../../../models/entities/Article';
import Pageable from '../../../models/paging/Pageable';
import {map} from 'rxjs/operators';
import Page from '../../../models/paging/Page';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  private apiBaseUrl: string;

  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.apiBaseUrl = this.configService.getApiBaseUrl();
  }

  // ------------------------------------------------
  // PaymentMode routes :
  // ------------------------------------------------

  public getAllPaymentModes(): Observable<PaymentMode[]> {
    return this.http.get<PaymentMode[]>(this.apiBaseUrl + 'payment-modes');
  }

  public getPaymentMode(paymentModeId: number): Observable<PaymentMode> {
    return this.http.get<PaymentMode>(this.apiBaseUrl + 'payment-modes/' + paymentModeId);
  }



  // ------------------------------------------------
  // Articles routes :
  // ------------------------------------------------

  public getArticle(idArticle: number): Observable<Article> {
    return this.http.get<Article>(this.apiBaseUrl + 'articles/' + idArticle, { headers: this.authService.getAuthorizationHeader() });
  }

  public getAllArticles(page: number = 1, pageSize: number = 10): Observable<Article[]> {
    return this.http.get<Page<Article>>(this.apiBaseUrl + 'articles?page=' + (page - 1) + '&size=' + pageSize)
      .pipe(map(
        pageable => {
          return pageable.content;
        }
      ));
  }

  public getArticleList(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiBaseUrl + 'articles/list', { headers: this.authService.getAuthorizationHeader() });
  }

  public createArticle(article: any): Observable<Article> {
    return this.http.post<Article>(this.apiBaseUrl + 'articles', article, { headers: this.authService.getAuthorizationHeader() });
  }

  public updateArticle(article: Article): Observable<Article> {
    return this.http.put<Article>(this.apiBaseUrl + 'articles/' + article.id, article, { headers: this.authService.getAuthorizationHeader() });
  }

  public deleteArticle(idArticle: number) {
    return this.http.delete(this.apiBaseUrl + 'articles/' + idArticle, { headers: this.authService.getAuthorizationHeader() });
  }

  public setArticleVisible(idArticle: number): Observable<Article> {
    return this.http.patch<Article>(this.apiBaseUrl + 'articles/' + idArticle + '/visible', {}, { headers: this.authService.getAuthorizationHeader() });
  }

  public setArticleInvisible(idArticle: number): Observable<Article> {
    return this.http.patch<Article>(this.apiBaseUrl + 'articles/' + idArticle + '/invisible', {}, { headers: this.authService.getAuthorizationHeader() });
  }
}
