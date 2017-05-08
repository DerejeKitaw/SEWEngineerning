import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { Subscription }       from 'rxjs/Subscription';

import { IJob } from '../job';
import { JobService } from '../job.service';
@Component({
  selector: 'sew-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
pageTitle: string = 'Job Detail';
    job: IJob;
    jobparam;
    errorMessage: string;
    private sub: Subscription;

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _jobService: JobService) {
    }
  

  ngOnInit() {
    this.sub = this._route.params.subscribe(
            params => {
              //console.log(params['id']);
                let id = params['id'];
                this.getJob(id);

        });
  }
   ngOnDestroy() {
        this.sub.unsubscribe();
    }
getJob(id: number) {
        this._jobService.getJob(id).subscribe(
            job => this.job = job,
            error => this.errorMessage = <any>error);
           
    }
     onBack(): void {
        this._router.navigate(['/jobs']);
    }
}
