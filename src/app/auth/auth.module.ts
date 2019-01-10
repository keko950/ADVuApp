import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from '../app.routing';
import { AppComponent } from '../app.component';
import { AuthGuard } from '../auth.guard';
import { AlertService} from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { AlertComponent } from '../components/alert/alert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../helpers/jwt.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule, MatListModule, MatCardModule, MatMenuModule,
  MatToolbarModule, MatIconModule, MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatError, MatFormField, MatInputModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatListModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatCardModule,
    MatFormFieldModule,
    MatMenuModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatIconModule,
    routing,
    MatButtonModule,
    LayoutModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
    UserService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    }],
  bootstrap: [AppComponent]
})
export class AuthModule { }
