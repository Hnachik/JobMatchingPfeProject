import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {JobSeeker, Recruiter} from '../models/recruiter.model';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class UserService {
  // @ts-ignore
  private data = new BehaviorSubject<any>();
  castedData = this.data.asObservable();

  readonly rootUrl = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient) { }

  registerRecruiter(recruiter: Recruiter) {
    const body: Recruiter = {
      user: {
        username: recruiter.user.username,
        email: recruiter.user.email,
        password: recruiter.user.password,
      },
      company_name: recruiter.company_name,
      company_description: recruiter.company_description,
      company_logo: recruiter.company_logo,
      address: recruiter.address
    };
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.rootUrl + '/api/auth/register/recruiter', body, { headers : reqHeader});
  }

  registerSeeker(seeker: JobSeeker) {
    const body: JobSeeker = {
      user: {
        username: seeker.user.username,
        email: seeker.user.email,
        password: seeker.user.password,
      },
      first_name: seeker.first_name,
      last_name: seeker.last_name,
      phone_number: seeker.phone_number,
      address: seeker.address,
      about: seeker.about
    };
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.rootUrl + '/api/auth/register/jobseeker', body, { headers : reqHeader});
  }

  userAuthentication(fields) {
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.rootUrl + '/api/auth/login', fields, { headers: reqHeader });

  }

  getUserClaims() {
    const reqHeader = new HttpHeaders({'Authorization': 'token ' + localStorage.getItem('userToken')});
    return  this.http.get(this.rootUrl + '/api/auth/user', { headers: reqHeader });
  }

  editData(data) {
    this.data.next(data)
  }
}
