import { Component, OnInit } from '@angular/core';
import {ManagementService} from '../../services/api/management/management.service';
import {DynamicDialogConfig, DynamicDialogRef, MessageService} from 'primeng';

@Component({
  selector: 'app-dynamic-dialog-preview-document',
  templateUrl: './dynamic-dialog-preview-document.component.html',
  styleUrls: ['./dynamic-dialog-preview-document.component.scss']
})
export class DynamicDialogPreviewDocumentComponent implements OnInit {

  public document: any;

  constructor(
    public config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    const document = this.config.data.document;
    this.document = '/api/document-repository/' + document.name;
  }
}
