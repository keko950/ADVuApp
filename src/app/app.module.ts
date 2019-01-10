import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { AlertService} from './services/alert.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AlertComponent } from './components/alert/alert.component';
import { HomeComponent } from './dashboard/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule, MatListModule, MatCardModule, MatMenuModule,
  MatToolbarModule, MatIconModule, MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatError, MatFormField, MatInputModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChartsModule } from 'ng2-charts';
import { GetTokenComponent } from './dashboard/get-token/get-token.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { IndexComponent } from './dashboard/index/index.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';
@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    AuthModule,
    routing,
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthService,
    UserService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
