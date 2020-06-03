// Angular import :
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Service import :
import { ConfigService } from '../../config/config.service';

// Entities import :
import Subscription from '../../../models/entities/Subscription';
import Category from '../../../models/entities/Category';
import Season from '../../../models/entities/Season';
import ClothingSize from '../../../models/entities/ClothingSize';
import Document from '../../../models/entities/Document';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private readonly apiBaseUrl: string;

  constructor(
    private configService: ConfigService,
    private http: HttpClient
  ) {
    this.apiBaseUrl = configService.getApiBaseUrl();
  }


  // ------------------------------------------------
  // Subscription routes :
  // ------------------------------------------------

  public getAllSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.apiBaseUrl + 'subscriptions');
  }

  public getSubscriptionsBySeason(seasonId: number): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.apiBaseUrl + 'seasons/' + seasonId + '/subscriptions');
  }

  public getSubscription(subscriptionId: number): Observable<Subscription> {
    return this.http.get<Subscription>(this.apiBaseUrl + 'subscriptions/' + subscriptionId);
  }

  public createSubscription(subscription: any): Observable<Subscription> {
    return this.http.post<Subscription>(this.apiBaseUrl + 'subscriptions', subscription);
  }

  public updateSubscription(subscription: Subscription): Observable<Subscription> {
    return this.http.patch<Subscription>(this.apiBaseUrl + 'subscriptions' + subscription.id, { subscription });
  }

  public deleteSubscription(subscriptionId: number): Observable<any> {
    return this.http.delete<any>(this.apiBaseUrl + 'subscriptions/' + subscriptionId);
  }

  public updateSubscriptionCNI(idSubscription: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(this.apiBaseUrl + 'subscriptions/' + idSubscription + '/cni', formData);
  }

  public updateSubscriptionMedicalCertificate(idSubscription: number, file: File): Observable<any> {
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(this.apiBaseUrl + 'subscriptions/' + idSubscription + '/medical-certificate', formData);
  }

  public updateSubscriptionIdentityPhoto(idSubscription: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(this.apiBaseUrl + 'subscriptions/' + idSubscription + '/identity-photo', formData);
  }

  public updateSubscriptionDocuments(idSubscription: number, cni: File, identityPhoto: File, medicalCertificate: File): Observable<Subscription> {
    const formData = new FormData();
    formData.append('cni', cni);
    formData.append('identityPhoto', identityPhoto);
    formData.append('medicalCertificate', medicalCertificate);
    return this.http.post<Subscription>(this.apiBaseUrl + 'subscriptions/' + idSubscription + '/documents', formData);
  }

  public validateSubscription(idSubscription: number): Observable<Subscription> {
    return this.http.patch<Subscription>(this.apiBaseUrl + 'subscriptions/' + idSubscription + '/validated', {});
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
    return this.http.post<Season>(this.apiBaseUrl + 'seasons/create', season);
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
    return this.http.get<Category[]>(this.apiBaseUrl + 'categories');
  }

  public getCategory(categoryId: number): Observable<Category> {
    return this.http.get<Category>(this.apiBaseUrl + 'categories/' + categoryId);
  }


  // ------------------------------------------------
  // Clothing sizes routes :
  // ------------------------------------------------

  public getAllClothingSizes(): Observable<ClothingSize[]> {
    return this.http.get<ClothingSize[]>(this.apiBaseUrl + 'clothing-sizes');
  }

  public getClothingSize(categoryId: number): Observable<ClothingSize> {
    return this.http.get<ClothingSize>(this.apiBaseUrl + 'clothing-sizes/' + categoryId);
  }


  // ------------------------------------------------
  // Document routes :
  // ------------------------------------------------

  public getDocument(idDocument: number): Observable<Document> {
    return this.http.get<Document>(this.apiBaseUrl + 'documents/' + idDocument);
  }
}
