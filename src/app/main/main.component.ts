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
    { label: 'La vie du club', icon: 'fas fa-volleyball-ball',
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
    { label: 'Gallerie', routerLink: 'gallery', icon: 'fas fa-images' },
    { label: 'Contact', routerLink: 'contact', icon: 'fas fa-envelope' },
  ]


  constructor() { }

  ngOnInit() {
  }

}
