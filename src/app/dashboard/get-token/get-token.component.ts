import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { Button } from '../../models/button.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-get-token',
  templateUrl: './get-token.component.html',
  styleUrls: ['./get-token.component.css']
})
export class GetTokenComponent implements OnInit {
  homeButtons: Button[];
  data: string;
  logged = true;
  title: String = "ADVuApp";
  constructor(private userService: UserService, private router: Router) {
    this.homeButtons = [
      {title: "Home", color: "primary", link: "/home"},
      {title: "getToken", color: "accent", link: "/getToken"},
      {title: "Logout", color: "warn", link: "/login"}
    ]; 
    userService.getToken().pipe(first())
    .subscribe(
      data => {
        this.data = JSON.stringify(data);
      }
    );
  }


  ngOnInit() {
  }

}
