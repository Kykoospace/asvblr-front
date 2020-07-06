import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import PlayerTeam from '../../models/entities/PlayerTeam';

@Component({
  selector: 'app-team-players-list',
  templateUrl: './team-players-list.component.html',
  styleUrls: ['./team-players-list.component.scss']
})
export class TeamPlayersListComponent implements OnInit {

  @Input()
  public enableEditionTools: boolean = false;

  @Input()
  public players: PlayerTeam[];

  @Output()
  public selectPlayer: EventEmitter<PlayerTeam> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  public onSelectPlayer(player: PlayerTeam): void {
    if (this.enableEditionTools) {
      this.selectPlayer.emit(player);
    }
  }
}
