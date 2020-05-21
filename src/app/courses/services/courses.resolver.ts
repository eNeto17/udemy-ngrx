import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {CourseEntityService} from './course-entity.service';
import {filter, first, map, tap} from 'rxjs/operators';

@Injectable()
export class CoursesResolver implements Resolve<boolean> {

  constructor(private coursesEntityService: CourseEntityService) { }

  // Resolver is just to indicate if data already loaded in order to allow route transition
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.coursesEntityService.loaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.coursesEntityService.getAll();
        }
      }),
      filter(loaded => !!loaded), // This is the observable boolean value to return
      first() // Whenever the first value gets emitted, the observable is going to get completed
    );

  }
}
