import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Recruiter} from './recruiter.model';

@Injectable()
export class UserService {
  readonly rootUrl = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient) { }

  registerUser(recruiter: Recruiter) {
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
    return this.http.post(this.rootUrl + '/api/auth/recruiter', body, { headers : reqHeader});
  }

  userAuthentication(username, password) {
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.rootUrl + '/api/auth/login', {username, password}, { headers: reqHeader });
  }

  getUserClaims() {
    const reqHeader = new HttpHeaders({'Authorization': 'token ' + localStorage.getItem('userToken')});
    return  this.http.get(this.rootUrl + '/api/recruiter/', { headers: reqHeader });
  }
}
