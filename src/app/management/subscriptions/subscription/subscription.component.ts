import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../../../shared/services/api/team/team.service';
import Subscription from '../../../shared/models/entities/Subscription';
import {ConfirmationService, DialogService, DynamicDialogRef, MessageService} from 'primeng';
import ClothingSize from '../../../shared/models/entities/ClothingSize';
import {forkJoin} from 'rxjs';
import SubscriptionCategory from '../../../shared/models/entities/SubscriptionCategory';
import SubscriptionPaymentMode from '../../../shared/models/responses/SubscriptionPaymentMode';
import {DatePipe} from '@angular/common';
import {ManagementService} from '../../../shared/services/api/management/management.service';
import {DynamicDialogPreviewDocumentComponent} from '../../../shared/components/dynamic-dialog-preview-document/dynamic-dialog-preview-document.component';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit, OnDestroy {

  public previewDocumentDialogRef: DynamicDialogRef;

  private documentUploadedSuccessMessage = {
    severity: 'success',
    summary: 'Document téléversé',
    detail: 'Le document a bien été téléversé'
  };

  public pcLabels = {
    pc_allowToLeaveAlone: 'Autorisé à quitter seul le lieu d\'entrainement ou de compétition',
    pc_allowClubToRescue: 'Autorise les dirigeants du club à prendre toutes les mesures utiles en cas d\'incident',
    pc_allowToTravelWithTeamMate: 'Autorisé à prendre place dans une voiture particulière afin ' +
      'd\'effectuer les déplacements nécessités par les compétitions sportives officielles ou amicales ' +
      'au cours de la saison',
    pc_allowToPublish: 'Autorisé à paraître sur les publications du club',
    pc_allowToWhatsapp: 'Autorisé à faire partie d\'un groupe Whatsapp pour l\'organisation des matchs'
  };

  public subscription: Subscription;

  public paymentModes: SubscriptionPaymentMode[];
  public category: SubscriptionCategory;
  public topSize: ClothingSize;
  public pantsSize: ClothingSize;

  public cniDocument: Document;
  public identityPhotoDocument: Document;
  public medicalCertificateDocument: Document;
  public identityPhotoValidity: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private managementService: ManagementService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.refreshSubscription();
  }

  ngOnDestroy() {
    if (this.previewDocumentDialogRef) {
      this.previewDocumentDialogRef.close();
    }
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
            category: this.teamService.getSubscriptionCategory(this.subscription.idSubscriptionCategory),
            cni: this.teamService.getDocument(this.subscription.idCNI),
            identityPhoto: this.teamService.getDocument(this.subscription.idIdentityPhoto),
            medicalCertificate: this.teamService.getDocument(this.subscription.idMedicalCertificate)
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
                this.cniDocument = results.cni;
                this.identityPhotoDocument = results.identityPhoto;
                this.medicalCertificateDocument = results.medicalCertificate;
                if (this.subscription.equipment) {
                  this.topSize = results.topSize;
                  this.pantsSize = results.pantsSize;
                }
              },
              err => console.error(err)
            );

          this.teamService.checkPhotoValidity(this.subscription.id)
            .subscribe(
              validity => this.identityPhotoValidity = validity.validity,
              err => this.identityPhotoValidity = null
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

  public getValidationLabel(): string {
    return this.subscription.validated
      ? 'Validée le ' + this.datePipe.transform(this.subscription.validationDate, 'dd/MM/yyyy')
      : 'Valider l\'inscription';
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

  public playerIsMinor() {
    const date = new Date(this.subscription.birthDate);
    date.setFullYear(date.getFullYear() + 18);
    return date.getTime() > Date.now();
  }

  public openPreviewDocumentDialog(title: string, document: Document): void {
    this.dialogService.open(
      DynamicDialogPreviewDocumentComponent,
      {
        header: title,
        data: {
          document
        }
      }
    );
  }
}
