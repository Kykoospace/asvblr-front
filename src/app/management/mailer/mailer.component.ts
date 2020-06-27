import { Component, OnInit } from '@angular/core';
import {ManagementService} from '../../shared/services/api/management/management.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DialogService, DynamicDialogRef, MessageService} from 'primeng';
import {DynamicDialogSelectUsersComponent} from '../../shared/components/dynamic-dialog-select-users/dynamic-dialog-select-users.component';
import User from '../../shared/models/entities/User';

@Component({
  selector: 'app-mailer',
  templateUrl: './mailer.component.html',
  styleUrls: ['./mailer.component.scss']
})
export class MailerComponent implements OnInit {

  public receiversSelectorDialogRef: DynamicDialogRef;

  public mailForm: FormGroup;

  constructor(
    private managementService: ManagementService,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.mailForm = this.formBuilder.group({
      idsUser: [[], [ Validators.required ]],
      object: ['', [ Validators.required ]],
      content: ['', [ Validators.required ]]
    });
  }

  public getReceiversLabel(): string {
    const nbReceivers = this.mailForm.get('idsUser').value.length;
    if (nbReceivers > 1) {
      return nbReceivers + ' destinataires';
    } else if (nbReceivers > 0) {
      return '1 destinataire';
    } else {
      return 'Destinataires';
    }
  }

  public openReceiversSelectorDialog(): void {
    this.receiversSelectorDialogRef
      = this.dialogService.open(
        DynamicDialogSelectUsersComponent,
      {
        header: 'Sélectionnez des destinataires',
        data: {
          sourceLabel: 'Annuaire du club',
          targetLabel: 'Destinataires',
          targetUsers: this.mailForm.get('idsUser').value
        }
      });
    this.receiversSelectorDialogRef.onClose
      .subscribe(
        (targetUsers: User[]) => {
          if (targetUsers) {
            const idsUsers = [];
            targetUsers.forEach(user => {
              idsUsers.push(user.id);
            });
            this.mailForm.get('idsUser').setValue(idsUsers);
          }
        }
      );
  }

  public sendMail(): void {
    if (this.mailForm.valid) {
      this.managementService.sendMail(this.mailForm.value)
        .subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Email envoyé !'
            });
            this.resetForm();
          },
          err => console.error(err)
        );
    }
  }

  public resetForm(): void {
    this.mailForm.setValue({
      idsUser: [],
      object: '',
      content: ''
    });
  }
}
