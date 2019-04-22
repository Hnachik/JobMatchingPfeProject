import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginError = false;
  isLoginSucess = false;
  errorMsg = '';
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  OnSubmit(username, password) {
    this.userService.userAuthentication(username, password).subscribe((data: any) => {
      console.log(data);
        localStorage.setItem('userToken', data.token);
        this.isLoginSucess = true;
        this.router.navigate(['/home']);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.errorMsg = '';
        this.isLoginError = true;
      });
  }

  getUrl() {
    return 'url(https://images6.alphacoders.com/386/386231.jpg)';
  }

}
