import {Component, OnInit} from '@angular/core';
import {RecruiterService} from '../shared/services/recruiter.service';
import {
  EducationBackground,
  EducationBackgroundModel,
  JobPostModel, JobSeekerModal,
  ResumeModel,
  WorkHistory,
  WorkHistoryModel
} from '../shared/models/recruiter.model';
import {CompanyModel} from '../shared/models/recruiter.model';
import {ActivatedRoute, Router} from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { map} from 'rxjs/operators';
import {CandidatService} from '../shared/services/candidat.service';
import {HttpErrorResponse} from '@angular/common/http';
import {from} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void' , style({ opacity: 0 })),
      transition('void <=> *', animate(1500))
    ]),
  ]
})
export class BlogComponent implements OnInit {

  config: any;
  companyDetails: CompanyModel;
  jobDetails: JobPostModel[] = [];
  visibleWork = [];
  visibleEduc = [];
  visibleRes = [];

  hideWork: any = {};
  hideEduc: any = {};

  isWorkVisible: boolean = false;
  isEducVisible: boolean = false;
  isSkillVisible: boolean = false;
  personalData: boolean = false;

  resume: ResumeModel;
  workHistory: WorkHistoryModel[] = [];
  educationBackground: EducationBackgroundModel[] = [];

  workHistoryForm: FormGroup;
  skillsForm: FormGroup;
  educationBackgroundForm: FormGroup;
  constructor(private fb:FormBuilder,
              private recruiterService: RecruiterService,
              public toastr: ToastrService,
              private candidatService: CandidatService,
              private route: ActivatedRoute,
              private router: Router,
              private spinner: NgxSpinnerService)
  {
    this.config = {
      currentPage: 1,
      itemsPerPage: 4
    };

    this.route.queryParamMap
      .pipe(map(params => params.get('page')))
      .subscribe(page => this.config.currentPage = page);
    this.skillsForm=this.fb.group({
      skills:['',[Validators.required]],
    });
    this.workHistoryForm=this.fb.group({
      company_name:[''],
      designation:[''],
      time_period: this.fb.group({fromDate:[''],toDate:['']}),
      job_description:['']
    });

    this.educationBackgroundForm=this.fb.group({
      institute_name:[''],
      degree:[''],
      time_period:this.fb.group({fromDate:[''],toDate:['']}),
    })
  }

  pageChange(newPage: number) {
    this.router.navigate(['/blog'], {queryParams: {page: newPage}});
  }

  ngOnInit() {

    this.resume = this.route.snapshot.data['resumeData'];
    this.skillsForm.get('skills').setValue(this.resume.skills);
    this.candidatService.deletedData.subscribe(resp => {
      this.candidatService.getWorks().subscribe(data => {
        this.workHistory = data;
      });
      this.candidatService.getEducations().subscribe(data => {
        this.educationBackground = data;
      });
    });

    this.candidatService.updatedResume.subscribe(response => {
      if (response) {
        this.candidatService.getResume().subscribe(data => {
          this.visibleRes[response.id] = !this.visibleRes[response.id];
          this.resume = data;
          let self = this;
          setTimeout(function () {
            self.visibleRes[response.id] = !self.visibleRes[response.id];
          }, 3000)
        });
      } else {
        this.candidatService.getResume().subscribe(data => {
          this.resume = data;
        });
      }
    },(err: HttpErrorResponse) => {
      console.log(err)
    });

    this.candidatService.updatedWork.subscribe(response => {
      if (response) {
        this.candidatService.getWorks().subscribe(data => {
          this.visibleWork[response.id] = !this.visibleWork[response.id];
          this.workHistory = data;
          let self = this;
          setTimeout(function () {
            self.visibleWork[response.id] = !self.visibleWork[response.id];
          }, 3000)
        });
      } else {
        this.candidatService.getWorks().subscribe(data => {
          this.workHistory = data;
        });
      }
    },(err: HttpErrorResponse) => {
      console.log(err)
    });

    this.candidatService.updatedEducation.subscribe(response => {
      if (response) {
        this.candidatService.getEducations().subscribe(data => {
          this.visibleEduc[response.id] = !this.visibleEduc[response.id];
          this.educationBackground = data;
          let self = this;
          setTimeout(function () {
            self.visibleEduc[response.id] = !self.visibleEduc[response.id];
          }, 3000)
        });
      } else {
        this.candidatService.getEducations().subscribe(data => {
          this.educationBackground = data;
        });
      }
    },(err: HttpErrorResponse) => {
      console.log(err)
    });
  }

  getUrl() {
    return 'url(https://vivoenunmundodelocos.files.wordpress.com/2017/04/estudiando1.jpg)';
  }

  updateWorkHistory(item: WorkHistory, id: number):void
  {
    item = this.workHistoryForm.value;
    this.candidatService.updateWorkHistory(item, id).subscribe( resp => {
      this.candidatService.editWork(resp);
    });
    this.hideWork[id] = !this.hideWork[id]

  }

  postWorkHistory() {
    let item = this.workHistoryForm.value;
    this.candidatService.postWorkHistory(item).subscribe( resp => {
      this.candidatService.editWork(resp);
    });
    this.isWorkVisible = false
  }

  addWorkHistory() {
    this.isWorkVisible = !this.isWorkVisible
  }

  deleteWorkHistory(id: number) {
    this.candidatService.deleteWorkHistory(id).subscribe(resp => {
      this.candidatService.deleteData(resp);
    })
  }

  updateEducationBackground(item: EducationBackground, id: number):void
  {
    item = this.educationBackgroundForm.value;
    this.candidatService.updateEducation(item, id).subscribe( resp => {
      this.candidatService.editEducation(resp);
    });
    this.hideEduc[id] = !this.hideEduc[id]

  }

  postEducationBackground() {
    let item = this.educationBackgroundForm.value;
    this.candidatService.postEducation(item).subscribe( resp => {
      this.candidatService.editEducation(resp);
    });
    this.isEducVisible = false
  }

  addEducationBackground() {
    this.isEducVisible = !this.isEducVisible
  }

  deleteEducationBackground(id: number) {
    this.candidatService.deleteEducation(id).subscribe(resp => {
      this.candidatService.deleteData(resp);
    })
  }

  updateSkills(id: number) {
    let skills = [];
    let SkillsData = from(this.skillsForm.value.skills);
    SkillsData.forEach(function(item){
      // @ts-ignore
      skills.push({name: item.name});
    });
    let resume = {
      resume_title: this.resume.resume_title,
      experience_level: this.resume.experience_level,
      carrier_objective: this.resume.carrier_objective,
      skills: skills
    };
    this.candidatService.updateResume(resume, id).subscribe(resp =>{
      this.candidatService.editResume(resp);
    });
    this.isSkillVisible = false
  }

  EvaluateMatching() {
    /** spinner starts on init */
    this.spinner.show();

    this.candidatService.evaluateResume().subscribe((resp) => {
      if(resp)
      {
        console.log(resp);
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 500);
        this.toastr.success('Your Resume Uploaded Successfully!', 'Success!',{timeOut: 2000});

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






// this.recruiterService.getJobs().subscribe( response => {
//   this.jobDetails = response;
//   console.log(this.jobDetails)
// });
// this.recruiterService.getRecruiter().subscribe( resp => {
//   this.companyDetails = resp;
//   this.logo = this.companyDetails.company_logo;
//   console.log(this.companyDetails)
// })
