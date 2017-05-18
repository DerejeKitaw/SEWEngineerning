import { Component, OnInit } from '@angular/core';

import { IJob } from '../../shared/interfaces';
import { JobService } from '../job.service';

@Component({
  selector: 'sew-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
    pageTitle: string = 'Job List';
    listFilter: string;
    errorMessage: string;

    jobs: IJob[];

  constructor(private _jobService: JobService) { }

  ngOnInit(): void {
        this._jobService.getJobs()
                .subscribe(jobs =>{ this.jobs = jobs,
                console.log(this.jobs);  },
                           error => this.errorMessage = <any>error);
  
  }

}
