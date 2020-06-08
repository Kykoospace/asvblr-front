import {Component, Input, OnInit} from '@angular/core';
import Player from '../../models/entities/Player';
import SubscriptionCategory from '../../models/entities/SubscriptionCategory';
import {TeamService} from '../../services/api/team/team.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit {

  @Input()
  public player: Player;

  @Input()
  public showGender: boolean = false;

  @Input()
  public showBirthDate: boolean = true;

  @Input()
  public showRequestedCategory: boolean = false;

  @Input()
  public requestedCategoryCollection: SubscriptionCategory[];

  public requestedCategory: SubscriptionCategory;

  constructor(
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
    if (this.showRequestedCategory) {
      if (this.requestedCategoryCollection) {
        this.requestedCategory = this.requestedCategoryCollection.find(element => element.id === this.player.idSubscriptionCategory);
      } else {
        this.teamService.getSubscriptionCategory(this.player.idSubscriptionCategory)
          .subscribe(
            category => this.requestedCategory = category,
            err => console.error(err)
          );
      }
    }
  }

}
