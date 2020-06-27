import {Component, Input, OnInit} from '@angular/core';
import Player from '../../models/entities/Player';
import User from '../../models/entities/User';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input()
  public user: User;

  @Input()
  public showEmail: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
