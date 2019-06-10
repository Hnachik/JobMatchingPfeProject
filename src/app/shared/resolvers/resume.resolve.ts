import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {CandidatService} from '../services/candidat.service';

@Injectable()
export class ResumeResolve implements Resolve<any> {
  constructor(private candidatService: CandidatService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.candidatService.getResume();
  }
}
