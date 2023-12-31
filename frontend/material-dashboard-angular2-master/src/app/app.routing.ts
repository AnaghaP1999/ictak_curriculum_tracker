import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';
import { UserroleGuard } from './userrole.guard';
import { AddresponseComponent } from './addresponse/addresponse.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full',
  },{path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
   {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  },
  {path:'add-response/:id',component:AddresponseComponent, canActivate: [AuthGuard, UserroleGuard]},
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
