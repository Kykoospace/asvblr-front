import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import Match from '../../../models/entities/Match';
import AppConstants from '../../../AppConstants';

@Component({
  selector: 'app-team-match-card',
  templateUrl: './team-match-card.component.html',
  styleUrls: ['./team-match-card.component.scss']
})
export class TeamMatchCardComponent implements OnInit {

  @Input()
  public match: Match;

  @Input()
  public selectable: boolean = true;

  @Output()
  private selectMatch: EventEmitter<Match> = new EventEmitter<Match>();

  constructor() { }

  ngOnInit(): void {}

  public emitSelectedMatch(): void {
    if (this.selectable) {
      this.selectMatch.emit(this.match);
    }
  }
}
