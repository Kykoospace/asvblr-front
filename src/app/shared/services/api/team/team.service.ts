// Angular import :
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Service import :
import { ConfigService } from '../../config/config.service';

// Entities import :
import Subscription from '../../../models/entities/Subscription';
import Category from '../../../models/entities/SubscriptionCategory';
import Season from '../../../models/entities/Season';
import ClothingSize from '../../../models/entities/ClothingSize';
import Document from '../../../models/entities/Document';
import Team from '../../../models/entities/Team';
import PlayerTeam from '../../../models/entities/PlayerTeam';
import SubscriptionCategory from '../../../models/entities/SubscriptionCategory';
import TeamCategory from '../../../models/entities/TeamCategory';
import TeamList from '../../../models/responses/TeamList';
import Player from '../../../models/entities/Player';
import Match from '../../../models/entities/Match';

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
  // Player routes :
  // ------------------------------------------------

  public getAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.apiBaseUrl + 'players');
  }

  public getPlayer(idPlayer: number): Observable<Player> {
    return this.http.get<Player>(this.apiBaseUrl + 'players/' + idPlayer);
  }

  public getAllPlayerNotInTeam(idTeam: number): Observable<Player[]> {
    return this.http.get<Player[]>(this.apiBaseUrl + 'teams/' + idTeam + '/add-player');
  }


  // ------------------------------------------------
  // Team routes :
  // ------------------------------------------------

  public getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiBaseUrl + 'teams');
  }

  public getTeamList(): Observable<TeamList[]> {
    return this.http.get<TeamList[]>(this.apiBaseUrl + 'teams/list-detail');
  }

  public createTeam(team: any): Observable<Team> {
    return this.http.post<Team>(this.apiBaseUrl + 'teams', team);
  }

  public getTeam(idTeam: number): Observable<Team> {
    return this.http.get<Team>(this.apiBaseUrl + 'teams/' + idTeam);
  }

  public updateTeam(idTeam: number, team: Team): Observable<Team> {
    return this.http.put<Team>(this.apiBaseUrl + 'teams/' + idTeam, team);
  }

  public deleteTeam(idTeam: number): Observable<any> {
    return this.http.delete<any>(this.apiBaseUrl + 'teams/' + idTeam);
  }

  public addCoachToTeam(idTeam: number, idUser: number): Observable<Team> {
    return this.http.patch<Team>(this.apiBaseUrl + 'teams/' + idTeam + '/coach/' + idUser, {});
  }

  public getAllPlayersTeam(idTeam: number): Observable<PlayerTeam[]> {
    return this.http.get<PlayerTeam[]>(this.apiBaseUrl + 'teams/' + idTeam + '/players');
  }

  public addPlayerToTeam(idTeam: number, players: any): Observable<Team> {
    return this.http.post<Team>(this.apiBaseUrl + 'teams/' + idTeam + '/players', players);
  }

  public getAllTeamMatches(idTeam: number): Observable<Match[]> {
    return this.http.get<Match[]>(this.apiBaseUrl + 'teams/' + idTeam + '/matches');
  }


  // ------------------------------------------------
  // Team category routes :
  // ------------------------------------------------

  public getAllTeamCategories(): Observable<TeamCategory[]> {
    return this.http.get<TeamCategory[]>(this.apiBaseUrl + 'team-categories');
  }

  public getTeamCategory(idTeamCategory: number): Observable<SubscriptionCategory> {
    return this.http.get<TeamCategory>(this.apiBaseUrl + 'team-categories/' + idTeamCategory);
  }


  // ------------------------------------------------
  // Subscription routes :
  // ------------------------------------------------

  public getAllSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.apiBaseUrl + 'subscriptions');
  }

  public getSubscriptionsBySeason(idSeason: number): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.apiBaseUrl + 'seasons/' + idSeason + '/subscriptions');
  }

  public getSubscription(idSubscription: number): Observable<Subscription> {
    return this.http.get<Subscription>(this.apiBaseUrl + 'subscriptions/' + idSubscription);
  }

  public createSubscription(subscription: any): Observable<Subscription> {
    return this.http.post<Subscription>(this.apiBaseUrl + 'subscriptions', subscription);
  }

  public updateSubscription(subscription: Subscription): Observable<Subscription> {
    return this.http.patch<Subscription>(this.apiBaseUrl + 'subscriptions' + subscription.id, { subscription });
  }

  public deleteSubscription(idSubscription: number): Observable<any> {
    return this.http.delete<any>(this.apiBaseUrl + 'subscriptions/' + idSubscription);
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
  // Subscription category routes :
  // ------------------------------------------------

  public getAllSubscriptionCategories(): Observable<SubscriptionCategory[]> {
    return this.http.get<SubscriptionCategory[]>(this.apiBaseUrl + 'subscription-categories');
  }

  public getSubscriptionCategory(idSubscriptionCategory: number): Observable<SubscriptionCategory> {
    return this.http.get<SubscriptionCategory>(this.apiBaseUrl + 'subscription-categories/' + idSubscriptionCategory);
  }


  // ------------------------------------------------
  // Season routes :
  // ------------------------------------------------

  public getAllSeasons(): Observable<Season[]> {
    return this.http.get<Season[]>(this.apiBaseUrl + 'seasons');
  }

  public getSeason(idSeason: number): Observable<Season> {
    return this.http.get<Season>(this.apiBaseUrl + 'seasons/' + idSeason);
  }

  public createSeason(season: Season): Observable<Season> {
    return this.http.post<Season>(this.apiBaseUrl + 'seasons/create', season);
  }

  public updateSeason(season: Season): Observable<Season> {
    return this.http.post<Season>(this.apiBaseUrl + 'seasons/update/' + season.id, { season });
  }

  public deleteSeason(idSeason: number): Observable<any> {
    this.http.delete<any>(this.apiBaseUrl + 'seasons/delete/' + idSeason);
  }


  // ------------------------------------------------
  // Clothing sizes routes :
  // ------------------------------------------------

  public getAllClothingSizes(): Observable<ClothingSize[]> {
    return this.http.get<ClothingSize[]>(this.apiBaseUrl + 'clothing-sizes');
  }

  public getClothingSize(idClothingSize: number): Observable<ClothingSize> {
    return this.http.get<ClothingSize>(this.apiBaseUrl + 'clothing-sizes/' + idClothingSize);
  }


  // ------------------------------------------------
  // Document routes :
  // ------------------------------------------------

  public getDocument(idDocument: number): Observable<Document> {
    return this.http.get<Document>(this.apiBaseUrl + 'documents/' + idDocument);
  }


  // ------------------------------------------------
  // Matches routes :
  // ------------------------------------------------

  public getAllMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(this.apiBaseUrl + 'matches');
  }

  public getMatch(idMatch: number): Observable<Match> {
    return this.http.get<Match>(this.apiBaseUrl + 'matches/' + idMatch);
  }

  public createMatch(match: any): Observable<Match> {
    return this.http.post<Match>(this.apiBaseUrl + 'matches', match);
  }

  public updateMatch(match: Match): Observable<Match> {
    return this.http.put<Match>(this.apiBaseUrl + 'matches/' + match.id, match);
  }

  public deleteMatch(idMatch: number): Observable<any> {
    return this.http.delete<any>(this.apiBaseUrl + 'matches/' + idMatch);
  }
}
