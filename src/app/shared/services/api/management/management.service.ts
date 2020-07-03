import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { Observable } from 'rxjs';
import PaymentMode from '../../../models/entities/PaymentMode';
import Article from '../../../models/entities/Article';
import {map} from 'rxjs/operators';
import Page from '../../../models/paging/Page';
import {AuthService} from '../auth/auth.service';
import User from '../../../models/entities/User';

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
  // User routes :
  // ------------------------------------------------

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(
      this.apiBaseUrl + 'users',
      { headers: this.authService.getAuthorizationHeader()
      })
      .pipe(map((users) => {
        users.forEach(user => user.fullName = user.firstName + ' ' + user.lastName.toUpperCase());
        return users;
      }));
  }

  public getUser(idUser: number): Observable<User> {
    return this.http.get<User>(
      this.apiBaseUrl + 'users/' + idUser,
      { headers: this.authService.getAuthorizationHeader()}
      )
      .pipe(map((user) => {
        user.fullName = user.firstName + ' ' + user.lastName.toUpperCase();
        return user;
      }));
  }

  public createUser(userData: any): Observable<User> {
    return this.http.post<User>(this.apiBaseUrl + 'auth/signup', userData, { headers: this.authService.getAuthorizationHeader() });
  }

  public deleteUser(idUser: number): Observable<any> {
    return this.http.delete<any>(this.apiBaseUrl + 'users/' + idUser, { headers: this.authService.getAuthorizationHeader() });
  }

  public giveManagerRole(idUser: number): Observable<User> {
    return this.http.patch<User>(
      this.apiBaseUrl + 'users/' + idUser + '/give-manager-right',
      {},
      { headers: this.authService.getAuthorizationHeader() }
      );
  }

  public removeManagerRole(idUser: number): Observable<User> {
    return this.http.patch<User>(
      this.apiBaseUrl + 'users/' + idUser + '/remove-manager-right',
      {},
      { headers: this.authService.getAuthorizationHeader() }
      );
  }


  // ------------------------------------------------
  // PaymentMode routes :
  // ------------------------------------------------

  public getAllPaymentModes(): Observable<PaymentMode[]> {
    return this.http.get<PaymentMode[]>(this.apiBaseUrl + 'payment-modes');
  }

  public getPaymentMode(idPaymentMode: number): Observable<PaymentMode> {
    return this.http.get<PaymentMode>(this.apiBaseUrl + 'payment-modes/' + idPaymentMode);
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



  // ------------------------------------------------
  // Mail routes :
  // ------------------------------------------------

  public sendMail(mail: any): Observable<any> {
    return this.http.post(this.apiBaseUrl + 'mails/send-mail', mail, { headers: this.authService.getAuthorizationHeader() });
  }
}
