import { Component, OnInit } from '@angular/core';
import {ManagementService} from '../../shared/services/api/management/management.service';
import Article from '../../shared/models/entities/Article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public articles: Article[];

  public images = [
    { source: 'assets/images/carousel_1.jpg', alt: '', title: 'Journée associations 2018' },
    { source: 'assets/images/carousel_2.jpg', alt: '', title: 'Équipe M20 homme' },
    { source: 'assets/images/carousel_3.jpg', alt: '', title: 'Équipe M20 F' },
    { source: 'assets/images/carousel_4.jpg', alt: '', title: 'Équipe Dep 1 H' },
    { source: 'assets/images/carousel_5.jpg', alt: '', title: 'Équipe Dep 2 H' },
  ];

  constructor(
    private managementService: ManagementService
  ) {
    this.managementService.getAllArticles()
      .subscribe(
        articles => {
          this.articles = articles;
        },
        err => { }
      );
  }

  ngOnInit() {
  }

}
