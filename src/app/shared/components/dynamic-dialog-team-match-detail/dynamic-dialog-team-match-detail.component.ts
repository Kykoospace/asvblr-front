import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/api/team/team.service';
import {DynamicDialogConfig, DynamicDialogRef, MessageService} from 'primeng';
import Match from '../../models/entities/Match';
import Drive from '../../models/entities/Drive';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/api/auth/auth.service';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-dynamic-dialog-team-match-detail',
  templateUrl: './dynamic-dialog-team-match-detail.component.html',
  styleUrls: ['./dynamic-dialog-team-match-detail.component.scss']
})
export class DynamicDialogTeamMatchDetailComponent implements OnInit {

  public createDriveToggle: boolean;

  public match: Match;
  public enableDriveOptions: boolean = false;
  public drives: Drive[];
  public driveForm: FormGroup;

  public calendarLanguage = {
    firstDayOfWeek: 1,
    dayNames: [ 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi' ],
    dayNamesShort: [ 'Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam' ],
    dayNamesMin: [ 'D', 'L', 'M', 'M', 'J', 'V', 'S' ],
    monthNames: [ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ],
    monthNamesShort: [ 'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc' ],
    today: 'Aujourd\'hui',
    clear: 'Effacer'
  };

  constructor(
    private teamService: TeamService,
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    this.createDriveToggle = false;
    this.match = this.config.data.match;
    this.enableDriveOptions = this.config.data.enableDriveOptions;
  }

  ngOnInit(): void {
    this.refreshDrives();

    this.driveForm = this.formBuilder.group({
      nbTotalPlaces: [null, [ Validators.required ]],
      outward: [false, [ Validators.required ]],
      outwardPlace: [{ value: '', disabled: true }],
      outwardDate: [{ value: null, disabled: true}],
      return: [false, [ Validators.required ]],
      returnPlace: [{ value: '', disabled: true }]
    }, { validators: this.formValidator });

    this.driveForm.get('outward').valueChanges
      .subscribe(
        (value: boolean) => {
          const outwardPlace = this.driveForm.get('outwardPlace');
          const outWardDate = this.driveForm.get('outwardDate');

          if (value) {
            outwardPlace.setValidators(Validators.required);
            outwardPlace.enable();
            outWardDate.setValidators(Validators.required);
            outWardDate.enable();
            outWardDate.setValue(this.match.date);
          } else {
            outwardPlace.clearValidators();
            outwardPlace.disable();
            outWardDate.clearValidators();
            outWardDate.disable();
            outWardDate.setValue(null);
          }

          outwardPlace.updateValueAndValidity();
          outWardDate.updateValueAndValidity();
        }
      );

    this.driveForm.get('return').valueChanges
      .subscribe(
        value => {
          const returnPlace = this.driveForm.get('returnPlace');

          if (value) {
            returnPlace.setValidators(Validators.required);
            returnPlace.enable();
          } else {
            returnPlace.clearValidators();
            returnPlace.disable();
          }

          returnPlace.updateValueAndValidity();
        }
      );
  }

  private refreshDrives(): void {
    if (this.enableDriveOptions) {
      this.teamService.getMatchDrives(this.match.id)
        .subscribe(
          drives => this.drives = drives,
          err => console.error(err)
        );
    }
  }

  private formValidator(group: FormGroup) {
    if (group.get('outward').value === true) {
      return null;
    }
    if (group.get('return').value === true) {
      return null;
    }
    return { noDriveChecked: true };
  }

  public createDrive(): void {
    if (this.driveForm.valid) {
      const data = this.driveForm.value;
      const requests: any = {};
      if (data.outward) {
        requests.outward = this.teamService.createDrive({
          idMatch: this.match.id,
          idDriver: this.authService.getLoggedUser().id,
          address: data.outwardPlace,
          date: data.outwardDate,
          go: true,
          nbTotalPlaces: data.nbTotalPlaces
        });
      }
      if (data.return) {
        requests.return = this.teamService.createDrive({
          idMatch: this.match.id,
          idDriver: this.authService.getLoggedUser().id,
          address: data.returnPlace,
          date: this.match.date,
          go: false,
          nbTotalPlaces: data.nbTotalPlaces
        });
      }

      forkJoin(requests)
        .subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Les covoiturages ont été mis à jour'
            });
            this.refreshDrives();
            this.resetForm();
            this.createDriveToggle = false;
          },
          err => console.error(err)
        );
    }
  }

  public deleteDrive(idDrive: number): void {
    this.teamService.deleteDrive(idDrive).subscribe(
      () => this.messageService.add({
        severity: 'success',
        summary: 'Covoiturage annulé'
      }),
      err => console.error(err)
    );
  }

  public resetForm(): void {
    this.driveForm.reset();
  }

  public onDeleteDrive(drive: Drive): void {
    this.teamService.deleteDrive(drive.id)
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Covoiturage annulé'
          });
          this.refreshDrives();
        },
        err => console.error(err)
      );
  }

  public onEnterDrive(drive: Drive): void {
    this.teamService.addDrivePassenger(drive.id, this.authService.getLoggedUser().id)
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Vous avez rejoint le covoiturage de ' + drive.firstNameDriver
          });
          this.refreshDrives();
        }
      );
  }

  public onLeaveDrive(drive: Drive): void {
    this.teamService.removeDrivePassenger(drive.id, this.authService.getLoggedUser().id)
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Vous avez quitté le covoiturage de ' + drive.firstNameDriver
          });
          this.refreshDrives();
        }
      );
  }
}
