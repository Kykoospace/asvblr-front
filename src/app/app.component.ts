import { Component } from '@angular/core';
import AppConstants from './shared/AppConstants';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private titleService: Title
  ) {
    this.titleService.setTitle(AppConstants.APP_NAME_SHORT);
  }
}
