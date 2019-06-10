import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../shared/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  is_recruiter: boolean = false;
  is_jobSeeker: boolean = false;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.castedData.subscribe(data => {
      if (data) {
        // @ts-ignore
        this.is_recruiter = data.user.is_recruiter;
        // @ts-ignore
        this.is_jobSeeker = data.user.is_jobSeeker;
      }
    });
    if (this.getUserToken()) {
      this.userService.getUserClaims().subscribe( data=> {
        // @ts-ignore
        this.is_recruiter = data.is_recruiter;
        // @ts-ignore
        this.is_jobSeeker = data.is_jobSeeker;
      });
    }
  }

  getUserToken(): string {
    let userToken = (localStorage.getItem('userToken'));
    if (userToken == 'null') {
      userToken = null;
    }
    return userToken;
  }

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
}
