import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {CompanyModel, JobPost, JobPostModel, WorkHistoryModel} from '../models/recruiter.model';

@Injectable()
export class RecruiterService {

  // @ts-ignore
  private data: BehaviorSubject<JobPostModel> = new BehaviorSubject<JobPostModel>();
  castedData = this.data.asObservable();

  readonly rootUrl = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient) { }

  postJob(post: JobPost) {
    console.log(post);
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'token ' + localStorage.getItem('userToken')});
    return this.http.post(this.rootUrl + '/api/recruiter/jobpost/add/', post,{ headers : reqHeader});
  }

  getJobs(): Observable<JobPostModel[]> {
    const reqHeader = new HttpHeaders({'Authorization': 'token ' + localStorage.getItem('userToken')});
    return  this.http.get<JobPostModel[]>(this.rootUrl + '/api/recruiter/jobposts/', { headers: reqHeader });
  }

  getAllJobs(): Observable<JobPostModel[]> {
    return  this.http.get<JobPostModel[]>(this.rootUrl + '/api/recruiter/allposts/');
  }

  getAllDetailJobs(id: number): Observable<JobPostModel> {
    return  this.http.get<JobPostModel>(`${this.rootUrl}/api/recruiter/allposts/${id}/`);
  }

  getRecruiter(): Observable<CompanyModel> {
    const reqHeader = new HttpHeaders({'Authorization': 'token ' + localStorage.getItem('userToken')});
    return  this.http.get<CompanyModel>(this.rootUrl + '/api/recruiter/', { headers: reqHeader });
  }

  editData(data) {
    this.data.next(data)
  }

  evaluateResume(): Observable<any> {
    const reqHeader = new HttpHeaders({'Authorization': 'token ' + localStorage.getItem('userToken')});
    return  this.http.get<any>(`${this.rootUrl}/api/recruiter/post/evaluate/`, { headers: reqHeader });
  }
}
