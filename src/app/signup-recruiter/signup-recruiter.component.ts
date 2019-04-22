import { Component, OnInit } from '@angular/core';
import {User} from '../shared/user.model';
import {Recruiter} from '../shared/recruiter.model';
import {UserService} from '../shared/user.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-signup-recruiter',
  templateUrl: './signup-recruiter.component.html',
  styleUrls: ['./signup-recruiter.component.css']
})
export class SignupRecruiterComponent implements OnInit {

  user: User;
  recruiter: Recruiter;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.resetForm()
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.recruiter = {
      user: {
        username: '',
        email: '',
        password: ''
      },
      company_name: '',
      company_description: '',
      company_logo: '',
      address: ''
    };
  }

  getUrl() {
    return "url(src/assets/img/10.jpg)";
  }

  OnSubmit(form: NgForm) {
    console.log(this.recruiter);
    this.userService.registerUser(this.recruiter)
      .subscribe((data: any) => {
        console.log(data);
        if (data.token) {
          this.resetForm(form);
          this.router.navigate(['/login']);}
        }, (err: HttpErrorResponse) => {
          console.log(err);
        }
      );
  }

}
