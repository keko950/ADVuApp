import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  config = new Config();
  constructor(private http: HttpClient) { }
  login(username: string, password: string){
    return this.http.post(this.config.apiURL+"/user/login",{"user": {username: username, password: password}})
      .pipe(map(user => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }  

  logout() {
    localStorage.removeItem('currentUser');
  }
}
