import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private alertService: AlertService) { }


  get f() {return this.registerForm.controls;} 
  

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]]
    });

  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    var user: User = {
      username: this.f.username.value,
      password: this.f.password.value,
      email: this.f.email.value,
      name: this.f.name.value,
      surname: this.f.surname.value,
  };
    this.loading = true;
    this.userService.register(user)
    .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

}
