import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { UserResponse, User } from '../shared/models/user.interface';
import { Order } from '../shared/models/order';
import { catchError, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2'


@Injectable({providedIn: 'root'})
export class ApiService {

    private loggedIn = new BehaviorSubject<boolean>(false);

    token = localStorage.getItem('token');
    headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': 'Token '+this.token});

    constructor(private http : HttpClient, private router : Router, private cookieService:CookieService) {}

    // OBSERVABLE PARA INDICAR SESIONES
    get isLogged(): Observable < boolean > {
        return this.loggedIn.asObservable();
    }

    // LOGIN
    login(authData : User): Observable < UserResponse | void > {
        return this.http.post<UserResponse>(`${environment.API_URL}/login/`, authData).pipe(map((res : UserResponse) => {
            this.loggedIn.next(true);
            return res;
        }), catchError(res => res = this.handlerError(res)))
    }

    // LOGOUT
    logout(token: string) {
        return this.http.post<any>(`${environment.API_URL}/logout_api/?token=${token}`, token).pipe(
            map((res: any) => {
                return res;
            }));
    }

    // RETORNA LOS LIBROS DISPONIBLES
    getBooks() {
        return this.http.get<any>(`${environment.API_URL}/api/books/`, {headers: this.headers});
    }
    // RETORNA UN LIBRO EN ESPECIFICO
    findById(id: number): Observable<any> {
        return this.http.get<any>(`${environment.API_URL}/api/books/${id}`, { headers: this.headers });
    }

    // GUARDAMOS EL TOKEN EN EL LOCALSTORAGE
    saveToken(token : string, user : any):void {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    }

    // ELIMINAMOS EL TOKEN
    deleteToken() {
this.cookieService.delete('token_access');

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.loggedIn.next(false);
        this.router.navigate(['login']);
    }

    // ACTUALIZAMOS EL TOKEN
    updateToken() {
        this.http.get<any>(`${environment.API_URL}/refresh-token/`, { headers: this.headers }).subscribe((res) => {
            this.saveToken(res.token, res.user);
            this.cookieService.set('token_access', res.token, 1, '/');
        })
    }

    //  PEDIDOS DEL USUARIO
    getOrderUser() {
        return this.http.get<any>(`${environment.API_URL}/api/orders/`, { headers: this.headers });
    }

    //  CREAR PEDIDO DE USUARIO
    postOrderUser(order: Order): Observable<Order> {
        return this.http.post<Order>(`${environment.API_URL}/api/orders/`, order, { headers: this.headers });
    }

    // MANEJO DE ERRORES
    private handlerError(err : any): Observable < never > {
        let errorMessage = 'A ocurrido un error';
        if (err) {
            errorMessage = `Error: code ${
                err.message
            }`;
            Swal.fire({
                title: 'Acceso Denegado',
                text: "Credenciales de acceso incorrectas",
                icon: 'error',
                confirmButtonColor: '#d33',
                confirmButtonText: 'Entendido'
            })
        }
        return throwError(errorMessage);
    }
}
