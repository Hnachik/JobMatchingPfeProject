import {Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {LoaderService} from '../shared/services/loader.service';
import {from} from 'rxjs';
import {CandidatService} from '../shared/services/candidat.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-post-resume',
  templateUrl: './post-resume.component.html',
  styleUrls: ['./post-resume.component.css']
})
export class PostResumeComponent implements OnInit {

  showLoader: boolean = false;
  postResumeForm: FormGroup;

  get work_history(): FormArray{
    return <FormArray>this.postResumeForm.get('work_history');
  }
  get education_background(): FormArray{
    return <FormArray>this.postResumeForm.get('education_background');
  }
  constructor(private fb:FormBuilder,
              private candidatService: CandidatService,
              public toastr: ToastrService)
  {
    this.postResumeForm=this.fb.group({
      resume_title:['',[Validators.required,Validators.minLength(3)]],
      experience_level:['',[Validators.required]],
      carrier_objective:['',[Validators.required]],
      work_history: this.fb.array([this.buildWorkHistory()]),
      education_background:this.fb.array([this.buildEducationBackground()]),
      skills:[''],
    })
  }

  ngOnInit() {
  }

  buildWorkHistory(): FormGroup {
    return this.fb.group({
      company_name:[''],
      designation:[''],
      time_period:this.fb.group({fromDate:[''],toDate:['']}),
      job_description:['']
    });
  }
  buildEducationBackground(): FormGroup {
    return this.fb.group({
      institute_name:[''],
      degree:[''],
      time_period:this.fb.group({fromDate:[''],toDate:['']}),
    });
  }

  addWorkHistory(): void {
    this.work_history.push(this.buildWorkHistory());
  }
  deleteWorkHistory(index:number):void{
    this.work_history.removeAt(index);
  }

  addEducationBackground(): void {
    this.education_background.push(this.buildEducationBackground());
  }

  deleteEducationBackground(index:number): void {
    this.education_background.removeAt(index);
  }

  save():void {
    let skills = [];
    let SkillsData = from(this.postResumeForm.value.skills);
    SkillsData.forEach(function(item){
      // @ts-ignore
      skills.push({name: item.name});
    });
    this.postResumeForm.value.skills = skills;

    this.candidatService.postResume(this.postResumeForm.value).subscribe((resp) => {
      if(resp) {
        this.postResumeForm.reset();
        this.toastr.success('Your Resume Uploaded Successfully!', 'Success!',{timeOut: 2000});
      }
      else {
        this.toastr.error('Failed to add resume!', 'Post Resume',{timeOut: 2000});
      }

    });
  }

  clear():void {
    this.postResumeForm.reset();
  }

  getUrl() {
    return 'url(https://vivoenunmundodelocos.files.wordpress.com/2017/04/estudiando1.jpg)';
  }

}
