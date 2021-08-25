import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {

  isLogged:any;

  constructor(private authService:ApiService, private cookieService:CookieService) {}

  ngOnInit(): void {
    this.authService.isLogged.subscribe((res) => (this.isLogged = res));
    this.isLogged = this.cookieService.check('token_access');
  }
}
