import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  // tslint:disable-next-line:variable-name
  private _loading: boolean = false;
  loadingStatus: Subject<boolean> = new Subject();

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    this._loading = value;
    this.loadingStatus.next(value);
  }

  startLoading() {
    this.loading = true;
    console.log('Start loading');
  }

  stopLoading() {
    this.loading = false;
  }
}
