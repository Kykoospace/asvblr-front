import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading/loading.service';


@Injectable()
export class LoadingScreenInterceptor implements HttpInterceptor {

  private activeRequests: number;

  /**
   * URLs for which the loading screen should not be enabled
   */
  private skippUrls = [
    'https://geo.api.gouv.fr/'
  ];

  constructor(private loadingService: LoadingService) {
    this.activeRequests = 0;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let displayLoadingScreen = true;

    for (const skippUrl of this.skippUrls) {
      if (new RegExp(skippUrl).test(request.url)) {
        displayLoadingScreen = false;
        break;
      }
    }

    if (displayLoadingScreen) {
      if (this.activeRequests === 0) {
        this.loadingService.startLoading();
      }
      this.activeRequests++;

      return next.handle(request).pipe(
        finalize(() => {
          this.activeRequests--;
          if (this.activeRequests === 0) {
            this.loadingService.stopLoading();
          }
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
