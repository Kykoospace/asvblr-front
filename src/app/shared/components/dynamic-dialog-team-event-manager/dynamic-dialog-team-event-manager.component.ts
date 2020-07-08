import { Component, OnInit } from '@angular/core';
import Match from '../../models/entities/Match';
import {TeamService} from '../../services/api/team/team.service';
import {DynamicDialogConfig, DynamicDialogRef, MessageService} from 'primeng';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import AppConstants from '../../AppConstants';

@Component({
  selector: 'app-dynamic-dialog-team-event-manager',
  templateUrl: './dynamic-dialog-team-event-manager.component.html',
  styleUrls: ['./dynamic-dialog-team-event-manager.component.scss']
})
export class DynamicDialogTeamEventManagerComponent implements OnInit {

  public createToggle: boolean = false;

  private idTeam: number;
  public matches: Match[];

  public matchForm: FormGroup;

  public calendarLanguage: any;

  constructor(
    private teamService: TeamService,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
    this.idTeam = this.config.data.idTeam;
    this.calendarLanguage = AppConstants.CALENDAR_OPTIONS;
  }

  ngOnInit(): void {
    this.matchForm = this.formBuilder.group({
      oppositeTeam: ['', [ Validators.required ]],
      place: ['', [ Validators.required ]],
      date: [null, [ Validators.required ]],
      type: [true, [ Validators.required ]],
    });

    this.refreshMatches();
  }

  public refreshMatches() {
    this.teamService.getAllTeamMatches(this.idTeam)
      .subscribe(
        matches => {
          matches.forEach(match => match.date = new Date(match.date));
          this.matches = matches;
        },
        err => console.error(err)
      );
  }

  public createMatch() {
    if (this.matchForm.valid) {
      const match = this.matchForm.value;
      match.idTeam = this.idTeam;
      this.teamService.createMatch(match)
        .subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'La rencontre a bien été créée'
            });
            this.matchForm.reset();
            this.createToggle = false;
            this.refreshMatches();
          },
          err => console.error(err)
        );
    }
  }

  public updateMatch(match: Match) {
    this.teamService.updateMatch(match)
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Rencontre mise à jour'
          });
          this.refreshMatches();
        },
        err => console.error(err)
      );
  }

  public deleteMatch(match: Match) {
    this.teamService.deleteMatch(match.id)
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Rencontre supprimée'
          });
          this.refreshMatches();
        },
        err => console.error(err)
      );
  }

  public close() {
    this.ref.close();
  }
}
