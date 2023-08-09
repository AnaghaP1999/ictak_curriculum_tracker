import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequirementserviceService } from 'app/requirementservice.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editrequirement',
  templateUrl: './editrequirement.component.html',
  styleUrls: ['./editrequirement.component.scss']
})
export class EditrequirementComponent implements OnInit {

  constructor(private reqservice:RequirementserviceService, private route: ActivatedRoute,
    private router:Router) { }

    data: any = {};

    requirementData: any = {};
    reqId: any;

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      this.reqId = params.get('id');
      this.reqId = decodeURIComponent(this.reqId);
      
      this.getRequirementDetails(this.reqId);
    });
  }

   // get single requirement details - Admin
   getRequirementDetails(id: string)
   {
    this.reqservice.getDataById(id).subscribe(
      (response) => {
        this.requirementData = response;    
      },
      (error) => {
        console.error('Error fetching requirement details:', error);
      }
    );
  }

  // update a requirement - Admin
  updateRequirement() {
    this.reqservice.updateRequirement(this.requirementData).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }

}
