import { Component, OnInit, Input } from '@angular/core';
import { Button } from '../../models/button.model';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //title = 'ADVuApp';
  @Input() navtitle: string;
  @Input() buttons: Button[];
  @Input() logged: Boolean;
  @Input() navColor: string;
  profile: Button = { color: "red", title: "Profile", link: "/profile"};
  image: string;
  constructor() { 
    this.image = "/assets/images/logo.png";

  }

  ngOnInit() {
  }


}
