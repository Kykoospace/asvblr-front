import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/api/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.signOut();
    this.router.navigate(['login']);
  }
}
