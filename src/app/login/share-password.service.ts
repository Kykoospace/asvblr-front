import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharePasswordService {

  private password: string;

  constructor() { }

  public setPassword(password: string): void {
    this.password = password;
  }

  public getPassword(): string {
    const password = this.password;
    this.password = null;
    return password;
  }
}
