import { Component, OnInit } from '@angular/core';
import {RecruiterService} from '../shared/services/recruiter.service';
import {ToastrService} from 'ngx-toastr';
import {CandidatService} from '../shared/services/candidat.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatchedPostsModel} from '../shared/models/recruiter.model';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-seeker-posts',
  templateUrl: './seeker-posts.component.html',
  styleUrls: ['./seeker-posts.component.css']
})
export class SeekerPostsComponent implements OnInit {
  config: any;
  matchedPosts: MatchedPostsModel[] = [];
  constructor(private recruiterService: RecruiterService,
              public toastr: ToastrService,
              private candidatService: CandidatService,
              private route: ActivatedRoute,
              private router: Router,
              private spinner: NgxSpinnerService) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 10
    };

    this.route.queryParamMap
      .pipe(map(params => params.get('page')))
      .subscribe(page => this.config.currentPage = page);
  }

  pageChange(newPage: number) {
    this.router.navigate(['/seeker-posts'], {queryParams: {page: newPage}});
  }

  ngOnInit() {
    this.candidatService.deletedData.subscribe(resp => {
      this.candidatService.getMatchedPosts().subscribe(data => {
        this.matchedPosts = data;
      });
    });
    this.candidatService.getMatchedPosts().subscribe( data => {
      this.matchedPosts = data
    })
  }

  deleteMatchedPost(id: number) {
    this.candidatService.deleteMatchedPost(id).subscribe(resp => {
      this.candidatService.deleteData(resp);
    })
  }

  viewDetailPost(id: number) {
    this.candidatService.getDetailMatchedJobs(id).subscribe( resp => {
      console.log(resp);
      this.candidatService.editData(resp);
    });
    this.router.navigate(['/job-single'], {queryParams: {id: id}});

  }

  getUrl() {
    return 'url(https://vivoenunmundodelocos.files.wordpress.com/2017/04/estudiando1.jpg)';
  }
}
