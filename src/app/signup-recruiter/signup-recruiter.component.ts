import { Component, OnInit } from '@angular/core';
import {User} from '../shared/models/user.model';
import {Recruiter} from '../shared/models/recruiter.model';
import {UserService} from '../shared/services/user.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-signup-recruiter',
  templateUrl: './signup-recruiter.component.html',
  styleUrls: ['./signup-recruiter.component.css']
})
export class SignupRecruiterComponent implements OnInit {

  user: User;
  recruiter: Recruiter;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor(private userService: UserService, private router: Router, private  toastr: ToastrService) { }

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
    return "url(https://vivoenunmundodelocos.files.wordpress.com/2017/04/estudiando1.jpg)";
  }

  OnSubmit(form: NgForm) {
    console.log(this.recruiter);
    this.userService.registerRecruiter(this.recruiter)
      .subscribe((data: any) => {
        console.log(data);
        if (data.token) {
          this.toastr.success('You are now registered as a recruiter!','Successful Registration !', {
            timeOut: 2000});
          this.resetForm(form);
          this.router.navigate(['/login']);}
        }, (err: HttpErrorResponse) => {
          this.toastr.error('Please Try again','Registration Failed !', {
            timeOut: 2000});
          this.resetForm(form);
          console.log(err);
        }
      );
  }

}
