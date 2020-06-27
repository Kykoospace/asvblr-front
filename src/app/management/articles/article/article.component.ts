import { Component, OnInit } from '@angular/core';
import Article from '../../../shared/models/entities/Article';
import {ActivatedRoute, Router} from '@angular/router';
import {ManagementService} from '../../../shared/services/api/management/management.service';
import {ConfirmationService, MessageService} from 'primeng';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  public renameArticleToggle: boolean = false;
  public setVisibilityArticleToggle: boolean = false;

  public article: Article;
  public newArticleVisibility: boolean;

  public content: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private managementService: ManagementService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }


  ngOnInit(): void {
    this.refreshArticle();
  }

  public refreshArticle(): void {
    this.managementService.getArticle(+this.route.snapshot.paramMap.get('id'))
      .subscribe(
        article => {
          this.article = article;
          this.content = article.content;
          this.newArticleVisibility = article.visible;
        },
        err => console.error(err)
      );
  }

  public backNavigate() {
    this.router.navigate(['/management/articles']);
  }

  public saveArticle() {
    this.article.content = this.content;
    this.managementService.updateArticle(this.article)
      .subscribe(
        article => {
          this.messageService.add({
            severity: 'success',
            summary: 'Modifications sauvegardées'
          });
          this.refreshArticle();
        },
        err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Sauvegarde impossible',
            detail: 'Une erreur est survenue lors de la sauvegarde de l\'article.'
          });
        }
      );
  }

  public renameArticle(title: string) {
    if (title !== '') {
      this.article.title = title;
      this.article.content = this.content;
      this.managementService.updateArticle(this.article)
        .subscribe(
          article => {
            this.messageService.add({
              severity: 'success',
              summary: 'Modifications sauvegardées'
            });
            this.renameArticleToggle = false;
            this.refreshArticle();
          },
          err => console.error(err)
        );
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Le titre ne peut pas être vide'
      });
    }
  }

  public setVisibilityArticle() {
    const request = (this.newArticleVisibility)
      ? this.managementService.setArticleVisible(this.article.id)
      : this.managementService.setArticleInvisible(this.article.id);

    request.subscribe(
      article => {
        this.messageService.add({
          severity: 'success',
          summary: 'Visibilité enregistrée',
          detail: 'La visibilité de l\'article a bien été enregistrée.'
        });
        this.setVisibilityArticleToggle = false;
        this.refreshArticle();
      },
      err => console.error(err)
    );
  }

  public deleteArticle() {
    this.confirmationService.confirm({
      header: 'Supprimer l\'article',
      message: 'Voulez-vous supprimer l\'article ?',
      accept: () => {
        this.managementService.deleteArticle(this.article.id)
          .subscribe(
            () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Article supprimé'
              });
              this.backNavigate();
            },
            err => console.error(err)
          );
      }
    });
  }
}
