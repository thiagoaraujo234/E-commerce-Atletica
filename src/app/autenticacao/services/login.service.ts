import { HttpClient, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TokenService } from './token.service';
import jwt_decode from 'jwt-decode';
import { Usuario } from 'src/app/usuario/model/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly ENDPOINT = 'http://localhost:8080/auth';
  private usuarioSubject = new BehaviorSubject<any>({});
  public usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService) {
      if (this.tokenService.hasToken()) {
        // notificar todos os componentes
        this.decodificarJWT();
      }
    }

  autenticar(login1: string, senha1: string) {
    const obj = {
      email: login1,
      senha: senha1
      
    }
    
    return this.httpClient.post(this.ENDPOINT, obj, {observe: 'response'})
    .pipe(tap((res) => {
      const token = res.headers.get('Authorization') ?? '';
      //alert('Token: '+res.headers.get('Authorization'));
      this.salvarToken(token);
      this.usuarioAutenticado = true;
      this.mostrarMenuEmitter.emit(true);
    })
    );
  }

  private decodificarJWT() {
    const token = this.tokenService.getToken();
    const usuario = jwt_decode(token) as Usuario;
    this.usuarioSubject.next(usuario);
  }

  retornaUsuario() {
    return this.usuarioSubject.asObservable();
  }

  salvarToken(token: string) {
    this.tokenService.saveToken(token);
    this.decodificarJWT();
  }

  logout() {
    this.tokenService.deleteToken();
  }

  estaLogado() {
    this.tokenService.hasToken;
  }
 
}
