import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {CourseActions} from './action-types';
import {concatMap, map} from 'rxjs/operators';
import {CoursesHttpService} from './services/courses-http.service';

@Injectable()
export class CoursesEffects {

  loadCourses$ = createEffect(
    () => this.actions$.pipe(
      ofType(CourseActions.loadAllCourses), // Action received from CoursesResolver
      concatMap(action => this.coursesHttpService.findAllCourses()), // Send one request at time
      map(courses => CourseActions.allCoursesLoaded({courses})) // Return a new NgRx action for dispatching
    )
  );
  // Using concatMap() to transform value into a new observable which is going to fetch data from backend
  // Using concatMap() is going to ensure we only send one request at time to the backend service
  // Using map() due to compiler is expecting the return of a new NgRx action that is going dispatched to store
  // On map() operator, "courses” is the returned value from concatMap() operator

  saveCourses$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CourseActions.courseUpdated),
        concatMap(action => this.coursesHttpService.saveCourse(action.update.id, action.update.changes))
      ),
      {dispatch: false} // This is the equivalent to trigger an action (like previous effect)
  );

  constructor(private actions$: Actions, private coursesHttpService: CoursesHttpService) { }

}
