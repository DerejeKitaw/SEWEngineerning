import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { IJob } from '../job';
import { JobService } from '../job.service';


@Component({
  selector: 'sew-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.css']
})
export class JobAddComponent implements OnInit {
  pageTitle: string = 'Edit Job';
  editForm: FormGroup;
  formError: { [id: string]: string };
  private validationMessages: { [id: string]: { [id: string]: string } };
  job: IJob;
  newJob;
  errorMessage: string;

  constructor(private fb: FormBuilder,
    private jobService: JobService,
    private router: Router,
    private route: ActivatedRoute) {

    // Initialize strings
    this.formError = {
      'FirstName': '',
      'LastName': '',
      'County': ''
    };
    this.validationMessages = {
      'FirstName': {
        'required': 'Job FirstName is required',
        'minlength': 'Job FirstName must be at least three characters.',
        'maxlength': 'Job FirstName cannot exceed 50 characters.'
      },
      'LastName': {
        'required': 'Director is required',
        'minlength': 'Director must be at least 5 characters.',
        'maxlength': 'Director cannot exceed 50 characters.'
      },
      'County': {
        'range': 'Rate the job between 1 (lowest) and 5 (highest).'
      }
    };

  }
  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        let id = params['id'];
        this.getJob(id);
      }
    );

  }
  getJob(id: number) {
    this.jobService.getJob(id)
      .subscribe(
      job => this.onJobRetrieved(job),
      error => this.errorMessage = <any>error);
  }
  onJobRetrieved(job: IJob) {
    var newJob = {
            FirstName: '',
            LastName: '',
            County:'',
            Address:''
        }
    this.newJob = newJob;

      this.pageTitle = 'Add Job (Reactive)';
    // if (this.job._id === 0) {
    // } else {
    //   this.pageTitle = `Edit Job (Reactive): ${this.job.FirstName}`;
    // }

    this.editForm = this.fb.group({
      'FirstName': [newJob.FirstName, [Validators.required]],
      'LastName': [newJob.LastName, [Validators.required]],
      'County': [newJob.County, [Validators.required]],
      'Address': [newJob.Address, [Validators.required]]
    });

    this.editForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

  }
  onValueChanged(data: any) {
    for (let field in this.formError) {
      if (this.formError.hasOwnProperty(field)) {
        let hasError = this.editForm.controls[field].dirty &&
          !this.editForm.controls[field].valid;
        this.formError[field] = '';
        if (hasError) {
          for (let key in this.editForm.controls[field].errors) {
            if (this.editForm.controls[field].errors.hasOwnProperty(key)) {
              this.formError[field] += this.validationMessages[field][key] + ' ';
            }
          }
        }
      }
    }
  }
  // saveJob() {
  //   console.log(this.editForm);
  //   if (this.editForm.dirty && this.editForm.valid) {
  //     this.job = this.editForm.value;
  //     alert(`Job: ${JSON.stringify(this.editForm.value)}`);
  //   }
  // }
      saveJob(): void {
        console.log("Add Form dirty : "+this.editForm.dirty);
        console.log("Add Form valid : "+this.editForm.valid);
        if (this.editForm.dirty && this.editForm.valid) {
            // Copy the form values over the object values
            const m = Object.assign({}, this.job, this.editForm.value);
            console.log("job value : " + this.job);

            this.jobService.saveJob(m).subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
            );
        } else if (!this.editForm.dirty) {
        console.log("---Save Completed ---");
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.editForm.reset();
        this.router.navigate(['/jobs']);
    }
}
