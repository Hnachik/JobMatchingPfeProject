import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {JobSingleComponent} from './job-single/job-single.component';
import {JobListingComponent} from './job-listing/job-listing.component';
import {ContactComponent} from './contact/contact.component';
import {AboutComponent} from './about/about.component';
import {PostJobComponent} from './post-job/post-job.component';
import {HomeComponent} from './home/home.component';
import {BlogComponent} from './blog/blog.component';
import {LoginComponent} from './login/login.component';
import {SignupRecruiterComponent} from './signup-recruiter/signup-recruiter.component';
import {SignupJobseekerComponent} from './signup-jobseeker/signup-jobseeker.component';
import {PostResumeComponent} from './post-resume/post-resume.component';
import {ResumeResolve} from './shared/resolvers/resume.resolve';
import {SeekerPostsComponent} from './seeker-posts/seeker-posts.component';

import { MatchedPostDetailComponent } from './matched-post-detail/matched-post-detail.component';
import {RecruiterProfileComponent} from './recruiter-profile/recruiter-profile.component';

import { MatchedPostResumeComponent } from './matched-post-resume/matched-post-resume.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'job-single', component: JobSingleComponent},
  { path: 'job-listing', component: JobListingComponent },
  { path: 'contact', component: ContactComponent},
  { path: 'about', component: AboutComponent },
  { path: 'seeker-posts', component: SeekerPostsComponent},
  { path: 'matched-post-resume', component: MatchedPostResumeComponent},
  { path: 'profile-recruiter', component: RecruiterProfileComponent},
  { path: 'post-job', component: PostJobComponent},
  { path: 'matched-post-detail/:id', component: MatchedPostDetailComponent},
  { path: 'profile', component: BlogComponent, resolve: {
      resumeData: ResumeResolve}
      },
  { path: 'login', component: LoginComponent},
  { path: 'signup-jobseeker', component: SignupJobseekerComponent},
  { path: 'signup-recruiter', component: SignupRecruiterComponent},
  { path: 'post-resume', component: PostResumeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
