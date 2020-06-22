import { Component, OnInit } from '@angular/core';
import Season from '../../shared/models/entities/Season';
import {TeamService} from '../../shared/services/api/team/team.service';
import {MessageService} from 'primeng';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss']
})
export class SeasonsComponent implements OnInit {

  public validationDialogToggle: boolean;
  public validationSentence: string;

  public currentSeason: Season;
  public nextSeasonName: string;
  public noSeasonMessage: string;

  constructor(
    private teamService: TeamService,
    private messageService: MessageService
  ) {
    this.validationDialogToggle = false;
    this.validationSentence = 'Ouvrir une nouvelle saison';
    this.noSeasonMessage = 'Aucune saison n\'est ouverte';
    const currentYear = new Date().getFullYear();
    this.nextSeasonName = currentYear + '/' + (currentYear + 1);
  }

  ngOnInit(): void {
    this.teamService.getCurrentSeason()
      .subscribe(
        season => this.currentSeason = season,
        () => {}
      );
  }

  public createNewSeason() {
    this.teamService.createSeason(this.nextSeasonName)
      .subscribe(
        season => {
          this.currentSeason = season;
          this.validationDialogToggle = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Nouvelle saison ouverte',
            detail: 'La saison ' + season.name + ' a été ouverte avec succès'
          });
        },
        err => console.error(err)
      );
  }
}
