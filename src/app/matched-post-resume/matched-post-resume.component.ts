import { Component, OnInit } from '@angular/core';
import {JobPostModel, Recruiter} from '../shared/models/recruiter.model';
import {RecruiterService} from '../shared/services/recruiter.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-matched-post-resume',
  templateUrl: './matched-post-resume.component.html',
  styleUrls: ['./matched-post-resume.component.css']
})
export class MatchedPostResumeComponent implements OnInit {

  jobpost: JobPostModel;
  recruiter: Recruiter;
  constructor(private recruiterService: RecruiterService,
  private spinner: NgxSpinnerService, public toastr: ToastrService) { }

  ngOnInit() {
    this.recruiterService.castedData.subscribe(data => {
      console.log(data);
      if (data) {
        this.jobpost = data
      }
    });
  }

  getUrl() {
    return 'url(https://vivoenunmundodelocos.files.wordpress.com/2017/04/estudiando1.jpg)';
  }

  EvaluateMatching() {
    /** spinner starts on init */
    this.spinner.show();

    this.recruiterService.evaluateResume().subscribe((resp) => {
      if(resp)
      {
        console.log(resp);
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 500);
        this.toastr.success('1 resume matches this post', 'great!!!',{timeOut: 2000});

      }
      else{
        console.log(resp);
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 500);
        this.toastr.error('Failed to add resume!', 'Post Resume',{timeOut: 2000});
      }
    });
  }

}
