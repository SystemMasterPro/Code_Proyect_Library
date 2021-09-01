import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { ApiService } from './services/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

public readonly VAPID_PUBLIC_KEY = 'BNzcADrO7IM3qxmlLlp-P8JpWloBEzy58_lQ-sS-kh0MmTePhV0i3ofWBK5MxIHh9VzTcms1WpPRCPRgrJETM8g'


constructor(private service : ApiService, private swPush: SwPush) {}

  ngOnInit(): void {
    
  }

subscribetoNotifications():any {
  this.swPush.requestSubscription({
    serverPublicKey: this.VAPID_PUBLIC_KEY
  }).then(sub => {
    const token = JSON.parse(JSON.stringify(sub));
    this.service.saveTokenNotifications(token).subscribe((res: Object) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    })
  }).catch(err => console.log(err))

}

}
