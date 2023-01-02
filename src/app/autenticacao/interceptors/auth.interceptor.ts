import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { AppComponent } from 'src/app/app.component';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken();
    console.log(token);
    if (token) {
      request = request.clone({
        url:  request.url,
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    console.log(request);
    return next.handle(request);
  }
}
