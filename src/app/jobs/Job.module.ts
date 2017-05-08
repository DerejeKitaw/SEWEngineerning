import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './job-list/job-list.component';
import { JobDetailComponent } from './job-detail/job-detail.component';


import { JobService } from './job.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'jobs', component: JobListComponent },
      { path: 'job/:id',

        component: JobDetailComponent
      }  ])
  ],
    providers: [JobService],
  declarations: [JobListComponent, JobDetailComponent]
})
export class JobModule { }
