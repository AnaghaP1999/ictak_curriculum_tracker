import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AddresponseComponent } from './addresponse/addresponse.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TokeninterceptorService } from './tokeninterceptor.service';
import { RequirementserviceService } from './requirementservice.service';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
import { UserroleGuard } from './userrole.guard';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AddresponseComponent,
    LoginComponent,
    SignupComponent,
   

  ],
  providers: [RequirementserviceService, AuthGuard, RoleGuard, UserroleGuard, {
    provide:HTTP_INTERCEPTORS,
    useClass:TokeninterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
