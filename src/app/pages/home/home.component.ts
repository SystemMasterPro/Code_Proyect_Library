import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // usuario:any 
  constructor(public authService: ApiService) {}

  ngOnInit(): void {
    // this.isData()
  }

  // isData() {
  //   let data = localStorage.getItem('user');
  //   this.usuario = JSON.parse(`${data}`);
  // }

}
