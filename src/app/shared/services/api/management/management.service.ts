import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { Observable } from 'rxjs';
import PaymentMode from '../../../models/entities/PaymentMode';
import Article from '../../../models/entities/Article';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  private apiBaseUrl: string;

  constructor(
    private configService: ConfigService,
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
    return this.http.get<Article>(this.apiBaseUrl + 'articles/' + idArticle);
  }

  public getAllArticles(page: number = 1, pageSize: number = 5) {
    // TODO : faire l'entité de réponse
  }

  public getArticleList(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiBaseUrl + 'articles/list');
  }

  public createArticle(article: any): Observable<Article> {
    return this.http.post<Article>(this.apiBaseUrl + 'articles', article);
  }

  public updateArticle(article: Article): Observable<Article> {
    return this.http.put<Article>(this.apiBaseUrl + 'articles/' + article.id, article);
  }

  public deleteArticle(idArticle: number) {
    return this.http.delete(this.apiBaseUrl + 'articles/' + idArticle);
  }

  public setArticleVisible(idArticle: number): Observable<Article> {
    return this.http.patch<Article>(this.apiBaseUrl + 'articles/' + idArticle + '/visible', {});
  }

  public setArticleInvisible(idArticle: number): Observable<Article> {
    return this.http.patch<Article>(this.apiBaseUrl + 'articles/' + idArticle + '/invisible', {});
  }
}
