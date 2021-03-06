import { Component, OnInit } from '@angular/core';
import { ManagementService } from '../../shared/services/api/management/management.service';
import { forkJoin } from 'rxjs';
import { MessageService } from 'primeng';
import AppConstants from '../../shared/AppConstants';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  public playersAgeStats: any;
  public playersCityStats: any;
  public playerPaymentModesStats: any;

  public doughnutOptions = {
    legend: {
      position: 'right'
    }
  };

  constructor(
    private managementService: ManagementService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    const requests = {
      playersByAge: this.managementService.getPlayersAgeStats(),
      playersByCity: this.managementService.getPlayersCityStats(),
      playersPaymentModes: this.managementService.getPlayersPaymentModeStats()
    };

    forkJoin(requests)
      .subscribe(
        (stats: any) => {
          console.log(stats);
          this.playersAgeStats = {
            labels: [
              '0 - 4',
              '5 - 9',
              '10 - 14',
              '15 - 19',
              '20 - 24',
              '25 - 29',
              '30 - 34',
              '35 - 39',
              '40 - 44',
              '45 - 49',
              '50 - 54',
              '55 - 59',
              '60 - 64',
              '65 - 69',
              '70 - 74',
              '75 - 79',
            ],
            datasets: [{
              label: 'Joueurs',
              backgroundColor: '#004e64',
              borderColor: '#FF0000',
              data: stats.playersByAge.pop()
            }]
          };
          this.playersCityStats = {
            labels: [],
            datasets: []
          };
          const dataset1: { data: number[], backgroundColor: string[] } = {
            data: [],
            backgroundColor: []
          };
          stats.playersByCity.forEach(
            (city, index) => {
              this.playersCityStats.labels.push(city[1]);
              dataset1.data.push(city[0]);
              dataset1.backgroundColor.push(AppConstants.getColor(index));
            }
          );
          this.playersCityStats.datasets.push(dataset1);
          this.playerPaymentModesStats = {
            labels: [],
            datasets: []
          };
          const dataset2 = {
            data: [],
            backgroundColor: []
          };
          stats.playersPaymentModes.forEach(
            (paymentMode, index) => {
              this.playerPaymentModesStats.labels.push(paymentMode[1]);
              dataset2.data.push(paymentMode[2]);
              dataset2.backgroundColor.push(AppConstants.getColor(index));
            }
          );
          this.playerPaymentModesStats.datasets.push(dataset2);
        },
        err => this.messageService.add({
          severity: 'error',
          summary: 'Impossible de récupérer les statistiques'
        })
      );
  }
}
