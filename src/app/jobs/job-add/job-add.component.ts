<<<<<<< HEAD
import { Component, OnInit ,OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { Subscription }       from 'rxjs/Subscription';


import { IJob } from '../../shared/interfaces';
// =======
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router, ActivatedRoute } from '@angular/router';

// import { IJob } from '../job';
// >>>>>>> 27051ff132c6f3089cc694c8529923c5a5627275
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

//   pageTitle: string = 'Edit Job';
//   editForm: FormGroup;
//   formError: { [id: string]: string };
//   private validationMessages: { [id: string]: { [id: string]: string } };
//   job: IJob;
//   newJob;
//   errorMessage: string;

//   constructor(private fb: FormBuilder,
//     private jobService: JobService,
//     private router: Router,
//     private route: ActivatedRoute) {

//     // Initialize strings
//     this.formError = {
//       'FirstName': '',
//       'LastName': '',
//       'County': ''
//     };
//     this.validationMessages = {
//       'FirstName': {
//         'required': 'Job FirstName is required',
//         'minlength': 'Job FirstName must be at least three characters.',
//         'maxlength': 'Job FirstName cannot exceed 50 characters.'
//       },
//       'LastName': {
//         'required': 'Director is required',
//         'minlength': 'Director must be at least 5 characters.',
//         'maxlength': 'Director cannot exceed 50 characters.'
//       },
//       'County': {
//         'range': 'Rate the job between 1 (lowest) and 5 (highest).'
//       }
//     };

//   }
//   ngOnInit(): void {
//     this.route.params.subscribe(
//       params => {
//         let id = params['id'];
//         this.getJob(id);
//       }
//     );

//   }
//   getJob(id: number) {
//     this.jobService.getJob(id)
//       .subscribe(
//       job => this.onJobRetrieved(job),
//       error => this.errorMessage = <any>error);
//   }
//   onJobRetrieved(job: IJob) {
//     var newJob = {
//             FirstName: '',
//             LastName: '',
//             County:'',
//             Address:''
//         }
//     this.newJob = newJob;

//       this.pageTitle = 'Add Job (Reactive)';
//     // if (this.job._id === 0) {
//     // } else {
//     //   this.pageTitle = `Edit Job (Reactive): ${this.job.FirstName}`;
//     // }

//     this.editForm = this.fb.group({
//       'FirstName': [newJob.FirstName, [Validators.required]],
//       'LastName': [newJob.LastName, [Validators.required]],
//       'County': [newJob.County, [Validators.required]],
//       'Address': [newJob.Address, [Validators.required]]
//     });

//     this.editForm.valueChanges
//       .subscribe(data => this.onValueChanged(data));

//   }
//   onValueChanged(data: any) {
//     for (let field in this.formError) {
//       if (this.formError.hasOwnProperty(field)) {
//         let hasError = this.editForm.controls[field].dirty &&
//           !this.editForm.controls[field].valid;
//         this.formError[field] = '';
//         if (hasError) {
//           for (let key in this.editForm.controls[field].errors) {
//             if (this.editForm.controls[field].errors.hasOwnProperty(key)) {
//               this.formError[field] += this.validationMessages[field][key] + ' ';
//             }
//           }
//         }
//       }
//     }
//   }
//   // saveJob() {
//   //   console.log(this.editForm);
//   //   if (this.editForm.dirty && this.editForm.valid) {
//   //     this.job = this.editForm.value;
//   //     alert(`Job: ${JSON.stringify(this.editForm.value)}`);
//   //   }
//   // }
//       saveJob(): void {
//         console.log("Add Form dirty : "+this.editForm.dirty);
//         console.log("Add Form valid : "+this.editForm.valid);
//         if (this.editForm.dirty && this.editForm.valid) {
//             // Copy the form values over the object values
//             const m = Object.assign({}, this.job, this.editForm.value);
//             console.log("job value : " + this.job);

//             this.jobService.saveJob(m).subscribe(
//                 () => this.onSaveComplete(),
//                 (error: any) => this.errorMessage = <any>error
//             );
//         } else if (!this.editForm.dirty) {
//         console.log("---Save Completed ---");
//             this.onSaveComplete();
//         }
//     }

//     onSaveComplete(): void {
//         // Reset the form to clear the flags
//         this.editForm.reset();
//         this.router.navigate(['/jobs']);
//     }
// }

