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

  requirement: { comments: string, curriculum: File | null } = { comments: '', curriculum: null };
  selectedId: any;
  requirementData: any = {};
  private id: string | null = null;

  constructor(private reqservice:RequirementserviceService, private http: HttpClient, private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      
      this.getRequirementDetails(this.id);

      if (!this.id) {
        console.error('No ID found in route parameters.');
      }
    });
  }

  getRequirementDetails(id: string) {
    this.reqservice.getDataById(id).subscribe(
      (response) => {
        this.requirement = response; 
        console.log('this.requirementData',  this.requirement);
        
      },
      (error) => {
        console.error('Error fetching requirement details:', error);
      }
    );
  }

  submitForm() {
    if (this.id) {
      // Prepare the requirementData object with comments and file properties
      const formData = new FormData();
      formData.append('_id', this.id);
      formData.append('comments', this.requirement.comments);
      formData.append('curriculum', this.requirement.curriculum || new File([], 'dummy.txt'));

      this.reqservice.saveRequirement(formData).subscribe(
      
        (response) => {
          console.log('Requirement saved successfully:', response);
          // Reset the form after successful submission
          this.requirement.comments = '';
          this.requirement.curriculum = null;
          this.router.navigate(['/facultydashboard']);
        },
        (error) => {
          console.error('Error while saving requirement:', error);
        }
      );
    } else {
      console.error('No ID found in route parameters.');
    }
  }

  onFileChange(event: any) {
    this.requirement.curriculum = event.target.files[0];
  }

}
