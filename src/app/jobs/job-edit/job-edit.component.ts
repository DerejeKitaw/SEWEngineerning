import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';


import { IJob } from '../../shared/interfaces';
import { JobService } from '../job.service';


@Component({
  selector: 'sew-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {
  pageTitle: string = 'Edit Job';
  formError: { [id: string]: string };
  // Operation text can be :  Update for edit, Insert for new
  jobForm: FormGroup;
  //private sub: Subscription;

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
      this.buildForm();
      // this.sub = this.route.params.subscribe(
      //         params => {
      //           //console.log(params['id']);
      //             let id = params['id'];
      //             this.getJob(id);

      //     });
    } else {
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
    console.log('**form submited***'+JSON.stringify(value) +'valid= '+ valid);
    value._id = this.job._id;

      this.dataService.saveJob(value)
        .subscribe((job: IJob) => {
         
            console.log('**job is updated**');
            //this.router.navigate(['/jobs']);
      
        },
        (err) => console.log(err));

    // this.onBack();
  }

  cancel(event: Event) {
    event.preventDefault();
    // this.onBack();
    //this.router.navigate(['/Jobs']);
  }

  delete(event: Event) {
    event.preventDefault();
    this.dataService.deleteJob(this.job._id)
      .subscribe((status: boolean) => {
        if (status) {
          this.router.navigate(['/jobs']);
        }
        else {
          this.errorMessage = 'Unable to delete job';
        }
      },
      (err) => console.log(err));
  }
}