import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {
  CompanyModel, EducationBackground,
  EducationBackgroundModel,
  JobPostModel, JobSeekerModal, MatchedPostsModel,
  Resume,
  ResumeModel, ResumeUpdateModel,
  WorkHistory,
  WorkHistoryModel,
} from '../models/recruiter.model';

@Injectable()
export class CandidatService {
  // @ts-ignore
  private resumeData: BehaviorSubject<Resume>= new BehaviorSubject<WorkHistoryModel>();
  // @ts-ignore
  private workData: BehaviorSubject<WorkHistoryModel>= new BehaviorSubject<WorkHistoryModel>();
  // @ts-ignore
  private educData: BehaviorSubject<EducationBackgroundModel>= new BehaviorSubject<EducationBackgroundModel>();
  // @ts-ignore
  private data: BehaviorSubject<any>= new BehaviorSubject<any>();
  updatedWork = this.workData.asObservable();
  updatedEducation = this.educData.asObservable();
  updatedResume = this.resumeData.asObservable();
  deletedData = this.data.asObservable();

  readonly rootUrl = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient) { }

  editWork(data) {
    this.workData.next(data)
  }

  editEducation(data) {
    this.educData.next(data)
  }

  editResume(data) {
    this.resumeData.next(data)
  }

  deleteData(data) {
    this.data.next(data)
  }

  evaluateResume(): Observable<any> {
    const reqHeader = new HttpHeaders({'Authorization': 'token ' + localStorage.getItem('userToken')});
    return  this.http.get<any>(`${this.rootUrl}/api/jobseeker/resume/evaluate/`, { headers: reqHeader });
  }

  getResume(): Observable<ResumeModel> {
    const reqHeader = new HttpHeaders({'Authorization': 'token ' + localStorage.getItem('userToken')});
    return  this.http.get<ResumeModel>(`${this.rootUrl}/api/jobseeker/resume/`, { headers: reqHeader });
  }

  updateResume(resume: ResumeUpdateModel, id: number) {
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'token ' + localStorage.getItem('userToken')});
    return this.http.put(`${this.rootUrl}/api/jobseeker/resume/${id}/`, resume,{ headers : reqHeader});
  }

  postResume(resume: Resume) {
    console.log(resume);
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'token ' + localStorage.getItem('userToken')});
    return this.http.post(`${this.rootUrl}/api/jobseeker/resume/add/`, resume,{ headers : reqHeader});
  }

  getJobSeeker(): Observable<JobSeekerModal> {
    const reqHeader = new HttpHeaders({'Authorization': 'token ' + localStorage.getItem('userToken')});
    return  this.http.get<JobSeekerModal>(`${this.rootUrl}/api/jobseeker/`, { headers: reqHeader });
  }

  getWorks(): Observable<WorkHistoryModel[]> {
    const reqHeader = new HttpHeaders({'Authorization': 'token ' + localStorage.getItem('userToken')});
    return  this.http.get<WorkHistoryModel[]>(`${this.rootUrl}/api/jobseeker/whistory/`, { headers: reqHeader });
  }

  getEducations(): Observable<EducationBackgroundModel[]> {
    const reqHeader = new HttpHeaders({'Authorization': 'token ' + localStorage.getItem('userToken')});
    return  this.http.get<EducationBackgroundModel[]>(`${this.rootUrl}/api/jobseeker/education/`, { headers: reqHeader });
  }

  getWorkHistoryById(id: number): Observable<WorkHistoryModel> {
    const reqHeader = new HttpHeaders({'Authorization': 'token ' + localStorage.getItem('userToken')});
    return  this.http.get<WorkHistoryModel>(`${this.rootUrl}/api/jobseeker/whistory/${id}/`, { headers: reqHeader });
  }

  getEducationById(id: number): Observable<EducationBackgroundModel> {
    const reqHeader = new HttpHeaders({'Authorization': 'token ' + localStorage.getItem('userToken')});
    return  this.http.get<EducationBackgroundModel>(`${this.rootUrl}/api/jobseeker/education/${id}/`, { headers: reqHeader });
  }

  updateEducation(educ: EducationBackground, id: number) {
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'token ' + localStorage.getItem('userToken')});
    return  this.http.put(`${this.rootUrl}/api/jobseeker/education/${id}/`, educ, { headers: reqHeader });
  }

  updateWorkHistory(whistory: WorkHistory, id: number) {
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'token ' + localStorage.getItem('userToken')});
    return  this.http.put(`${this.rootUrl}/api/jobseeker/whistory/${id}/`, whistory, { headers: reqHeader });
  }

  postEducation(educ: EducationBackground) {
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'token ' + localStorage.getItem('userToken')});
    return  this.http.post(`${this.rootUrl}/api/jobseeker/education/add/`, educ, { headers: reqHeader });
  }

  postWorkHistory(whistory: WorkHistory) {
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'token ' + localStorage.getItem('userToken')});
    return  this.http.post(`${this.rootUrl}/api/jobseeker/whistory/add/`, whistory, { headers: reqHeader });
  }

  deleteEducation(id: number) {
    const reqHeader = new HttpHeaders({'Authorization': 'token ' + localStorage.getItem('userToken')});
    return  this.http.delete(`${this.rootUrl}/api/jobseeker/education/${id}/`,{ headers: reqHeader });
  }

  deleteWorkHistory(id: number) {
    const reqHeader = new HttpHeaders({'Authorization': 'token ' + localStorage.getItem('userToken')});
    return  this.http.delete(`${this.rootUrl}/api/jobseeker/whistory/${id}/`,{ headers: reqHeader });
  }

  getMatchedPosts(): Observable<MatchedPostsModel[]> {
    const reqHeader = new HttpHeaders({'Authorization': 'token ' + localStorage.getItem('userToken')});
    return  this.http.get<MatchedPostsModel[]>(`${this.rootUrl}/api/jobseeker/resume/matched-posts/`, { headers: reqHeader });
  }
}
