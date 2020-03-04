import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public images = [
    { source: 'assets/images/carousel_1.jpg', alt: '', title: 'Journée associations 2018' },
    { source: 'assets/images/carousel_2.jpg', alt: '', title: 'Équipe M20 homme' },
    { source: 'assets/images/carousel_3.jpg', alt: '', title: 'Équipe M20 F' },
    { source: 'assets/images/carousel_4.jpg', alt: '', title: 'Équipe Dep 1 H' },
    { source: 'assets/images/carousel_5.jpg', alt: '', title: 'Équipe Dep 2 H' },
  ];

  public articles = [
    {
      title: 'Événement : La Galette de la Reine',
      text: 'Le bureau vous souhaite une très bonne année 2020 ! Santé, Bonheur & Volley\n' +
        '\n' +
        '\n' +
        'À  cette occasion, dans une démarche écoresponsable, nous mettons en place des gobelets réutilisables.\n' +
        '\n' +
        'Ils seront mis à disposition et consignés 2 euros. Si vous désirez soutenir cette démarche merci de vous munir d’une pièce de monnaie pour le goûter.',
      date: '8 janvier 2020'
    },
    {
      title: 'Forum des Associations – Édition 2019',
      text: 'Le Samedi 7 septembre, le gymnase des Bas-Coquarts accueillera le Forum des associations.\n' +
        '\n' +
        'Le club de volley de Bourg-La-Reine se fera un plaisir de vous accueillir pour vous parler de la passion du volley-ball ! Les coachs et bénévoles seront là tout au long de cette journée pour vous donner les renseignements dont vous aurez besoin. \n' +
        '\n' +
        'N’hésitez pas à venir voir la démonstration du club à 10h30, au complexe sportif des Bas-Coquarts!\n' +
        '\n' +
        ' \n' +
        '\n' +
        ' \n' +
        '\n' +
        'INFOS PRATIQUES\n' +
        'Date\n' +
        'Samedi 07 septembre 2019\n' +
        '\n' +
        'Heure\n' +
        'de 9h à 12h et de 14h à 18h\n' +
        '\n' +
        'Lieu\n' +
        'Complexe sportif des Bas-Coquarts\n' +
        '8, avenue de Montrouge\n' +
        '92340 Bourg-la-Reine',
      date: '2 septembre 2019'
    },
    {
      title: 'Inscription 2019-2020',
      text: 'Bonjour à tous,\n' +
        '\n' +
        ' \n' +
        '\n' +
        'L’ensemble des informations concernant l’inscription, les horaires et les gymnases pour la rentrée 2019-2020 a été mis à jour!\n' +
        '\n' +
        'Merci pour votre patience,\n' +
        '\n' +
        ' \n' +
        '\n' +
        'Sportivement,\n' +
        '\n' +
        'L’ASBR Volley',
      date: '2 septembre 2019'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
