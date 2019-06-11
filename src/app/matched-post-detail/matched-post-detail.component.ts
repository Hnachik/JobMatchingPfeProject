import { Component, OnInit } from '@angular/core';
import {JobPostModel, MatchedPostsModel, Recruiter} from '../shared/models/recruiter.model';
import {CandidatService} from '../shared/services/candidat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-matched-post-detail',
  templateUrl: './matched-post-detail.component.html',
  styleUrls: ['./matched-post-detail.component.css']
})
export class MatchedPostDetailComponent implements OnInit {

  jobpost: MatchedPostsModel;
  constructor(private candidatService: CandidatService,
              private route: ActivatedRoute) { }

  viewDetailPost() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.candidatService.getDetailMatchedJobs(id).subscribe( resp =>
      this.jobpost = resp
    );
  }

  AjouterFavori(post: MatchedPostsModel) {
    console.log(post)
  }

  ngOnInit() {
    this.viewDetailPost();
    console.log(this.jobpost);
  }

  getUrl() {
    return 'url(https://vivoenunmundodelocos.files.wordpress.com/2017/04/estudiando1.jpg)';
  }

}
