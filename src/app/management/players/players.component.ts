import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng';

const playersDataTest = [
  {
    'firstName': "Ora",
    "lastName": "Frederick",
    "birthDate": "01/27/2020",
    "team": "LC BLR1",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Kiayada",
    "lastName": "Thompson",
    "birthDate": "03/05/2020",
    "team": "SF Dep1",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Paul",
    "lastName": "Joyce",
    "birthDate": "05/05/2019",
    "team": "M15H",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Troy",
    "lastName": "Neal",
    "birthDate": "02/01/2021",
    "team": "SH Dep 1",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Clinton",
    "lastName": "Villarreal",
    "birthDate": "08/14/2020",
    "team": "SH Dep 1",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Wade",
    "lastName": "Lambert",
    "birthDate": "11/26/2020",
    "team": "LC BLR1",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Akeem",
    "lastName": "Conley",
    "birthDate": "01/16/2020",
    "team": "SH Dep2",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Bethany",
    "lastName": "Whitfield",
    "birthDate": "01/17/2021",
    "team": "SH Dep 1",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Latifah",
    "lastName": "Coleman",
    "birthDate": "01/18/2020",
    "team": "SF Dep1",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Garth",
    "lastName": "Contreras",
    "birthDate": "06/22/2019",
    "team": "M15F",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Hilary",
    "lastName": "Malone",
    "birthDate": "11/26/2020",
    "team": "LC BLR2",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Aristotle",
    "lastName": "Sharp",
    "birthDate": "05/29/2019",
    "team": "M15H",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Jakeem",
    "lastName": "Savage",
    "birthDate": "09/14/2020",
    "team": "M15H",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Carl",
    "lastName": "Hardy",
    "birthDate": "01/13/2020",
    "team": "M17F",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Reed",
    "lastName": "Atkinson",
    "birthDate": "11/15/2019",
    "team": "M15H",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Griffin",
    "lastName": "Tyler",
    "birthDate": "09/19/2019",
    "team": "M15F",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Lynn",
    "lastName": "Gray",
    "birthDate": "04/03/2019",
    "team": "SF Dep1",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Kessie",
    "lastName": "Lang",
    "birthDate": "05/22/2019",
    "team": "SH PR1",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Stone",
    "lastName": "Buckley",
    "birthDate": "03/07/2019",
    "team": "SH Dep 1",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Howard",
    "lastName": "Decker",
    "birthDate": "06/15/2020",
    "team": "M20H",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Dominic",
    "lastName": "Fischer",
    "birthDate": "03/29/2019",
    "team": "M20H",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Abbot",
    "lastName": "Gordon",
    "birthDate": "08/14/2020",
    "team": "SH Dep2",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Bell",
    "lastName": "Maldonado",
    "birthDate": "02/07/2021",
    "team": "SF Dep1",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Palmer",
    "lastName": "White",
    "birthDate": "06/02/2019",
    "team": "LC BLR2",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Drake",
    "lastName": "Downs",
    "birthDate": "12/27/2019",
    "team": "SH Dep2",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Colleen",
    "lastName": "Stanton",
    "birthDate": "05/13/2019",
    "team": "LC BLR1",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Chiquita",
    "lastName": "Hyde",
    "birthDate": "09/12/2019",
    "team": "SH Dep 1",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Merrill",
    "lastName": "Armstrong",
    "birthDate": "12/22/2019",
    "team": "M15F",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Alan",
    "lastName": "Velez",
    "birthDate": "01/14/2020",
    "team": "LC BLR2",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Bruce",
    "lastName": "Sharp",
    "birthDate": "05/22/2020",
    "team": "SH Dep 1",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Quyn",
    "lastName": "Savage",
    "birthDate": "05/23/2019",
    "team": "SH Dep2",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Barry",
    "lastName": "Ashley",
    "birthDate": "11/22/2020",
    "team": "SH PR1",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Sheila",
    "lastName": "Hardin",
    "birthDate": "03/31/2020",
    "team": "M20H",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Elmo",
    "lastName": "Mcpherson",
    "birthDate": "08/04/2020",
    "team": "SH PR1",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Alisa",
    "lastName": "Rojas",
    "birthDate": "11/14/2019",
    "team": "SH Dep 1",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Jeremy",
    "lastName": "Mckenzie",
    "birthDate": "12/11/2019",
    "team": "SF Dep1",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Warren",
    "lastName": "Wooten",
    "birthDate": "05/19/2020",
    "team": "M15H",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Tatiana",
    "lastName": "Diaz",
    "birthDate": "04/03/2020",
    "team": "SH Dep2",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Coby",
    "lastName": "Turner",
    "birthDate": "07/05/2019",
    "team": "M15F",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Florence",
    "lastName": "Taylor",
    "birthDate": "03/06/2019",
    "team": "LC BLR1",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Tyler",
    "lastName": "Kirby",
    "birthDate": "10/20/2019",
    "team": "M17F",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Kiayada",
    "lastName": "Johnston",
    "birthDate": "07/23/2020",
    "team": "M20H",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Amal",
    "lastName": "Reilly",
    "birthDate": "08/16/2020",
    "team": "M17H",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Xerxes",
    "lastName": "Lindsey",
    "birthDate": "11/30/2019",
    "team": "SH PR1",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Stacey",
    "lastName": "Jacobs",
    "birthDate": "01/23/2020",
    "team": "SF Dep1",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "James",
    "lastName": "Ewing",
    "birthDate": "06/20/2019",
    "team": "M15F",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Madeson",
    "lastName": "Mcfarland",
    "birthDate": "01/31/2020",
    "team": "LC BLR2",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Kennedy",
    "lastName": "Chandler",
    "birthDate": "06/03/2019",
    "team": "LC BLR1",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Darius",
    "lastName": "Goodwin",
    "birthDate": "09/29/2019",
    "team": "SH Dep2",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Phelan",
    "lastName": "Dudley",
    "birthDate": "09/07/2019",
    "team": "SF Dep1",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Lysandra",
    "lastName": "Mccormick",
    "birthDate": "10/07/2019",
    "team": "LC BLR1",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Silas",
    "lastName": "Mathews",
    "birthDate": "10/03/2020",
    "team": "SH Dep 1",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Chase",
    "lastName": "Kidd",
    "birthDate": "05/13/2019",
    "team": "SF Dep1",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Stephanie",
    "lastName": "Hart",
    "birthDate": "02/15/2021",
    "team": "M17H",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Salvador",
    "lastName": "Suarez",
    "birthDate": "10/06/2020",
    "team": "M17F",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Driscoll",
    "lastName": "Suarez",
    "birthDate": "04/12/2019",
    "team": "M17H",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Edward",
    "lastName": "Hewitt",
    "birthDate": "06/26/2020",
    "team": "SH PR1",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Roary",
    "lastName": "Oneal",
    "birthDate": "09/01/2019",
    "team": "SH Dep2",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Keegan",
    "lastName": "Leblanc",
    "birthDate": "01/15/2021",
    "team": "SH PR1",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Macey",
    "lastName": "Rose",
    "birthDate": "08/06/2020",
    "team": "SH PR1",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Lana",
    "lastName": "Richard",
    "birthDate": "10/08/2019",
    "team": "M20H",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Abraham",
    "lastName": "Mack",
    "birthDate": "08/28/2020",
    "team": "LC BLR1",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Garrison",
    "lastName": "Kidd",
    "birthDate": "12/07/2020",
    "team": "SF Dep1",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Charissa",
    "lastName": "Rowe",
    "birthDate": "03/18/2019",
    "team": "M15H",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Elton",
    "lastName": "Randolph",
    "birthDate": "08/11/2019",
    "team": "SH PR1",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Grant",
    "lastName": "Rojas",
    "birthDate": "01/09/2020",
    "team": "M15F",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Curran",
    "lastName": "Bradley",
    "birthDate": "04/11/2020",
    "team": "LC BLR2",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Charlotte",
    "lastName": "Hunt",
    "birthDate": "11/26/2020",
    "team": "SH PR1",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Wynne",
    "lastName": "Lyons",
    "birthDate": "09/18/2019",
    "team": "SH Dep 1",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Jordan",
    "lastName": "Perry",
    "birthDate": "07/05/2019",
    "team": "LC BLR1",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Macey",
    "lastName": "Stark",
    "birthDate": "05/18/2020",
    "team": "M15F",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Iliana",
    "lastName": "Calhoun",
    "birthDate": "07/03/2019",
    "team": "SH Dep 1",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "George",
    "lastName": "Bray",
    "birthDate": "09/09/2020",
    "team": "M15H",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Timon",
    "lastName": "Herring",
    "birthDate": "09/24/2019",
    "team": "M15H",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Iris",
    "lastName": "Mills",
    "birthDate": "11/08/2020",
    "team": "LC BLR1",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Russell",
    "lastName": "Mcclure",
    "birthDate": "12/29/2019",
    "team": "SH Dep 1",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Christopher",
    "lastName": "Hopkins",
    "birthDate": "10/17/2020",
    "team": "SH Dep2",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Martina",
    "lastName": "Hood",
    "birthDate": "12/12/2020",
    "team": "M17F",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Amos",
    "lastName": "Hall",
    "birthDate": "07/31/2020",
    "team": "SH PR1",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Gregory",
    "lastName": "Powell",
    "birthDate": "07/31/2019",
    "team": "LC BLR2",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Yasir",
    "lastName": "Simpson",
    "birthDate": "09/06/2020",
    "team": "SH Dep 1",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Lara",
    "lastName": "Bray",
    "birthDate": "12/21/2019",
    "team": "M15F",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Barrett",
    "lastName": "Wright",
    "birthDate": "08/23/2020",
    "team": "SH Dep2",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Jason",
    "lastName": "Wiggins",
    "birthDate": "01/26/2020",
    "team": "LC BLR1",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Alyssa",
    "lastName": "Burton",
    "birthDate": "04/26/2020",
    "team": "M20H",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Cassidy",
    "lastName": "Nelson",
    "birthDate": "07/29/2020",
    "team": "LC BLR1",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Dexter",
    "lastName": "Sears",
    "birthDate": "10/26/2019",
    "team": "SH PR1",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Renee",
    "lastName": "Johnston",
    "birthDate": "02/21/2020",
    "team": "LC BLR1",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Brennan",
    "lastName": "Stokes",
    "birthDate": "10/21/2020",
    "team": "M17F",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Brandon",
    "lastName": "Guerra",
    "birthDate": "09/16/2020",
    "team": "M15F",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Barry",
    "lastName": "Blanchard",
    "birthDate": "04/19/2020",
    "team": "SH Dep 1",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Kellie",
    "lastName": "Munoz",
    "birthDate": "03/01/2021",
    "team": "M17F",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Hiram",
    "lastName": "Summers",
    "birthDate": "02/24/2020",
    "team": "M17F",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Connor",
    "lastName": "Rios",
    "birthDate": "10/14/2019",
    "team": "M17H",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Hayes",
    "lastName": "Greer",
    "birthDate": "10/26/2020",
    "team": "LC BLR1",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Yasir",
    "lastName": "Wallace",
    "birthDate": "09/25/2019",
    "team": "LC BLR2",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Cade",
    "lastName": "Macias",
    "birthDate": "09/13/2020",
    "team": "SH Dep2",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Dane",
    "lastName": "Wilkinson",
    "birthDate": "01/15/2021",
    "team": "SF Dep1",
    "subscription": "Dossier ouvert"
  },
  {
    "firstName": "Angela",
    "lastName": "Daugherty",
    "birthDate": "09/01/2020",
    "team": "M17H",
    "subscription": "Inscrit(e)"
  },
  {
    "firstName": "Igor",
    "lastName": "Henderson",
    "birthDate": "02/18/2021",
    "team": "SF Dep1",
    "subscription": "Inscrit(e)"
  }
]

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  public tabMenuItems: MenuItem[] = [
    { label: 'Tous les joueurs' },
    { label: 'Sans équipe' },
    { label: 'Sans licence' }
  ]

  public mawRowCount = 15;
  public players = playersDataTest;

  public columns = [
    { field: 'lastName', header: 'Nom', filterMatchMode: 'contains' },
    { field: 'firstName', header: 'Prénom', filterMatchMode: 'contains' },
    { field: 'birthDate', header: 'Date de naissance', filterMatchMode: 'contains' },
    { field: 'team', header: 'Équipe', filterMatchMode: 'contains' },
    { field: 'subscription', header: 'Inscription', filterMatchMode: 'contains' }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  selectPlayer(player: any) {
    alert('Joueur : ' + player.data.firstName);
  }
}
