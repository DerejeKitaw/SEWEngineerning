import { Component, OnInit ,OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { Subscription }       from 'rxjs/Subscription';


import { IJob } from '../../shared/interfaces';
import { JobService } from '../job.service';


@Component({
  selector: 'sew-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.css']
})
export class JobAddComponent implements OnInit {
 pageTitle: string = 'Edit Job';
   formError: { [id: string]: string };
  // Operation text can be :  Update for edit, Insert for new
  jobForm: FormGroup;
  private sub: Subscription;
  
  job: IJob = {
    _id: '',
    FirstName: '',
    LastName: '',
    County: '',
    Address: '',
    CustomerEmail: '',
    CustomerPhone: '',
    Utility: '',
    SiteAssessDateReceived: '',
    SiteAssessDateReleased: '',
    EngineeringDesignReceived: '',
    EngineeringDesignSentToRep: '',
    EngineeringDesignApprovedByRep: '',
    EngineeringDesignReleased: '',
    NTPSubmited: '',
    NTPApproved: '',
    InterconnectionSubmited: '',
    InterconnectionApproved: '',
    PermitsSubmited: '',
    PermitsApproved: '',
    EquipmentOrdered: '',
    EquipmentOnHand: '',
    HOASubmited: '',
    HOAApproved: '',
    Notes: '',
    ScheduleDate: '',
    ModuleType: '',
    ModulePower: '',
    InverterManufacturer: '',
    InverterSize: '',
    Price: 0,
    Type: '',
  };

  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText: string = 'Insert';

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataService: JobService,
    private formBuilder: FormBuilder) {

  // Initialize strings
        this.formError = {
            'FirstName': '',
            'LastName': '',
            'County': '',
            'Address': ''
        };
      
     }
  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    
    if (id !== '0') {
      console.log('Existing job id = ' + id);
      this.operationText = 'Update';
      this.getJob(id);

    }else{
    console.log('**this is new job**');
    //this.getJob(id);
    this.buildForm();
    }





  }

  getJob(id: string) {
    this.dataService.getJob(id)
      .subscribe((job: IJob) => {
        //Quick and dirty clone used in case user cancels out of form
        const cust = JSON.stringify(job);
        this.job = JSON.parse(cust);
        this.buildForm();
      },
      (err) => console.log(err));
  }

  buildForm() {
    this.jobForm = this.formBuilder.group({
      FirstName: [this.job.FirstName, Validators.required],
      LastName: [this.job.LastName, Validators.required],
      County: [this.job.County, Validators.required],
      Address: [this.job.Address, Validators.required],
    });
  }


  submit({ value, valid }: { value: IJob, valid: boolean }) {

    value._id = this.job._id;
    // var job: IJob = {
    //   _id: this.job._id,
    // };
console.log('value_id='+value._id);
    if (value._id) {

      this.dataService.updateJob(value)
        .subscribe((job: IJob) => {
          if (job) {
            this.router.navigate(['/Jobs']);
          }
          else {
            this.errorMessage = 'Unable to save job';
          }
        },
        (err) => console.log(err));

    } else {

      this.dataService.insertJob(value)
        .subscribe((job: IJob) => {
          if (job) {
            this.router.navigate(['/jobs']);
            this.errorMessage = 'job added to database';
          }
          else {
            this.errorMessage = 'Unable to add job';
          }
        },
        (err) => console.log(err));

    }

  }

  cancel(event: Event) {
    event.preventDefault();
    //this.router.navigate(['/Jobs']);
  }

  delete(event: Event) {
    event.preventDefault();
    this.dataService.deleteJob(this.job._id)
      .subscribe((status: boolean) => {
        if (status) {
          this.router.navigate(['/Jobs']);
        }
        else {
          this.errorMessage = 'Unable to delete job';
        }
      },
      (err) => console.log(err));
  }

}