import { Component, OnInit } from '@angular/core';
import {User} from '../shared/models/user.model';
import {JobSeeker} from '../shared/models/recruiter.model';
import {UserService} from '../shared/services/user.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-signup-jobseeker',
  templateUrl: './signup-jobseeker.component.html',
  styleUrls: ['./signup-jobseeker.component.css']
})
export class SignupJobseekerComponent implements OnInit {

  user: User;
  jobseeker: JobSeeker;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor(private userService: UserService, private router: Router, private  toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm()
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.jobseeker = {
      user: {
        username: '',
        email: '',
        password: ''
      },
      first_name: '',
      last_name: '',
      phone_number: null,
      address: '',
      about: ''
    };
  }

  getUrl() {
    return "url(https://vivoenunmundodelocos.files.wordpress.com/2017/04/estudiando1.jpg)";
  }

  OnSubmit(form: NgForm) {
    console.log(this.jobseeker);
    this.userService.registerSeeker(this.jobseeker)
      .subscribe((data: any) => {
          console.log(data);
          if (data.token) {
            this.toastr.success('You are now registered as a Job Seeker!','Successful Registration !', {
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
