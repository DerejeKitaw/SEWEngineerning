import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './job-list/job-list.component';
import { JobDetailComponent } from './job-detail/job-detail.component';


import { JobService } from './job.service';
import { JobEditComponent } from './job-edit/job-edit.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'jobs', component: JobListComponent },
      { path: 'job/:id', component: JobDetailComponent},
      { path: 'jobs/:id/edit', component: JobEditComponent },
        ])
  ],
    providers: [JobService],
  declarations: [JobListComponent, JobDetailComponent, JobEditComponent]
})
export class JobModule { }
