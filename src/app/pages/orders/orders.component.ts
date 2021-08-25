import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  user: any;
  linkimagen = '';
  orders: any;

constructor(private authService: ApiService) {}


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') + '');
    this.linkimagen = `http://localhost:8000${this.user.image}`;
    this.getOrders()
  }

  getOrders() {
    this.authService.getOrderUser().subscribe((res) => {
      console.log(res);
      this.orders = this.orders;
      console.log(this.orders);
    })
  }
}
