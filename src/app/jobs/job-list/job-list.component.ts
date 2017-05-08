import { Component, OnInit } from '@angular/core';
import { IJob } from '../job';

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
  constructor() { }

  ngOnInit() {
  }

}
