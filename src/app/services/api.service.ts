import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { UserResponse, User } from '../shared/models/user.interface';
import { JwtHelperService } from "@auth0/angular-jwt";
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2'

const helper = new JwtHelperService();

@Injectable({providedIn: 'root'})
export class ApiService {

    private loggedIn = new BehaviorSubject<boolean>(false);

    token = localStorage.getItem('token');
    headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded', 'Authorization': 'Token '+this.token});



    constructor(private http : HttpClient, private router : Router) {}

    // OBSERVABLE PARA INDICAR SESIONES
    get isLogged(): Observable < boolean > {
        return this.loggedIn.asObservable();
    }

    // FUNCION DE LOGIN
    login(authData : User): Observable < UserResponse | void > {
        return this.http.post<UserResponse>(`${
            environment.API_URL
        }/login/`, authData).pipe(map((res : UserResponse) => {
            console.log(res.token);
            this.loggedIn.next(true);
            return res;
        }), catchError(res => res = this.handlerError(res)))
    }

    // FUNCION DE LOGOUT
    logout(token: string) {
        return this.http.post<any>(`${environment.API_URL}/logout_api/?token=${token}`, token).pipe(
                map((res:any) => {
                    console.log(res);
                    return res;
                })
            )
    }

    // FUNCION QUE DEVUELVE LOS LIBROS DISPONIBLES
    getBooks() {
        return this.http.get<any>(`${environment.API_URL}/api/books/`, {headers: this.headers});
    }

    // LEEMOS NUESTRO LOCALSTORAGE Y ACTUALIZAMOS EL TOKEN EN CAOS DE SER NECESARIO
    readToken() {
        const userToken = localStorage.getItem('token');
        const isExpired = helper.isTokenExpired(userToken ?. toString());
        if (isExpired) {
            // this.updateToken(userToken?.toString());
            // ACTUALIZAR TOKEN
            this.updateToken();
        }
    }

    // GUARDAMOS EL TOKEN EN EL LOCALSTORAGE
    saveToken(token : string, user : any): void {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    }

    // ELIMINAMOS EL TOKEN
    deleteToken() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.loggedIn.next(false);
        this.router.navigate(['login']);
    }

    // ACTUALIZAMOS EL TOKEN
    updateToken() {
        return this.http.get<any>(`${environment.API_URL}/refresh-token/`, {headers: this.headers});
    }

    // FUNCION QUE DEVUELVE LOS PEDIDOS DEL USUARIO
    getOrderUser() {
        return this.http.get<any>(`${environment.API_URL}/api/orders/`, { headers: this.headers });
    }

    // FUNCION PARA CREAR PEDIDO DE USUARIO
    postOrderUser() {
        
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
