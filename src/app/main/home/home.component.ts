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
  private maxPages: number;
  private currentPage: number;

  constructor(
    private managementService: ManagementService
  ) {
    this.currentPage = 1;
    this.maxPages = 1;
  }

  ngOnInit() {
    this.managementService.getAllArticles(this.currentPage)
      .subscribe(
        articles => {
          this.articles = articles.content;
          this.maxPages = articles.totalPages;
        },
        err => { }
      );
  }

  public loadMoreArticles(): void {
    const askedPage = this.currentPage + 1;
    this.managementService.getAllArticles(askedPage)
      .subscribe(
        articles => {
          this.currentPage = askedPage;
          articles.content.forEach(article => this.articles.push(article));
          this.maxPages = articles.totalPages;
        },
        err => console.error(err)
      );
  }

  public canAskMoreArticles(): boolean {
    return this.currentPage < this.maxPages;
  }
}
