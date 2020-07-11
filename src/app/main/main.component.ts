import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng';
import {NavigationEnd, Router} from '@angular/router';
import AppConstants from '../shared/AppConstants';
import {filter} from 'rxjs/operators';
import {ManagementService} from '../shared/services/api/management/management.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public title: string;
  public subTitle: string;

  public navItems: MenuItem[] = [
    { label: 'Accueil', routerLink: 'home', icon: 'fas fa-home' },
    { label: 'Le club', routerLink: 'club', icon: 'fas fa-volleyball-ball' },
    { label: 'Les gymnases', routerLink: 'gymnasium', icon: 'fas fa-map-marker-alt' },
    { label: 'Nos équipes', icon: 'fas fa-users',
      items: [
        [
          { label: 'Enfant',
            items: [
              { label: 'Baby volley', routerLink: '' },
            ]
          },
          { label: 'Loisir compétition',
            items: [
              { label: 'Équipe 1 mixte', routerLink: '' },
              { label: 'Équipe 2 mixte', routerLink: '' },
              { label: 'SANOFI Équipe 3', routerLink: '' },
              { label: 'Équipe 4x4 F', routerLink: '' }
            ]
          }
        ],
        [
          { label: 'Junior',
            items: [
              { label: 'Moins de 7/9 mixte', routerLink: '' },
              { label: 'Moins de 11/13 mixte', routerLink: '' },
              { label: 'Moins de 15/17 F', routerLink: '' },
              { label: 'Moins de 20 F', routerLink: '' },
              { label: 'Moins de 15 H', routerLink: '' },
              { label: 'Moins de 17 H', routerLink: '' },
              { label: 'Moins de 20 H', routerLink: '' }
            ]
          }
        ],
        [
          { label: 'Sénior',
            items: [
              { label: 'Departementale 1 F', routerLink: '' },
              { label: 'Departementale 1 H', routerLink: '' },
              { label: 'Departementale 2 H', routerLink: '' },
              { label: 'Pré-regionnale 1 H', routerLink: '' },
            ]
          }
        ]
      ]
    },
    { label: 'Inscription', routerLink: 'subscription', icon: 'fas fa-file-signature' },
    { label: 'Contact', routerLink: 'contact', icon: 'fas fa-envelope' },
  ]

  constructor(
    private router: Router,
    private managementService: ManagementService
  ) {
    this.title = AppConstants.APP_NAME_MAIN_TITLE;
    this.subTitle = AppConstants.APP_NAME_SUB_TITLE;
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(
        (event: NavigationEnd) => {
          let pageCode: string;
          switch (event.urlAfterRedirects) {
            case '/main/home':
              pageCode = 'HOME_PAGE';
              break;
            case '/main/subscription':
              pageCode = 'SUBSCRIPTION_PAGE';
              break;
            case '/main/contact':
              pageCode = 'CONTACT_PAGE';
              break;
            default:
              pageCode = undefined;
              break;
          }
          if (pageCode) {
            this.managementService.addVisitCount(pageCode)
              .subscribe();
          }
        }
      );
  }

  ngOnInit() {
  }

  public accessMemberArea() {
    this.router.navigate(['/management']);
  }

}
