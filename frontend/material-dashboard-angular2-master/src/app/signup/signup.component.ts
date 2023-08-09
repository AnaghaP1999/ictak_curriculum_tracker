import { Component, OnInit } from '@angular/core';
import { RequirementserviceService } from 'app/requirementservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupform={
    facultyname:'',
    username:'',
    password:''
  }
  constructor(private service:RequirementserviceService,private route:Router) { }

  ngOnInit(): void {
  }

  signupdisplay(){
    this.service.signupmethod(this.signupform).subscribe(res=>{
      alert("FacultyAccount Successfully Registered")
      localStorage.setItem('token', res.token);

        this.route.navigate(['/login'])
      },(error)=>{
        alert("Not Successfully Registered")
      } )
    
      }

}
