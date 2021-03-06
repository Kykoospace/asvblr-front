import {Component, OnDestroy, OnInit} from '@angular/core';
import Team from '../../shared/models/entities/Team';
import {TeamService} from '../../shared/services/api/team/team.service';
import {DialogService, DynamicDialogRef, MessageService} from 'primeng';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {DynamicDialogTeamFormComponent} from '../../shared/components/dynamic-dialog-team-form/dynamic-dialog-team-form.component';
import TeamList from '../../shared/models/responses/TeamList';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit, OnDestroy {

  public newTeamDialogRef: DynamicDialogRef;

  public teams: TeamList[];

  public categoryOptions: any[] = [
    { label: '', value: null }
  ];

  public columns = [
    { column: 'Nom', field: 'teamName' },
    { column: 'Categorie', field: 'teamCategoryName' },
    { column: 'Coach', field: 'coachFullName' },
    { column: 'Nombre de joueurs', field: 'nbPlayers' }
  ];

  constructor(
    private teamService: TeamService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    forkJoin({
      teamList: this.teamService.getTeamList(),
      teamCategories: this.teamService.getAllTeamCategories()
    }).subscribe(
        results => {
          this.teams = results.teamList;
          results.teamCategories.forEach(category => this.categoryOptions.push({ label: category.name, value: category.name }));
        },
        err => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Chargement des équipes impossible',
            detail: 'Une erreur est survenue lors du chargement des équipes.'
          });
        }
      );
  }

  ngOnDestroy(): void {
    if (this.newTeamDialogRef) {
      this.newTeamDialogRef.close();
    }
  }

  public selectTeam(team: Team) {
    this.router.navigate(['/management/teams/', team.id]);
  }

  public openNewTeamDialog() {
    this.newTeamDialogRef = this.dialogService.open(DynamicDialogTeamFormComponent, { header: 'Nouvelle équipe' });
    this.newTeamDialogRef.onClose
      .subscribe(
        team => {
          if (team) {
            this.selectTeam(team);
          }
        },
        err => console.error(err)
      );
  }
}
