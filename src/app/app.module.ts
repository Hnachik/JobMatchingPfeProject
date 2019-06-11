import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { TagInputModule } from 'ngx-chips';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { JobListingComponent } from './job-listing/job-listing.component';
import { JobSingleComponent } from './job-single/job-single.component';
import { PostJobComponent } from './post-job/post-job.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { BlogComponent } from './blog/blog.component';
import { LoginComponent } from './login/login.component';
import {UserService} from './shared/services/user.service';
import { SignupRecruiterComponent } from './signup-recruiter/signup-recruiter.component';
import { SignupJobseekerComponent } from './signup-jobseeker/signup-jobseeker.component';
import {AuthGuard} from './auth/auth.guard';
import { PostResumeComponent } from './post-resume/post-resume.component';
import {LoaderService} from './shared/services/loader.service';
import {RestrictTodayDirective} from './restrict-today.directive';
import {RecruiterService} from './shared/services/recruiter.service';
import {CandidatService} from './shared/services/candidat.service';
import {ResumeResolve} from './shared/resolvers/resume.resolve';
import { SeekerPostsComponent } from './seeker-posts/seeker-posts.component';
import { MatchedPostDetailComponent } from './matched-post-detail/matched-post-detail.component';
import { RecruiterProfileComponent } from './recruiter-profile/recruiter-profile.component';
import { MatchedPostResumeComponent } from './matched-post-resume/matched-post-resume.component';

@NgModule({
  declarations: [
    RestrictTodayDirective,
    AppComponent,
    NavbarComponent,
    AboutComponent,
    JobListingComponent,
    JobSingleComponent,
    PostJobComponent,
    ContactComponent,
    HomeComponent,
    FooterComponent,
    LoaderComponent,
    BlogComponent,
    LoginComponent,
    SignupRecruiterComponent,
    SignupJobseekerComponent,
    PostResumeComponent,
    SeekerPostsComponent,
    MatchedPostDetailComponent,
    RecruiterProfileComponent,
    MatchedPostResumeComponent
  ],
  imports: [
    NgxPageScrollCoreModule.forRoot({duration: 600}),
    NgxPageScrollModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    BrowserModule,
    NgxPaginationModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule
  ],
  providers: [UserService, LoaderService, AuthGuard, RecruiterService, CandidatService, ResumeResolve],
  bootstrap: [AppComponent]
})
export class AppModule { }
