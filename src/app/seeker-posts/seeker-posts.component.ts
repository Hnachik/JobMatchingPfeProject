import { Component, OnInit } from '@angular/core';
import {RecruiterService} from '../shared/services/recruiter.service';
import {ToastrService} from 'ngx-toastr';
import {CandidatService} from '../shared/services/candidat.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatchedPostsModel} from '../shared/models/recruiter.model';

@Component({
  selector: 'app-seeker-posts',
  templateUrl: './seeker-posts.component.html',
  styleUrls: ['./seeker-posts.component.css']
})
export class SeekerPostsComponent implements OnInit {

  matchedPosts: MatchedPostsModel[] = [];
  constructor(private recruiterService: RecruiterService,
              public toastr: ToastrService,
              private candidatService: CandidatService,
              private route: ActivatedRoute,
              private router: Router,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.candidatService.getMatchedPosts().subscribe( data => {
      this.matchedPosts = data
    })
  }

  getUrl() {
    return 'url(https://vivoenunmundodelocos.files.wordpress.com/2017/04/estudiando1.jpg)';
  }
}
