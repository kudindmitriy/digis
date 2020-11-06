import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private token = new BehaviorSubject<any>(window.sessionStorage.getItem(TOKEN_KEY));
  constructor() {
  }

  signOut(): void {
    window.sessionStorage.clear();
    this.token.next(window.sessionStorage.getItem(TOKEN_KEY));
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    this.token.next(token);
  }

  public getToken(): string {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public isAuthenticated(): Observable<any> {
    return this.token.asObservable();
  }


  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
}
