import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { RequirementserviceService } from '../requirementservice.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  viewdetails:any=[];
  names:any;
  areas:any;
  institutes:any;
  req:any;
  hou:any;
  
    itemIdInput: any;
    searchForm: FormGroup;

    filterTerm: any;
   
    filtereddata: any= [];

  constructor(private reqservice:RequirementserviceService,
     private route: ActivatedRoute,
      private router:Router,private http:HttpClient,
       private formBuilder: FormBuilder,) { }
  
  items:any;
  requirements: any = {};

requirementform={
name:'',
area:'',
institute:'',
requirements:'',
hours:'',
approved:'0'

}
  
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() {


    this.reqservice.getRequirements().subscribe((data=>{
      this.items=data;
      this.applyFilter();
    
    }))
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

      const dataDailySalesChart: any = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
              [12, 17, 7, 17, 23, 18, 38]
          ]
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);


      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

      const dataCompletedTasksChart: any = {
          labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
          series: [
              [230, 750, 450, 300, 280, 240, 200, 190]
          ]
      };

     const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      }

      var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

      // start animation for the Completed Tasks Chart - Line Chart
      this.startAnimationForLineChart(completedTasksChart);



      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      var datawebsiteViewsChart = {
        labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

        ]
      };
      var optionswebsiteViewsChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
      var responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

      //start animation for the Emails Subscription Chart
      this.startAnimationForBarChart(websiteViewsChart);
  }


  
  // Add a requirement - Admin
  addrequirement(){
  
    this.reqservice.requirementadd(this.requirementform).subscribe(res=>{
     
    alert('Requirement form added successfully');
    window.location.reload();
  })
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

// delete a requirement - Admin
deleteRequirement(id: string) {
  this.reqservice.getDataById(id).subscribe(
    (response) => {
      this.requirements = response;
      if (confirm('Are you sure you want to delete this Requirement?')) { 
        this.reqservice.deleteRequirement(this.requirements._id).subscribe(
          () => {
            console.log('Requirement deleted successfully.');
            this.router.navigate(['']);
            window.location.reload();
          },
          (error) => {
            console.error('Error deleting requirement:', error);
          }
        );
      }  
    }
  );  
}

//  Approve Curriculum - Admin
updateToApproved(id: string) {
  this.reqservice.getDataById(id).subscribe(
    (response) => {
      this.requirements = response;
      if (confirm('Are you sure you want to approve this Curriculum?')) { 
        this.reqservice.updateItemToApproved(this.requirements._id).subscribe(
          () => {
            this.router.navigate(['']);
            window.location.reload();
          },
          (error) => {
            this.requirements.approved = 0;
            console.error('Error updating "approved" field:', error);
          }
        );
        
      }  
    }
  );
}


// fetchBooks() {
//   this.reqservice.searchmethod().subscribe((books) => {
//     this.books = books;
//     this.applyFilter();
//   });
// }

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

}
