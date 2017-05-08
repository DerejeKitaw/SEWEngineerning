import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './job-list/job-list.component';

import { JobService } from './job.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'jobs', component: JobListComponent }  ])
  ],
    providers: [JobService],
  declarations: [JobListComponent]
})
export class JobModule { }
