import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/api/auth/auth.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(
        catchError(err => {
          // Si l'utilisateur n'est pas authentifié :
          if (err.status === 401) {
            console.error('ERROR HANDLER:  user logged out');
          }

          return throwError(err);
        })
      );
  }
}
