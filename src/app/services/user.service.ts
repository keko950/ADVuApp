import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config.js';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  config = new Config();
  constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(this.config.apiURL+'/users');
    }
 
    getById(id: number) {
        return this.http.get(this.config.apiURL+'/users/' + id);
    }
 
    register(user: User) {
        return this.http.post(this.config.apiURL+'/user/register', {"user": user});
    }
 
    update(user) {
        return this.http.put(this.config.apiURL+'/user/' + user.id, user);
    }

    updateMyself(user) {
        return this.http.put(this.config.apiURL+'/user/me', user);
  }
 
    delete(id: number) {
        return this.http.delete(this.config.apiURL+'/users/' + id);
    }

    getToken() {
        return this.http.get(this.config.apiURL+'/user/advToken');
    }

}
