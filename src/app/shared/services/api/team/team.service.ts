// Angular import :
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Service import :
import { ConfigService } from '../../config/config.service';
import { AuthService } from '../auth/auth.service';

// Entities import :
import Subscription from '../../../models/entities/Subscription';
import Season from '../../../models/entities/Season';
import ClothingSize from '../../../models/entities/ClothingSize';
import Document from '../../../models/entities/Document';
import Team from '../../../models/entities/Team';
import TeamPlayer from '../../../models/entities/TeamPlayer';
import SubscriptionCategory from '../../../models/entities/SubscriptionCategory';
import TeamCategory from '../../../models/entities/TeamCategory';
import TeamList from '../../../models/responses/TeamList';
import Player from '../../../models/entities/Player';
import Position from '../../../models/entities/Position';
import Match from '../../../models/entities/Match';
import User from '../../../models/entities/User';
import Drive from '../../../models/entities/Drive';
import SubscriptionPaymentMode from '../../../models/responses/SubscriptionPaymentMode';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private readonly apiBaseUrl: string;

  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.apiBaseUrl = configService.getApiBaseUrl();
  }

  // ------------------------------------------------
  // Player routes :
  // ------------------------------------------------

  public getAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.apiBaseUrl + 'players', { headers: this.authService.getAuthorizationHeader() });
  }

  public getPlayer(idPlayer: number): Observable<Player> {
    return this.http.get<Player>(this.apiBaseUrl + 'players/' + idPlayer);
  }

  public updatePlayer(idPlayer: number, player: Player): Observable<Player> {
    return this.http.put<Player>(
      this.apiBaseUrl + 'players/' + idPlayer,
      player,
      { headers: this.authService.getAuthorizationHeader() }
    );
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
    return this.http.get<TeamList[]>(
      this.apiBaseUrl + 'teams/list-detail',
      { headers: this.authService.getAuthorizationHeader() }
      )
      .pipe(map(
        teams => {
          teams.forEach(team => {
            team.coachFullName = team.coachFirstName + ' ' + team.coachLastName.toUpperCase();
            team.leaderFullName = team.leaderFirstName + ' ' + team.leaderLastName.toUpperCase();
          });
          return teams;
        }
      ));
  }

  public getTeamsOfPlayer(idPlayer: number): Observable<TeamList[]> {
    return this.http.get<TeamList[]>(
      this.apiBaseUrl + 'players/' + idPlayer + '/teams',
      { headers: this.authService.getAuthorizationHeader() }
    );
  }

  public getTeamsOfUser(idUser: number): Observable<TeamList[]> {
    return this.http.get<TeamList[]>(
      this.apiBaseUrl + 'users/' + idUser + '/teams',
      { headers: this.authService.getAuthorizationHeader() }
    );
  }

  public getCoachedTeams(idUser: number): Observable<TeamList[]> {
    return this.http.get<TeamList[]>(
      this.apiBaseUrl + 'users/' + idUser + '/coached-teams',
      { headers: this.authService.getAuthorizationHeader() }
    );
  }

  public createTeam(team: any): Observable<Team> {
    return this.http.post<Team>(this.apiBaseUrl + 'teams', team, { headers: this.authService.getAuthorizationHeader() });
  }

  public getTeam(idTeam: number): Observable<TeamList> {
    return this.http.get<TeamList>(this.apiBaseUrl + 'teams/' + idTeam)
      .pipe(map(
        team => {
          team.coachFullName = team.coachFirstName + ' ' + team.coachLastName.toUpperCase();
          team.leaderFullName = team.leaderFirstName + ' ' + team.leaderLastName.toUpperCase();
          return team;
        }
      ));
  }

  public updateTeam(idTeam: number, team: Team): Observable<Team> {
    return this.http.put<Team>(this.apiBaseUrl + 'teams/' + idTeam, team, { headers: this.authService.getAuthorizationHeader() });
  }

  public deleteTeam(idTeam: number): Observable<any> {
    return this.http.delete<any>(this.apiBaseUrl + 'teams/' + idTeam, { headers: this.authService.getAuthorizationHeader() });
  }

  public setTeamCoach(idTeam: number, idCoach: number): Observable<Team> {
    return this.http.post<Team>(
      this.apiBaseUrl + 'teams/' + idTeam + '/coach',
      { idCoach },
      { headers: this.authService.getAuthorizationHeader() }
      );
  }

  public setTeamLeader(idTeam: number, idLeader: number): Observable<Team> {
    return this.http.post<Team>(
      this.apiBaseUrl + 'teams/' + idTeam + '/leader',
      { idLeader },
      { headers: this.authService.getAuthorizationHeader() }
    );
  }

  public getAllTeamPlayers(idTeam: number): Observable<TeamPlayer[]> {
    return this.http.get<TeamPlayer[]>(this.apiBaseUrl + 'teams/' + idTeam + '/players')
      .pipe(map(
        players => {
          players.forEach(
            player => player.fullName = player.firstName + ' ' + player.lastName.toUpperCase()
          );
          return players;
        }
      ));
  }

  public addTeamPlayer(idTeam: number, players: any): Observable<Team> {
    return this.http.post<Team>(this.apiBaseUrl + 'teams/' + idTeam + '/players', players, { headers: this.authService.getAuthorizationHeader() });
  }

  public updateTeamPlayer(idTeam: number, idPlayer: number, status: any): Observable<TeamPlayer> {
    return this.http.put<TeamPlayer>(
      this.apiBaseUrl + 'teams/' + idTeam + '/players/' + idPlayer,
      status,
      { headers: this.authService.getAuthorizationHeader() }
      );
  }

  public removeTeamPlayer(idTeam: number, idsPlayer: any): Observable<any> {
    return this.http.request('delete', this.apiBaseUrl + 'teams/' + idTeam + '/players', { body: idsPlayer, headers: this.authService.getAuthorizationHeader() });
  }

  public getAllTeamMatches(idTeam: number): Observable<Match[]> {
    return this.http.get<Match[]>(this.apiBaseUrl + 'teams/' + idTeam + '/matches')
      .pipe(map(
        matches => {
          matches.forEach(match => match.date = new Date(match.date));
          return matches;
        }
      ));
  }

  public getLastTeamMatch(idTeam: number): Observable<Match> {
    return this.http.get<Match>(this.apiBaseUrl + 'teams/' + idTeam + '/last-match')
      .pipe(map(
        match => {
          match.date = new Date(match.date);
          return match;
        }
      ));
  }

  public getAllTeamUsers(idTeam: number): Observable<User[]> {
    return this.http.get<User[]>(this.apiBaseUrl + 'teams/' + idTeam + '/users', { headers: this.authService.getAuthorizationHeader() });
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
  // Position routes :
  // ------------------------------------------------

  public getAllPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(this.apiBaseUrl + 'positions', { headers: this.authService.getAuthorizationHeader() });
  }

  public getPosition(idPosition: number): Observable<Position> {
    return this.http.get<Position>(this.apiBaseUrl + 'positions/' + idPosition, { headers: this.authService.getAuthorizationHeader() });
  }


  // ------------------------------------------------
  // Subscription routes :
  // ------------------------------------------------

  public getAllSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.apiBaseUrl + 'subscriptions', { headers: this.authService.getAuthorizationHeader() });
  }

  public getSubscription(idSubscription: number): Observable<Subscription> {
    return this.http.get<Subscription>(this.apiBaseUrl + 'subscriptions/' + idSubscription, { headers: this.authService.getAuthorizationHeader() });
  }

  public createSubscription(subscription: any): Observable<Subscription> {
    return this.http.post<Subscription>(this.apiBaseUrl + 'subscriptions', subscription);
  }

  public updateSubscription(subscription: Subscription): Observable<Subscription> {
    return this.http.patch<Subscription>(this.apiBaseUrl + 'subscriptions' + subscription.id, { subscription }, { headers: this.authService.getAuthorizationHeader() });
  }

  public deleteSubscription(idSubscription: number): Observable<any> {
    return this.http.delete<any>(this.apiBaseUrl + 'subscriptions/' + idSubscription, { headers: this.authService.getAuthorizationHeader() });
  }

  public updateSubscriptionCNI(idSubscription: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(this.apiBaseUrl + 'subscriptions/' + idSubscription + '/cni', formData, { headers: this.authService.getAuthorizationHeader() });
  }

  public updateSubscriptionMedicalCertificate(idSubscription: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(this.apiBaseUrl + 'subscriptions/' + idSubscription + '/medical-certificate', formData, { headers: this.authService.getAuthorizationHeader() });
  }

  public updateSubscriptionIdentityPhoto(idSubscription: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(this.apiBaseUrl + 'subscriptions/' + idSubscription + '/identity-photo', formData, { headers: this.authService.getAuthorizationHeader() });
  }

  public updateSubscriptionDocuments(idSubscription: number, cni: File, identityPhoto: File, medicalCertificate: File): Observable<Subscription> {
    const formData = new FormData();
    formData.append('cni', cni);
    formData.append('identityPhoto', identityPhoto);
    formData.append('medicalCertificate', medicalCertificate);
    return this.http.post<Subscription>(this.apiBaseUrl + 'subscriptions/' + idSubscription + '/documents', formData);
  }

  public validateSubscription(idSubscription: number): Observable<Subscription> {
    return this.http.patch<Subscription>(this.apiBaseUrl + 'subscriptions/' + idSubscription + '/validated', {}, { headers: this.authService.getAuthorizationHeader() });
  }

  public getSubscriptionPaymentModes(idSubscription: number): Observable<SubscriptionPaymentMode[]> {
    return this.http.get<SubscriptionPaymentMode[]>(
      this.apiBaseUrl + 'subscriptions/' + idSubscription + '/payments',
      { headers: this.authService.getAuthorizationHeader() }
      );
  }

  public paySubscriptionPaymentMode(idSubscription: number, idPaymentMode: number): Observable<SubscriptionPaymentMode[]> {
    return this.http.patch<SubscriptionPaymentMode[]>(
      this.apiBaseUrl + 'subscriptions/' + idSubscription + '/payments/' + idPaymentMode + '/validated',
      {},
      { headers: this.authService.getAuthorizationHeader() }
    );
  }

  public unpaySubscriptionPaymentMode(idSubscription: number, idPaymentMode: number): Observable<SubscriptionPaymentMode[]> {
    return this.http.patch<SubscriptionPaymentMode[]>(
      this.apiBaseUrl + 'subscriptions/' + idSubscription + '/payments/' + idPaymentMode + '/unvalidated',
      {},
      { headers: this.authService.getAuthorizationHeader() }
    );
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

  public getCurrentSeason(): Observable<Season> {
    return this.http.get<Season>(this.apiBaseUrl + 'seasons/current-season', { headers: this.authService.getAuthorizationHeader() });
  }

  public createSeason(seasonName: string): Observable<Season> {
    return this.http.post<Season>(this.apiBaseUrl + 'seasons', { name: seasonName }, { headers: this.authService.getAuthorizationHeader() });
  }

  public updateSeason(season: Season): Observable<Season> {
    return this.http.put<Season>(this.apiBaseUrl + 'seasons/' + season.id, { season });
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
  // Match routes :
  // ------------------------------------------------

  public getAllMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(this.apiBaseUrl + 'matches');
  }

  public getMatch(idMatch: number): Observable<Match> {
    return this.http.get<Match>(this.apiBaseUrl + 'matches/' + idMatch);
  }

  public createMatch(match: any): Observable<Match> {
    return this.http.post<Match>(this.apiBaseUrl + 'matches', match, { headers: this.authService.getAuthorizationHeader() });
  }

  public updateMatch(match: Match): Observable<Match> {
    return this.http.put<Match>(this.apiBaseUrl + 'matches/' + match.id, match, { headers: this.authService.getAuthorizationHeader() });
  }

  public deleteMatch(idMatch: number): Observable<any> {
    return this.http.delete<any>(this.apiBaseUrl + 'matches/' + idMatch, { headers: this.authService.getAuthorizationHeader() });
  }

  public getMatchDrives(idMatch: number): Observable<Drive[]> {
    return this.http.get<Drive[]>(
      this.apiBaseUrl + 'matches/' + idMatch + '/drives',
      { headers: this.authService.getAuthorizationHeader() }
      )
      .pipe(map(
        drives => {
          drives.forEach(drive => drive.date = new Date(drive.date));
          return drives;
        }
      ));
  }

  public addMatchCoachComment(idMatch: number, comment: any): Observable<Match> {
    return  this.http.patch<Match>(
      this.apiBaseUrl + 'matches/' + idMatch,
      comment,
      { headers: this.authService.getAuthorizationHeader() }
    )
      .pipe(map(
        match => {
          match.date = new Date(match.date);
          return match;
        }
      ));
  }


  // ------------------------------------------------
  // Drive routes :
  // ------------------------------------------------

  public getAllDrives(): Observable<Drive[]> {
    return this.http.get<Drive[]>(this.apiBaseUrl + 'drives', { headers: this.authService.getAuthorizationHeader() })
      .pipe(map(
        drives => {
          drives.forEach(drive => drive.date = new Date(drive.date));
          return drives;
        }
        ));
  }

  public getDrive(idDrive): Observable<Drive> {
    return this.http.get<Drive>(this.apiBaseUrl + 'drives/' + idDrive, { headers: this.authService.getAuthorizationHeader() })
      .pipe(map(
        drive => {
          drive.date = new Date(drive.date);
          return drive;
        }
      ));
  }

  public createDrive(drive: any): Observable<Drive> {
    return this.http.post<Drive>(this.apiBaseUrl + 'drives', drive, { headers: this.authService.getAuthorizationHeader() })
      .pipe(map(
        returnedDrive => {
          returnedDrive.date = new Date(returnedDrive.date);
          return returnedDrive;
        }
      ));
  }

  public updateDrive(drive: Drive): Observable<Drive> {
    return this.http.put<Drive>(
      this.apiBaseUrl + 'drives/' + drive.id, drive,
      { headers: this.authService.getAuthorizationHeader() }
      )
      .pipe(map(
        returnedDrive => {
          returnedDrive.date = new Date(returnedDrive.date);
          return returnedDrive;
        }
      ));
  }

  public deleteDrive(idDrive: number): Observable<any> {
    return this.http.delete<any>(this.apiBaseUrl + 'drives/' + idDrive, { headers: this.authService.getAuthorizationHeader() });
  }

  public getDrivePassengers(idDrive: number): Observable<User[]> {
    return this.http.get<User[]>(
      this.apiBaseUrl + 'drives/' + idDrive + '/passengers',
      { headers: this.authService.getAuthorizationHeader() }
      )
      .pipe(map(
        passengers => {
          passengers.forEach(passenger => passenger.fullName = passenger.firstName + ' ' + passenger.lastName.toUpperCase());
          return passengers;
        }
      ));
  }

  public addDrivePassenger(idDrive: number, idUser: number): Observable<Drive> {
    return this.http.post<Drive>(
      this.apiBaseUrl + 'drives/' + idDrive + '/passengers', { idUser },
      { headers: this.authService.getAuthorizationHeader() }
      )
      .pipe(map(
        returnedDrive => {
          returnedDrive.date = new Date(returnedDrive.date);
          return returnedDrive;
        }
      ));
  }

  public removeDrivePassenger(idDrive: number, idUser: number): Observable<Drive> {
    return this.http.delete<Drive>(
      this.apiBaseUrl + 'drives/' + idDrive + '/passengers/' + idUser,
      { headers: this.authService.getAuthorizationHeader() }
      )
      .pipe(map(
        returnedDrive => {
          returnedDrive.date = new Date(returnedDrive.date);
          return returnedDrive;
        }
      ));
  }

}
