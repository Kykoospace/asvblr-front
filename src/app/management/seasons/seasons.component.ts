import { Component, OnInit } from '@angular/core';
import Season from '../../shared/models/entities/Season';
import {TeamService} from '../../shared/services/api/team/team.service';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss']
})
export class SeasonsComponent implements OnInit {

  public newSeasonToggle: boolean = false;

  public currentSeason: Season;

  constructor(
    private teamService: TeamService
  ) {
    this.currentSeason = {
      id: 1,
      name: '2019/2020',
      currentSeason: true
    };
  }

  ngOnInit(): void {
  }

}
