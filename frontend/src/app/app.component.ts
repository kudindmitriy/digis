import {Component, OnChanges, OnInit} from '@angular/core';
import {TokenStorageService} from './_services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService, private router: Router) {
  }

  ngOnInit(): void {

    this.tokenStorageService.isAuthenticated().subscribe(data => {
      this.isLoggedIn = !!data;
    });
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
