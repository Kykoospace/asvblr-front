import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import TeamPlayer from '../../models/entities/TeamPlayer';

@Component({
  selector: 'app-team-players-list',
  templateUrl: './team-players-list.component.html',
  styleUrls: ['./team-players-list.component.scss']
})
export class TeamPlayersListComponent implements OnInit {

  @Input()
  public enableEditionTools: boolean = false;

  @Input()
  public players: TeamPlayer[];

  @Output()
  public selectPlayer: EventEmitter<TeamPlayer> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  public onSelectPlayer(player: TeamPlayer): void {
    if (this.enableEditionTools) {
      this.selectPlayer.emit(player);
    }
  }
}
