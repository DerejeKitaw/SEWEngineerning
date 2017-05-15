import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './job-list/job-list.component';
import { JobDetailComponent } from './job-detail/job-detail.component';

import { ReactiveFormsModule } from '@angular/forms';

import { JobService } from './job.service';
import { JobEditComponent } from './job-edit/job-edit.component';
import { JobAddComponent } from './job-add/job-add.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'jobs', component: JobListComponent },
      { path: 'job/:id', component: JobDetailComponent},
      { path: 'jobs/:id/edit', component: JobEditComponent },
      { path: 'jobs/:id/add', component: JobAddComponent },
        ])
  ],
    providers: [JobService],
  declarations: [JobListComponent, JobDetailComponent, JobEditComponent, JobAddComponent]
})
export class JobModule { }
