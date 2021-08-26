import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

constructor(private service : ApiService, private cookieService : CookieService) {}

  ngOnInit(): void {
    // if (this.cookieService.check('token_access') === true) {
    //   setInterval(this.service.deleteToken, 60000);
    //   console.log("realizado");
    // }
  }
}
