import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import Subscription from '../../../models/entities/Subscription';
import Category from '../../../models/entities/Category';
import Season from '../../../models/entities/Season';
import {ConfigService} from '../../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  // TODO : mettre cette constante dans un fichier de configuration
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
  // Subscription routes :
  // ------------------------------------------------

  public getAllSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.apiBaseUrl + 'subscriptions/');
  }

  public getSubscriptionsBySeason(seasonId: number): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.apiBaseUrl + 'seasons/' + seasonId + '/subscriptions');
  }

  public getSubscription(subscriptionId: number): Observable<Subscription> {
    return this.http.get<Subscription>(this.apiBaseUrl + 'subscriptions/' + subscriptionId);
  }

  public createSubscription(subscription: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>(this.apiBaseUrl + 'subscriptions/create', { subscription });
  }

  public updateSubscription(subscription: Subscription): Observable<Subscription> {
    return this.http.patch<Subscription>(this.apiBaseUrl + 'subscriptions/update' + subscription.id, { subscription });
  }

  public deleteSubscription(subscriptionId: number): void {
    this.http.delete<Subscription[]>(this.apiBaseUrl + 'subscriptions/delete/' + subscriptionId);
  }


  // ------------------------------------------------
  // Season routes :
  // ------------------------------------------------

  public getAllSeasons(): Observable<Season[]> {
    return this.http.get<Season[]>(this.apiBaseUrl + 'seasons');
  }

  public getSeason(seasonId: number): Observable<Season> {
    return this.http.get<Season>(this.apiBaseUrl + 'seasons/' + seasonId);
  }

  public createSeason(season: Season): Observable<Season> {
    return this.http.post<Season>(this.apiBaseUrl + 'seasons/create', { season });
  }

  public updateSeason(season: Season): Observable<Season> {
    return this.http.post<Season>(this.apiBaseUrl + 'seasons/update/' + season.id, { season });
  }

  public deleteSeason(seasonId: number): void {
    this.http.delete(this.apiBaseUrl + 'seasons/delete/' + seasonId);
  }


  // ------------------------------------------------
  // Category routes :
  // ------------------------------------------------

  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiBaseUrl + 'categories/');
  }

  public getCategory(categoryId: number): Observable<Category> {
    return this.http.get<Category>(this.apiBaseUrl + 'categories/' + categoryId);
  }
}
