import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { User } from '../../models/user.model';
import { Button } from '../../models/button.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  updateForm: FormGroup;
  loading = false;
  submitted = false;
  logged = true;
  homeButtons: Button[];
  returnUrl: string;
  title: String = "ADVuApp";
  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private alertService: AlertService) { 

                this.homeButtons = [
                  {title: 'Home', color: 'primary', link: '/home'},
                  {title: 'getToken', color: 'accent', link: '/getToken'},
                  {title: 'Logout', color: 'warn', link: '/login'}
                ]

              }


  get f() {return this.updateForm.controls;} 
  

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      password: ['', [Validators.minLength(8)]],
      email: ['', [Validators.email]],
      name: ['', [Validators.minLength(3)]],
      surname: ['', [Validators.minLength(3)]]
    });

  }

  onSubmit() {
    this.submitted = true;
    if (this.updateForm.invalid) {
      return;
    }
    var entity = { user: {}};
    if (this.f.password.value)
      entity.user["password"] = this.f.password.value;
    if (this.f.email.value)
      entity.user["email"] = this.f.email.value;    
    if (this.f.name.value)
      entity.user["name"] = this.f.name.value;
    if (this.f.surname.value)
      entity.user["surname"] = this.f.surname.value;
    this.loading = true;
    this.userService.updateMyself(entity)
    .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/home']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

}
