import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService} from '../../../shared/services/api/team/team.service';
import Subscription from '../../../shared/models/entities/Subscription';
import {ConfirmationService, MessageService} from 'primeng';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  public loading = true;
  private documentUploadedSuccessMessage = {
    severity: 'success',
    summary: 'Document téléversé',
    detail: 'Le document a bien été téléversé'
  };

  public cniUploadDialog = false;

  public subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.refreshSubscription();
  }

  ngOnInit(): void {
  }

  public backNavigate() {
    this.router.navigate(['/management/subscriptions']);
  }

  public uploadCNI(file) {
    console.log(file);
    this.teamService.updateSubscriptionCNI(this.subscription.id, file.files.pop())
      .subscribe(() => {
        this.messageService.add(this.documentUploadedSuccessMessage);
        this.refreshSubscription(false);
      }, error => {
        console.error(error);
      });
  }

  public uploadMedicalCertificate(file) {
    console.log('Upload certif demandé');
    this.teamService.updateSubscriptionMedicalCertificate(this.subscription.id, file.files.pop())
      .subscribe(() => {
        this.messageService.add(this.documentUploadedSuccessMessage);
        this.refreshSubscription(false);
      }, error => {
        console.error(error);
      });
  }

  public uploadIdentityPhoto(file) {
    this.teamService.updateSubscriptionidentityPhoto(this.subscription.id, file.files.pop())
      .subscribe(() => {
        this.messageService.add(this.documentUploadedSuccessMessage);
        this.refreshSubscription(false);
      }, error => {
        console.error(error);
      });
  }

  public validateSubscription() {
    this.loading = true;
    this.teamService.validateSubscription(this.subscription.id)
      .subscribe(sub => {
        this.refreshSubscription();
      },
        err => {
        console.error(err);
        });
  }

  public deleteSubscription() {
    console.log('Suppression demandée');
    this.confirmationService.confirm({
      message: 'Êtes-vous sur(e) de vouloir supprimer l\'inscription de ' + this.subscription.firstName + ' ' + this.subscription.lastName.toUpperCase() + ' ?',
      accept: () => {
        this.teamService.deleteSubscription(this.subscription.id)
          .subscribe(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Inscription supprimée',
              detail: 'L\'inscription a bien été supprimée.'
            });
            this.router.navigate(['/management/subscriptions']);
          });
      }
    });
  }

  public refreshSubscription(loading = true) {
    this.loading = loading;
    const idSubscription = +this.route.snapshot.paramMap.get('id');

    this.teamService.getSubscription(idSubscription)
      .subscribe((subscription: Subscription) => {
          this.subscription = subscription;

          this.loading = false;
        },
        err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Inscription introuvable'
          });
          this.router.navigate(['/management/subscriptions']);
        });
  }
}
