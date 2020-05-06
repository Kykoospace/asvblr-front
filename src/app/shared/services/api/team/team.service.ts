import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import Subscription from '../../../models/entities/Subscription';
import Category from '../../../models/entities/Category';
import Season from '../../../models/entities/Season';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  // TODO : mettre cette constante dans un fichier de configuration
  private static API_URL = 'http://127.0.0.1:8080/api/';

  constructor(
    private http: HttpClient
  ) { }

  // ------------------------------------------------
  // Subscription routes :
  // ------------------------------------------------

  public getAllSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(TeamService.API_URL + 'subscriptions/');
  }

  public getSubscriptionsBySeason(seasonId: number): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(TeamService.API_URL + 'seasons/' + seasonId + '/subscriptions');
  }

  public getSubscription(subscriptionId: number): Observable<Subscription> {
    return this.http.get<Subscription>(TeamService.API_URL + 'subscriptions/' + subscriptionId);
  }

  public createSubscription(subscription: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>(TeamService.API_URL + 'subscriptions/create', { subscription });
  }

  public updateSubscription(subscription: Subscription): Observable<Subscription> {
    return this.http.patch<Subscription>(TeamService.API_URL + 'subscriptions/update' + subscription.id, { subscription });
  }

  public deleteSubscription(subscriptionId: number): void {
    this.http.delete<Subscription[]>(TeamService.API_URL + 'subscriptions/delete/' + subscriptionId);
  }


  // ------------------------------------------------
  // Season routes :
  // ------------------------------------------------

  public getAllSeasons(): Observable<Season[]> {
    return this.http.get<Season[]>(TeamService.API_URL + 'seasons');
  }

  public getSeason(seasonId: number): Observable<Season> {
    return this.http.get<Season>(TeamService.API_URL + 'seasons/' + seasonId);
  }

  public createSeason(season: Season): Observable<Season> {
    return this.http.post<Season>(TeamService.API_URL + 'seasons/create', { season });
  }

  public updateSeason(season: Season): Observable<Season> {
    return this.http.post<Season>(TeamService.API_URL + 'seasons/update/' + season.id, { season });
  }

  public deleteSeason(seasonId: number): void {
    this.http.delete(TeamService.API_URL + 'seasons/delete/' + seasonId);
  }


  // ------------------------------------------------
  // Category routes :
  // ------------------------------------------------

  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(TeamService.API_URL + 'categories/');
  }

  public getCategory(categoryId: number): Observable<Category> {
    return this.http.get<Category>(TeamService.API_URL + 'categories/' + categoryId);
  }
}
