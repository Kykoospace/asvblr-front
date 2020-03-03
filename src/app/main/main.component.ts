import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public navItems: MenuItem[] = [
    { label: 'Accueil', routerLink: 'home', icon: 'fas fa-home' },
    { label: 'La vie du club', routerLink: 'club', icon: 'fas fa-volleyball-ball',
      items: [
        [
          { label: 'Découvrir notre club',
            items: [
              { label: 'Horaires et gymnases', routerLink: '' },
              { label: 'Histoire du club', routerLink: '' },
              { label: 'Les entraîneurs', routerLink: '' },
              { label: 'Nos partenaires', routerLink: '' },
              { label: 'Le Bureau', routerLink: '' },
            ]
          }
        ]
      ]
    },
    { label: 'Nos équipes', routerLink: 'teams', icon: 'fas fa-users',
      items: [
        [
          { label: 'Junior',
            items: [
              { label: 'Horaires et gymnases', routerLink: '' },
              { label: 'Histoire du club', routerLink: '' },
              { label: 'Les entraîneurs', routerLink: '' },
              { label: 'Nos partenaires', routerLink: '' },
              { label: 'Le Bureau', routerLink: '' }
            ]
          }
        ],
        [
          { label: 'Loisir',
            items: [
              { label: 'Horaires et gymnases', routerLink: '' },
              { label: 'Histoire du club', routerLink: '' },
              { label: 'Les entraîneurs', routerLink: '' },
              { label: 'Nos partenaires', routerLink: '' },
              { label: 'Le Bureau', routerLink: '' }
            ]
          }
        ],
        [
          { label: 'Sénior',
            items: [
              { label: 'Horaires et gymnases', routerLink: '' },
              { label: 'Histoire du club', routerLink: '' },
              { label: 'Les entraîneurs', routerLink: '' },
              { label: 'Nos partenaires', routerLink: '' },
              { label: 'Le Bureau', routerLink: '' }
            ]
          }
        ]
      ]
    },
    { label: 'Inscription', routerLink: 'subscription', icon: 'fas fa-file-signature' },
    { label: 'Gallerie', routerLink: 'gallery', icon: 'fas fa-images' },
    { label: 'Contact', routerLink: 'contact', icon: 'fas fa-envelope' },
  ]


  constructor() { }

  ngOnInit() {
  }

}
