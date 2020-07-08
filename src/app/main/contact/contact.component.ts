import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ManagementService} from '../../shared/services/api/management/management.service';
import {MessageService} from 'primeng';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public emailForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private managementService: ManagementService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      sender: ['', [ Validators.required, Validators.email ]],
      content: ['', [ Validators.required ]]
    });
  }

  public sendEmail(): void {
    if (this.emailForm.valid) {
      this.managementService.sendMailContact(this.emailForm.value)
        .subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Votre question a été envoyée !'
            });
            this.emailForm.reset();
          }
        );
    }
  }
}
