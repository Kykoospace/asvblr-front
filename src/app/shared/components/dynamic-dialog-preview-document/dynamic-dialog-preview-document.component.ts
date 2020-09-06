import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig} from 'primeng';
import {Md5} from 'ts-md5/dist/md5';
import {environment} from '../../../../environments/environment';
import {ManagementService} from "../../services/api/management/management.service";
import {TeamService} from "../../services/api/team/team.service";

@Component({
  selector: 'app-dynamic-dialog-preview-document',
  templateUrl: './dynamic-dialog-preview-document.component.html',
  styleUrls: ['./dynamic-dialog-preview-document.component.scss']
})
export class DynamicDialogPreviewDocumentComponent implements OnInit {

  public document: any;

  constructor(
    public config: DynamicDialogConfig,
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
    this.teamService.getDocumentUrl(this.config.data.document.id)
      .subscribe(
        url => this.document = url.url,
        err => console.log(err)
      );
  }
}
