import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { IJob } from '../shared/interfaces';

@Injectable()
export class JobService {

  //private _baseUrl = 'api/jobs/jobs.json';
  private _baseUrl = '/api/job';

  constructor(private _http: Http) { }

  getJobs(): Observable<IJob[]> {
    return this._http.get(this._baseUrl + 's')
      .map((response: Response) => <IJob[]>response.json())
      //.do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getJob(id: string): Observable<IJob> {
    return this.getJobs()
      .map((jobs: IJob[]) => jobs.find(p => p._id === id));
  }
  updateJob(job: IJob): Observable<IJob> {
    return this._http.put(this._baseUrl + '/' + job._id, job)
      .map((res: Response) => {
        const data = res.json();
        console.log('updateJob status: ' + data.status);
        return data.job;
      })
      .catch(this.handleError);
  }
  insertJob(job: IJob): Observable<IJob> {
    return this._http.post(this._baseUrl, job)
      .map((res: Response) => {
        const data = res.json();
        console.log('insertJob status: ' + data.status);
        return data.job;
      })
      .catch(this.handleError);
  }
  deleteJob(id: string): Observable<boolean> {
    return this._http.delete(this._baseUrl + '/' + id)
      .map((res: Response) => res.json().status)
      .catch(this.handleError);
  }
  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
