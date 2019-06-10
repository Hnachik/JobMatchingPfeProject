import { Component, OnInit } from '@angular/core';
import {RecruiterService} from '../shared/services/recruiter.service';
import {JobPostModel, Recruiter} from '../shared/models/recruiter.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-job-single',
  templateUrl: './job-single.component.html',
  styleUrls: ['./job-single.component.css']
})
export class JobSingleComponent implements OnInit {

  jobpost: JobPostModel;
  recruiter: Recruiter;
  constructor(private recruiterService: RecruiterService) { }

  ngOnInit() {
    this.recruiterService.castedData.subscribe(data => {
      if (data) {
        this.jobpost = data
      }
    });
  }

  getUrl() {
    return 'url(https://vivoenunmundodelocos.files.wordpress.com/2017/04/estudiando1.jpg)';
  }


}
