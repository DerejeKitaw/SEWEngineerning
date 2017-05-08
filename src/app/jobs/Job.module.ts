import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//import { CommonModule } from '@angular/common';
import { JobListComponent } from './job-list/job-list.component';

@NgModule({
  imports: [
    //CommonModule,
    RouterModule.forChild([
      { path: 'jobs', component: JobListComponent }  ])
  ],
  declarations: [JobListComponent]
})
export class JobModule { }
