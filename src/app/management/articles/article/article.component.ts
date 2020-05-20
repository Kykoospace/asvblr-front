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

  public loading: boolean = false;
  public renameArticleToggle: boolean = false;

  public article: Article;

  public content: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private managementService: ManagementService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.loading = true;
    this.managementService.getArticle(+this.route.snapshot.paramMap.get('id'))
      .subscribe(
        article => {
          this.article = article;
          this.content = article.content;
          this.loading = false;
        },
        err => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Article introuvable',
            detail: 'Impossible de charger l\'article demandé'
          });
          this.backNavigate();
        }
      );
  }

  ngOnInit(): void { }

  public backNavigate() {
    this.router.navigate(['/management/articles']);
  }

  public saveArticle() {
    this.article.content = this.content;
    this.managementService.updateArticle(this.article)
      .subscribe(
        article => {
          this.article = article;
          this.content = article.content;
          this.messageService.add({
            severity: 'success',
            summary: 'Modifications sauvegardées'
          });
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
    this.article.title = title;
    this.managementService.updateArticle(this.article)
      .subscribe(
        article => {
          this.article = article;
          this.content = article.content;
          this.messageService.add({
            severity: 'success',
            summary: 'Modifications sauvegardées'
          });
          this.renameArticleToggle = false;
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

  public deleteArticle() {
    this.confirmationService.confirm({
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
            err => {
              this.messageService.add({
                severity: 'error',
                summary: 'Suppression impossible',
                detail: 'Une erreur est survenue lors de la suppression de l\'article.'
              });
            }
          );
      }
    });
  }
}
