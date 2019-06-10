import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {RecruiterService} from '../shared/services/recruiter.service';
import {ToastrService} from 'ngx-toastr';
import {from} from 'rxjs/internal/observable/from';


@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {

  jobRegistrationForm: FormGroup;

  constructor(private fb:FormBuilder,
              private recruiterService: RecruiterService,
              private toastr: ToastrService,
              private router: Router)
  {
    this.jobRegistrationForm=this.fb.group({
      job_title:['',[Validators.required, Validators.minLength(3)]],
      post_url: ['',[Validators.required]],
      job_description:['',[Validators.required]],
      job_requirements:['',[Validators.required]],
      publication_date:[''],
      expiration_date:[''],
      location:['',[Validators.required]],
      job_type:[''],
      category_set: [''],
    });

  }

  ngOnInit() {
  }

  save(): void {
    let category_set = [];
    let postJobData = from(this.jobRegistrationForm.value.category_set);
    postJobData.forEach(function(item){
      // @ts-ignore
      category_set.push({category_name: item.category_name});
    });
    this.jobRegistrationForm.value.category_set = category_set;
    this.recruiterService.postJob(this.jobRegistrationForm.value).subscribe((resp) => {
      console.log(resp);
      if(resp)
      {
        this.jobRegistrationForm.reset();
        this.toastr.success('Your Resume Uploaded Successfully!', 'Success!',{
          timeOut: 3000});
      }
      else {
        this.toastr.error('Failed to add resume!', 'Post Resume',{
          timeOut: 3000});
      }

    });
  }
  clear(): void {
    console.log(this.jobRegistrationForm.value);
    this.jobRegistrationForm.reset();
  }

  getUrl() {
    return 'url(https://vivoenunmundodelocos.files.wordpress.com/2017/04/estudiando1.jpg)';
  }
}
