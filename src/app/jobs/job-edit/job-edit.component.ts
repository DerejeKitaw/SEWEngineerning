import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { IJob } from '../job';
import { JobService } from '../job.service';


@Component({
  selector: 'sew-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {
  pageTitle: string = 'Edit Job';
  editForm: FormGroup;
  formError: { [id: string]: string };
  private validationMessages: { [id: string]: { [id: string]: string } };
  job: IJob;
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
    this.job = job;

    if (this.job._id === 0) {
      this.pageTitle = 'Add Job (Reactive)';
    } else {
      this.pageTitle = `Edit Job (Reactive): ${this.job.FirstName}`;
    }

    this.editForm = this.fb.group({
      'FirstName': [this.job.FirstName, [Validators.required]],
      'LastName': [this.job.LastName, [Validators.required]],
      'County': [this.job.LastName, [Validators.required]]
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
  saveJob() {
    console.log(this.editForm);
    if (this.editForm.dirty && this.editForm.valid) {
      this.job = this.editForm.value;
      alert(`Job: ${JSON.stringify(this.editForm.value)}`);
    }
  }
}
