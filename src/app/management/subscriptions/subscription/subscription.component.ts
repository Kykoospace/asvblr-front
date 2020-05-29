import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../../../shared/services/api/team/team.service';
import Subscription from '../../../shared/models/entities/Subscription';
import { ConfirmationService, MessageService } from 'primeng';
import ClothingSize from '../../../shared/models/entities/ClothingSize';
import {forkJoin} from 'rxjs';

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

  public subscription: Subscription;
  public topSize: ClothingSize;
  public pantsSize: ClothingSize;

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
      message: 'Voulez-vous supprimer l\'inscription de '
        + this.subscription.firstName + ' '
        + this.subscription.lastName.toUpperCase() + ' ?',

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

  public refreshSubscription(loading: boolean = true) {
    this.loading = loading;
    // Get subscription id from route :
    const idSubscription = +this.route.snapshot.paramMap.get('id');

    // Call GET route :
    this.teamService.getSubscription(idSubscription)
      .subscribe(
        // If success :
        (subscription: Subscription) => {
          this.subscription = subscription;
          this.loading = false;

          // Get clothes sizes values :
          if (subscription.equipment) {
            forkJoin({
              topSize: this.teamService.getClothingSize(this.subscription.idTopSize),
              pantsSize: this.teamService.getClothingSize(this.subscription.idPantsSize)
            })
              .subscribe(
                results => {
                  this.topSize = results.topSize;
                  this.pantsSize = results.pantsSize;
                  this.loading = false;
                },
                  err => {
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Taille de vêtement introuvable'
                  });
                  this.loading = false;
                });
          } else {
            this.loading = false;
          }
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
}
