import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'ngx-connection-service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  hasNetworkConnection: boolean | undefined;
  hasInternetAccess: boolean | undefined;
  status: string | undefined;

constructor(private connectionService: ConnectionService) {
      // comprueba la conexion a internet
    this.connectionService.monitor().subscribe((currentState) => {
      this.hasNetworkConnection = currentState.hasNetworkConnection;
      this.hasInternetAccess = currentState.hasInternetAccess;
      if (this.hasNetworkConnection && this.hasInternetAccess) {
        this.status = 'ONLINE';
        // console.log("ESTAS EN LINEA");
      } else {
        this.status = 'OFFLINE';
        // console.log("ESTAS FUERA DE LINEA");
        // Swal.fire({
        //   position: 'bottom-end',
        //   icon: 'warning',
        //   title: 'Se perdio la conexion a internet',
        //   showConfirmButton: false,
        //   timer: 1000
        // });
      }
    });
  }

  ngOnInit(): void {
  }
}
