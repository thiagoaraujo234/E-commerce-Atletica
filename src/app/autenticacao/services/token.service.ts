import { Injectable } from '@angular/core';

const KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken() {
    // ?? senao encontrar retorna ''
    return localStorage.getItem(KEY) ?? '';
  }

  saveToken(token: string) {
    return localStorage.setItem(KEY, token);
  }

  deleteToken() {
    localStorage.removeItem(KEY);
  }

  hasToken() {
    // !! se tem valor retorna true
    return !!this.getToken();
  }

}
