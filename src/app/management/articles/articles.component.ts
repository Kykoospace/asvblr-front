import { Component, OnInit } from '@angular/core';
import Article from '../../shared/models/entities/Article';
import { ManagementService } from '../../shared/services/api/management/management.service';
import { MessageService } from 'primeng';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  public articles: Article[];
  public newArticleDialogToggle: boolean;

  public columns = [
    { column: 'Titre', field: 'title' },
    { column: 'Date de création', field: 'creationDate' },
    { column: 'Dernière modification', field: 'lastModificationDate' },
    { column: 'Visibilité', field: 'visible' }
  ];

  constructor(
    private managementService: ManagementService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.refreshArticleList();
    this.newArticleDialogToggle = false;
  }

  ngOnInit(): void { }

  public refreshArticleList() {
    this.managementService.getArticleList()
      .subscribe(
        articleList => {
          this.articles = articleList;
        },
        err => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Articles introuvables',
            detail: 'Impossible de charger la liste des articles.'
          });
        }
      );
  }

  public createArticle(title: string) {
    this.managementService.createArticle({ title: title, content: '' })
      .subscribe(
        article => {
          this.messageService.add({
            severity: 'success',
            summary: 'Article créé'
          });
          this.router.navigate(['/management/articles/' + article.id]);
        },
        err => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Impossible de créer l\'article',
            detail: 'Une erreur est survenue lors de la création de l\'article.'
          });
        }
      );
  }

  public selectArticle(article: Article) {
    this.router.navigate(['/management/articles/' + article.id]);
  }
}
