import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserService} from '../shared/services/user.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authenticationForm: FormGroup;

  constructor(private fb:FormBuilder,
              private userService: UserService,
              private router: Router,
              private toastr: ToastrService)
  {
    this.authenticationForm=this.fb.group({
      username:['',[Validators.required, Validators.minLength(3)]],
      password:['',[Validators.required, Validators.minLength(8)]],
    })
  }

  ngOnInit() {
  }

  OnSubmit() {
    let fields = this.authenticationForm.value;
    this.userService.userAuthentication(fields).subscribe((data: any) => {
        this.toastr.success('You are now Login !','Successful authentication !', {
          timeOut: 2000});

        if (data.user.is_jobSeeker) {
          this.router.navigate(['/post-resume']);
        } else {
          this.router.navigate(['/post-job']);
        }
        localStorage.setItem('userToken', data.token);
        this.userService.editData(data);
        },
      (err: HttpErrorResponse) => {
        this.toastr.error('Please check your username or password !','Unsuccessful authentication !', {
          timeOut: 3000});
        this.authenticationForm.reset();
        console.log(err);
      });
  }

  getUrl() {
    return 'url(https://vivoenunmundodelocos.files.wordpress.com/2017/04/estudiando1.jpg)';
  }

}
