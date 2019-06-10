import { Component, OnInit } from '@angular/core';
import {RecruiterService} from '../shared/services/recruiter.service';
import {JobPostModel} from '../shared/models/recruiter.model';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  config: any;

  posts: JobPostModel[] = [];
  constructor(private recruiterService: RecruiterService,private route: ActivatedRoute,
              private router: Router) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 4
    };

    this.route.queryParamMap
      .pipe(map(params => params.get('page')))
      .subscribe(page => this.config.currentPage = page);
  }

  pageChange(newPage: number) {
    this.router.navigate(['/home'], {queryParams: {page: newPage}});
  }

  ngOnInit() {
    this.recruiterService.getAllJobs().subscribe( resp =>{
      this.posts = resp
    })
  }

  viewDetailPost(id: number) {
    this.router.navigate(['/job-single'], {queryParams: {id: id}});
    this.recruiterService.getAllDetailJobs(id).subscribe( resp =>{
      this.recruiterService.editData(resp);
    })
  }

  getUrl() {
    return 'url(https://vivoenunmundodelocos.files.wordpress.com/2017/04/estudiando1.jpg)';
  }

}
