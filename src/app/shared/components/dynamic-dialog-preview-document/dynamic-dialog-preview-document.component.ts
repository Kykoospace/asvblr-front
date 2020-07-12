import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig} from 'primeng';
import {Md5} from 'ts-md5/dist/md5';
import {environment} from '../../../../environments/environment';

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
    const md5 = new Md5();
    const hash_token = md5.appendStr(document.name + environment.md5_secret_key).end();
    console.log('/p/' + hash_token + '/' + document.name);
    this.document = '/p/' + hash_token + '/' + document.name;
  }
}
