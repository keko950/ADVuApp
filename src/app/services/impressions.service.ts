import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config.js';
import { Impression } from '../models/impression.model';
@Injectable({
  providedIn: 'root'
})
export class ImpressionsService {
  config = new Config();
  constructor(private http: HttpClient) { }

  getAll(date1: Date, date2: Date, loc: String) {
    if (loc == "")
      return this.http.get<Impression[]>(this.config.apiURL+'/user/impressions?date1='+ date1.toLocaleDateString("en-US") + "&date2=" + date2.toLocaleDateString("en-US"));
    else 
      return this.http.get<Impression[]>(this.config.apiURL+'/user/impressions?date1='+ date1.toLocaleDateString("en-US") + "&date2=" + date2.toLocaleDateString("en-US") + "&loc=" + loc);
  }

  getByIp(ip: string) {
      return this.http.get<Impression[]>(this.config.apiURL+'/user/impressions?ip=' + ip);
  }

  getByLoc(loc: string) {
    return this.http.get<Impression[]>(this.config.apiURL+'/user/impressions?loc=' + loc);
  }

  getByLocAndIp(ip:string ,loc: string) {
    return this.http.get<Impression[]>(this.config.apiURL+'/user/impressions?ip=' + ip + '&loc=' + loc);
  }

}
