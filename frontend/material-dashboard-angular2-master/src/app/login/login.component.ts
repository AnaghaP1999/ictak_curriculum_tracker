import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequirementserviceService } from 'app/requirementservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  loginform = {
    username: '',
    password: ''
  }
  constructor(private route: Router, private service: RequirementserviceService) { }

  ngOnInit(): void {
  }


  logindisplay() {

    if (this.loginform.username == 'admin@gmail.com' && this.loginform.password == 'admin@123') {
      this.service.loginmethod(this.loginform).subscribe((res: any) => {
        alert("Successfully logged in the Admin Account")
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role)
        this.route.navigate(['/dashboard'])
      },(error)=>{
        alert("Not Successfully LogIn")
      } )
    } else {
      this.service.facultyloginmethod(this.loginform).subscribe(res =>{
        alert("Successfully logged in the Faculty Account")
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('user', res.user);
        this.route.navigate(['/facultydashboard']);
      },(error=>{
        alert("Not Successfully LogIn")
      }) )
    }
   }

}
