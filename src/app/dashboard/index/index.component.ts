import { Component, OnInit } from '@angular/core';
import { Button } from '../../models/button.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  banner: string;
  logged = false;
  title: String = "ADVuApp";
  navColor = "#292825";
  homeButtons: Button[];
  constructor() {
    this.banner = "/assets/images/main_banner.jpg";
    this.homeButtons = [
      {title: 'Home', color: 'primary', link: '/'},
      {title: 'Register', color: 'accent', link: '/register'},
      {title: 'Login', color: 'warn', link: '/login'}
    ]

   }

  ngOnInit() {
  }

}
