import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import PaymentMode from '../../../models/entities/PaymentMode';
import Article from '../../../models/entities/Article';
import {map} from 'rxjs/operators';
import Page from '../../../models/paging/Page';
import {AuthService} from '../auth/auth.service';
import User from '../../../models/entities/User';
import Price from '../../../models/entities/Price';
import Player from '../../../models/entities/Player';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  // ------------------------------------------------
  // User routes :
  // ------------------------------------------------

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(
      'api/users',
      { headers: this.authService.getAuthorizationHeader()
      })
      .pipe(map((users) => {
        users.forEach(user => user.fullName = user.firstName + ' ' + user.lastName.toUpperCase());
        return users;
      }));
  }

  public getUser(idUser: number): Observable<User> {
    return this.http.get<User>(
      'api/users/' + idUser,
      { headers: this.authService.getAuthorizationHeader()}
      )
      .pipe(map((user) => {
        user.fullName = user.firstName + ' ' + user.lastName.toUpperCase();
        return user;
      }));
  }

  public getUserPlayer(idUser): Observable<Player> {
    return this.http.get<Player>(
      'api/users/' + idUser + '/player',
      { headers: this.authService.getAuthorizationHeader() }
    );
  }

  public createUser(userData: any): Observable<User> {
    return this.http.post<User>('api/auth/signup', userData, { headers: this.authService.getAuthorizationHeader() });
  }

  public deleteUser(idUser: number): Observable<any> {
    return this.http.delete<any>('api/users/' + idUser, { headers: this.authService.getAuthorizationHeader() });
  }

  public giveManagerRole(idUser: number): Observable<User> {
    return this.http.patch<User>(
      'api/users/' + idUser + '/give-manager-right',
      {},
      { headers: this.authService.getAuthorizationHeader() }
      );
  }

  public removeManagerRole(idUser: number): Observable<User> {
    return this.http.patch<User>(
      'api/users/' + idUser + '/remove-manager-right',
      {},
      { headers: this.authService.getAuthorizationHeader() }
      );
  }


  // ------------------------------------------------
  // PaymentMode routes :
  // ------------------------------------------------

  public getAllPaymentModes(): Observable<PaymentMode[]> {
    return this.http.get<PaymentMode[]>('api/payment-modes');
  }

  public getPaymentMode(idPaymentMode: number): Observable<PaymentMode> {
    return this.http.get<PaymentMode>('api/payment-modes/' + idPaymentMode);
  }



  // ------------------------------------------------
  // Articles routes :
  // ------------------------------------------------

  public getArticle(idArticle: number): Observable<Article> {
    return this.http.get<Article>('api/articles/' + idArticle, { headers: this.authService.getAuthorizationHeader() });
  }

  public getAllArticles(page: number = 1, pageSize: number = 10): Observable<Article[]> {
    return this.http.get<Page<Article>>('api/articles?page=' + (page - 1) + '&size=' + pageSize)
      .pipe(map(
        pageable => {
          return pageable.content;
        }
      ));
  }

  public getArticleList(): Observable<Article[]> {
    return this.http.get<Article[]>('api/articles/list', { headers: this.authService.getAuthorizationHeader() });
  }

  public createArticle(article: any): Observable<Article> {
    return this.http.post<Article>('api/articles', article, { headers: this.authService.getAuthorizationHeader() });
  }

  public updateArticle(article: Article): Observable<Article> {
    return this.http.put<Article>('api/articles/' + article.id, article, { headers: this.authService.getAuthorizationHeader() });
  }

  public deleteArticle(idArticle: number) {
    return this.http.delete('api/articles/' + idArticle, { headers: this.authService.getAuthorizationHeader() });
  }

  public setArticleVisible(idArticle: number): Observable<Article> {
    return this.http.patch<Article>('api/articles/' + idArticle + '/visible', {}, { headers: this.authService.getAuthorizationHeader() });
  }

  public setArticleInvisible(idArticle: number): Observable<Article> {
    return this.http.patch<Article>('api/articles/' + idArticle + '/invisible', {}, { headers: this.authService.getAuthorizationHeader() });
  }


  // ------------------------------------------------
  // Mail routes :
  // ------------------------------------------------

  public sendMail(mail: any): Observable<any> {
    return this.http.post(
      'api/mails/send-mail',
      mail,
      { headers: this.authService.getAuthorizationHeader() }
    );
  }

  public sendMailContact(mail: any): Observable<any> {
    return this.http.post(
      'api/mails/contact-mail',
      mail
    );
  }


  // ------------------------------------------------
  // Prices routes :
  // ------------------------------------------------

  public getAllPrices(): Observable<Price[]> {
    return this.http.get<Price[]>('api/prices');
  }

  public updatePrices(prices: Price[]): Observable<Price[]> {
    return this.http.patch<Price[]>(
      'api/prices',
      prices,
      { headers: this.authService.getAuthorizationHeader() }
    );
  }


  // ------------------------------------------------
  // Statisctics routes :
  // ------------------------------------------------

  public getPlayersPaymentModeStats(): Observable<any> {
    return this.http.get<any>(
      'api/statistics/payments-mode',
      { headers: this.authService.getAuthorizationHeader() }
      );
  }

  public getPlayersAgeStats(): Observable<any> {
    return this.http.get<any>(
      'api/statistics/players-by-age',
      { headers: this.authService.getAuthorizationHeader() }
      );
  }

  public getPlayersCityStats(): Observable<any> {
    return this.http.get<any>(
      'api/statistics/players-city',
      { headers: this.authService.getAuthorizationHeader() }
      );
  }

  public getVisitStats(): Observable<any> {
    return this.http.get<any>(
      'api/statistics/visits',
      { headers: this.authService.getAuthorizationHeader() }
    );
  }

  public addVisitCount(pageCode: string): Observable<any> {
    return this.http.post<any>('api/statistics/visits', { pageCode });
  }
}
