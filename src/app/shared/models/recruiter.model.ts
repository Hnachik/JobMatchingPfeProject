import { User } from './user.model';

export class JobCategory {
  id: number;
  category_name: string;
}

export class Recruiter {
  user: User;
  company_name: string;
  company_description: string;
  company_logo: string;
  address: string;
}

export class JobSeeker {
  user: User;
  first_name: string;
  last_name: string;
  phone_number: number;
  address: string;
  about: string;
}

export class JobSeekerModal {
  id: number;
  user: number;
  first_name: string;
  last_name: string;
  phone_number: number;
  address: string;
  about: string;
}

export class CompanyModel {
  id: number;
  user: number;
  company_name: string;
  company_description: string;
  company_logo: string;
  address: string;
}

export class JobPostModel {
  category_set: Array<JobCategory>;
  job_title: string;
  post_url: string;
  job_description: string;
  job_requirements: string;
  publication_date: Date;
  expiration_date: Date;
  job_type: string;
  location: string;
  id: number;
  recruiter: CompanyModel;
}

export class JobPost {
  category_set: Array<Object>;
  job_title: string;
  post_url: string;
  job_description: string;
  job_requirements: string;
  publication_date: Date;
  expiration_date: Date;
  job_type: string;
  location: string;
}

export class WorkHistory {
  company_name: string;
  designation: string;
  time_period: Object;
  job_description: string;
}

export class EducationBackground {
  institute_name: string;
  degree: string;
  time_period: Object;
}

export class WorkHistoryModel {
  id: number;
  company_name: string;
  designation: string;
  time_period: Object;
  job_description: string;
  resume: number;
}

export class EducationBackgroundModel {
  id: number;
  institute_name: string;
  degree: string;
  time_period: Object;
  resume: number;
}

export class Resume {
  id: number;
  seeker: number;
  resume_title: string;
  experience_level: string;
  carrier_objective: string;
  skills: Array<Object>;
}

export class ResumeModel {
  id: number;
  seeker: JobSeekerModal;
  resume_title: string;
  experience_level: string;
  carrier_objective: string;
  work_history: Array<WorkHistoryModel>;
  education_background: Array<EducationBackgroundModel>;
  skills: Array<Object>;
}


export class ResumeUpdateModel {
  resume_title: string;
  experience_level: string;
  carrier_objective: string;
  skills: Array<Object>;
}


export class MatchedPostsModel {
  id: number;
  seeker: number;
  job_title: string;
  job_description: string;
  cosine_distance: number;
}
