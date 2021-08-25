import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private subscription: Subscription = new Subscription;

  isLogged:any;

  constructor(private authService:ApiService, private cookieService:CookieService) { }

  ngOnInit(): void {

    this.subscription.add(
      this.authService.isLogged.subscribe((res) => (this.isLogged = res))
    );

    this.isLogged = this.cookieService.check('token_access');
    
  }

  onLogout(): void{
    let token = localStorage.getItem('token')
    this.authService.logout(token+'').subscribe((res) => {
      if (res) {
        this.authService.deleteToken();
        this.cookieService.delete('token_access');
        this.isLogged = this.cookieService.check('token_access');
      }
    })
  }
}
