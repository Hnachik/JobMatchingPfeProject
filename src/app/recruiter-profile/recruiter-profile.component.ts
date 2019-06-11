import { Component, OnInit } from '@angular/core';
import {CompanyModel, JobPostModel, Recruiter} from '../shared/models/recruiter.model';
import {RecruiterService} from '../shared/services/recruiter.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-recruiter-profile',
  templateUrl: './recruiter-profile.component.html',
  styleUrls: ['./recruiter-profile.component.css']
})
export class RecruiterProfileComponent implements OnInit {

  config: any;
  recruiter: CompanyModel;
  posts: JobPostModel[] = [];
  constructor(private recruiterService: RecruiterService,private route: ActivatedRoute,
              private router: Router) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 10
    };

    this.route.queryParamMap
      .pipe(map(params => params.get('page')))
      .subscribe(page => this.config.currentPage = page);
  }

  pageChange(newPage: number) {
    this.router.navigate(['/home'], {queryParams: {page: newPage}});
  }

  viewDetailPost(id: number) {
    this.router.navigate(['/matched-post-resume'], {queryParams: {id: id}});
    this.recruiterService.getAllDetailJobs(id).subscribe( resp =>{
      this.recruiterService.editData(resp);
    })
  }

  ngOnInit() {
    this.recruiterService.getJobs().subscribe(response =>{
      this.posts = response
    });
    this.recruiterService.getRecruiter().subscribe(response =>{
      this.recruiter = response
    })
  }

  getUrl() {
    return 'url(https://vivoenunmundodelocos.files.wordpress.com/2017/04/estudiando1.jpg)';
  }

}
