import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { IJob } from './job';

@Injectable()
export class JobService {

  //private _jobUrls = 'api/jobs/jobs.json';
  private _jobUrls = '/api/jobs';
  private _jobUrl = '/api/job';

  constructor(private _http: Http) { }

  getJobs(): Observable<IJob[]> {
    return this._http.get(this._jobUrls)
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

      saveJob(job: IJob): Observable<IJob> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        // if (job.id === 0) {
        //     return this.createJob(job, options);
        // }
        return this.updateJob(job, options);
    }

       private updateJob(job: IJob, options: RequestOptions): Observable<IJob> {
        const url = `${this._jobUrl}/${job._id}`;
        return this._http.put(url, job, options)
            .map(() => job)
            //.do(data => console.log('updateJob: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
}
