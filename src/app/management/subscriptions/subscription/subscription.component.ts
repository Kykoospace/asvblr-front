import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../../../shared/services/api/team/team.service';
import Subscription from '../../../shared/models/entities/Subscription';
import { ConfirmationService, MessageService } from 'primeng';
import ClothingSize from '../../../shared/models/entities/ClothingSize';
import {forkJoin} from 'rxjs';
import SubscriptionCategory from '../../../shared/models/entities/SubscriptionCategory';
import SubscriptionPaymentMode from '../../../shared/models/responses/SubscriptionPaymentMode';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  private documentUploadedSuccessMessage = {
    severity: 'success',
    summary: 'Document téléversé',
    detail: 'Le document a bien été téléversé'
  };

  public subscription: Subscription;

  public paymentModes: SubscriptionPaymentMode[];
  public category: SubscriptionCategory;
  public topSize: ClothingSize;
  public pantsSize: ClothingSize;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.refreshSubscription();
  }

  public backNavigate() {
    this.router.navigate(['/management/subscriptions']);
  }

  public refreshSubscription() {
    // Get subscription id from route :
    const idSubscription = +this.route.snapshot.paramMap.get('id');

    // Call GET route :
    this.teamService.getSubscription(idSubscription)
      .subscribe(
        // If success :
        (subscription: Subscription) => {
          this.subscription = subscription;
          const requests: any = {
            paymentModes: this.teamService.getSubscriptionPaymentModes(this.subscription.id),
            category: this.teamService.getSubscriptionCategory(this.subscription.idSubscriptionCategory)
          };

          if (this.subscription.equipment) {
            requests.topSize = this.teamService.getClothingSize(this.subscription.idTopSize);
            requests.pantsSize = this.teamService.getClothingSize(this.subscription.idPantsSize);
          }
          forkJoin(requests)
            .subscribe(
              (results: any) => {
                this.paymentModes = results.paymentModes;
                this.category = results.category;
                if (this.subscription.equipment) {
                  this.topSize = results.topSize;
                  this.pantsSize = results.pantsSize;
                }
              },
              err => console.error(err)
            );
        },
        // If fail :
        err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Inscription introuvable'
          });
          // Back to subscription list :
          this.router.navigate(['/management/subscriptions']);
        });
  }

  public uploadCNI(file) {
    this.teamService.updateSubscriptionCNI(this.subscription.id, file.files.pop())
      .subscribe(() => {
        this.messageService.add(this.documentUploadedSuccessMessage);
        this.refreshSubscription();
      }, err => console.error(err)
      );
  }

  public uploadMedicalCertificate(file) {
    this.teamService.updateSubscriptionMedicalCertificate(this.subscription.id, file.files.pop())
      .subscribe(
        () => {
        this.messageService.add(this.documentUploadedSuccessMessage);
        this.refreshSubscription();
      }, err => console.error(err)
      );
  }

  public uploadIdentityPhoto(file) {
    this.teamService.updateSubscriptionIdentityPhoto(this.subscription.id, file.files.pop())
      .subscribe(
        () => {
        this.messageService.add(this.documentUploadedSuccessMessage);
        this.refreshSubscription();
      }, err => console.error(err)
      );
  }

  public validateSubscription() {
    // Call validate-subscription route :
    this.teamService.validateSubscription(this.subscription.id)
      .subscribe(
        // If success :
        sub => {
          this.refreshSubscription();
          },
        // If fail :
        err => {
          console.error(err);
        });
  }

  public deleteSubscription() {
    // Call confirm dialog box :
    this.confirmationService.confirm({
      message: 'Voulez-vous supprimer l\'inscription ?',
      header: 'Supprimer l\'inscription',

      // Callback method when accepted :
      accept: () => {
        // Call delete route :
        this.teamService.deleteSubscription(this.subscription.id)
          .subscribe(
            // If success :
            () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Inscription supprimée',
                detail: 'L\'inscription a bien été supprimée.'
              });
              this.backNavigate();
            },
            // If fail :
            err => {
              this.messageService.add({
                severity: 'error',
                summary: 'Suppression impossible',
                detail: 'Une erreur est survenue lors de la suppression de l\'inscription.'
              });
            });
      }
    });
  }

  public allPaimentModesPaied(): boolean {
    return this.paymentModes.filter(paimentMode => !paimentMode.paid).length === 0;
  }

  public payPaymentMode(subscriptionPaymentMode: SubscriptionPaymentMode): void {
    this.teamService.paySubscriptionPaymentMode(this.subscription.id, subscriptionPaymentMode.idPaymentMode)
      .subscribe(
        paymentModes => {
          this.paymentModes = paymentModes;
          this.messageService.add({
            severity: 'success',
            summary: 'Paiement accepté',
            detail: subscriptionPaymentMode.namePaymentMode
          });
        },
        err => console.error(err)
      );
  }

  public unpayPaymentMode(subscriptionPaymentMode: SubscriptionPaymentMode): void {
    this.teamService.unpaySubscriptionPaymentMode(this.subscription.id, subscriptionPaymentMode.idPaymentMode)
      .subscribe(
        paymentModes => {
          this.paymentModes = paymentModes;
          this.messageService.add({
            severity: 'success',
            summary: 'Paiement annulé',
            detail: subscriptionPaymentMode.namePaymentMode
          });
        },
        err => console.error(err)
      );
  }
}
