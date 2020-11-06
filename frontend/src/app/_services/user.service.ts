import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:5000/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPoints(): Observable<any> {
    return this.http.get(API_URL + 'get_points');
  }

  savePoints(mapPoints): Observable<any> {
    return this.http.post(API_URL + 'add_point', {mapPoints});
  }
}
