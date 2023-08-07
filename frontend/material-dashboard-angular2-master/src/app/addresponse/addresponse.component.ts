import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequirementserviceService } from 'app/requirementservice.service';

@Component({
  selector: 'app-addresponse',
  templateUrl: './addresponse.component.html',
  styleUrls: ['./addresponse.component.scss']
})
export class AddresponseComponent implements OnInit {

  requirementData: any = {};
  private id: string | null = null;

  constructor(private reqservice:RequirementserviceService, private http: HttpClient, private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.id = decodeURIComponent(this.id);
      this.getRequirementDetails(this.id);

      if (!this.id) {
        console.error('No ID found in route parameters.');
      }
    });
  }

  getRequirementDetails(id: string) {
    this.reqservice.getDataById(id).subscribe(
      (response) => {
        this.requirementData = response; 
        console.log('this.requirementData',  this.requirementData);
        
      },
      (error) => {
        console.error('Error fetching requirement details:', error);
      }
    );
  }

  // add a response - Faculty
  addResponse() {
    this.reqservice.addResponse(this.requirementData).subscribe(() => {
      this.router.navigate(['/facultydashboard']);
    });
  }
  
}
