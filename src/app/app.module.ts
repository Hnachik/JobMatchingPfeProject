import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

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
import {UserService} from './shared/user.service';
import { SignupRecruiterComponent } from './signup-recruiter/signup-recruiter.component';
import { SignupJobseekerComponent } from './signup-jobseeker/signup-jobseeker.component';
import {AuthGuard} from './auth/auth.guard';

@NgModule({
  declarations: [
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
    SignupJobseekerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
