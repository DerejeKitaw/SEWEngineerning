import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { IJob } from './job';

@Injectable()
export class JobService {

  //private _jobUrl = 'api/jobs/jobs.json';
  private _jobUrl = '/api/jobs';

  constructor(private _http: Http) { }

  getJobs(): Observable<IJob[]> {
    return this._http.get(this._jobUrl)
      .map((response: Response) => <IJob[]>response.json())
      //.do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getJob(id: number): Observable<IJob> {
    return this.getJobs()
      .map((jobs: IJob[]) => jobs.find(p => p._id === id));
  }

  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
