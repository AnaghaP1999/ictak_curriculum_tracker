import { Component, OnInit } from '@angular/core';
import { RequirementserviceService } from '../requirementservice.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-facultydashboard',
  templateUrl: './facultydashboard.component.html',
  styleUrls: ['./facultydashboard.component.scss']
})
export class FacultydashboardComponent implements OnInit {
  viewdetails:any=[];
  names:any;
  areas:any;
  institutes:any;
  req:any;
  hou:any;
  
    itemIdInput: any;
    searchForm: FormGroup;
  items:any;

  requirements: any = {};
  filterTerm: any;
   
  filtereddata: any= [];

  requirementform={
  name:'',
  area:'',
  institute:'',
  requirements:'',
  hours:'',
  approved:'0'
  
  }
    
  constructor(private reqservice:RequirementserviceService) { }

  ngOnInit(): void {

    this.reqservice.getRequirements().subscribe((data=>{
      this.items=data;
      this.applyFilter()
      this.fetchPdfUrls();
    }))

    // this.reqservice.getRequirements().subscribe((data=>{
    //   this.items=data;
    //   // console.log(this.items);
    //   for(let i=0;i<this.items[i].length;i++){
    //     console.log(this.items[i])                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             )
    //   }
    // }))
  }

  viewDetails(itemId: any) {
    this.reqservice.viewdetailsse(itemId).subscribe(details => {
    this.viewdetails=  details
    console.log(details);
    console.log(this.viewdetails.data._id)
    this.names=this.viewdetails.data.name;
    this.areas=this.viewdetails.data.area;
    this.institutes=this.viewdetails.data.institute;
    this.req=this.viewdetails.data.requirements;
    this.hou=this.viewdetails.data.hours
    });
  }


  applyFilter() {
    if (!this.filterTerm) {
      this.filtereddata = this.items;
    } else {
      this.filtereddata = this.items.filter((item) =>
        this.dataFilterTerm(item, this.filterTerm)
      );
    }
  }
  
  dataFilterTerm(data: any, term: any): boolean {
    // Customize this function based on your data structure and filtering requirements
    return (
      data.name.toLowerCase().includes(term.toLowerCase()) ||
      data.area.toLowerCase().includes(term.toLowerCase()) ||
      data._id.toLowerCase().includes(term.toLowerCase()) 
  
    );
  }

  fetchPdfUrls(): void {
    this.reqservice.getRequirements().subscribe((data=>{
      this.items=data;
      this.items.forEach((item) => {
        if (item.approved == 1) {
          this.reqservice.getPdfUrl(item._id).subscribe((pdfUrl) => {
            item.curriculum = pdfUrl; // Assuming 'curriculum' holds the PDF filename
            console.log('kjh',item.curriculum);
            
          });
        }
      });
    }))
    
  }

  downloadPdf(itemId: string) {
    this.reqservice.getPdfUrl(itemId).subscribe((response: any) => {
      const pdfUrl = response;
      const link = document.createElement('a');
      link.href = pdfUrl;
      
      link.target = '_blank';
      link.setAttribute('download', `curriculum-${itemId}.pdf`); // Set the "download" attribute
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); 
    });
  }

}
