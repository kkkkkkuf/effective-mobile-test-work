import { Component, NgZone, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.loggedIn();
  }

  navigateToPosts() {
    if (this.isAuthenticated) {
      this.router.navigate(['/posts']);
    } else {
      this.toastr.info(
        'Для доступа к списку постов необходимо авторизоваться.'
      );
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
