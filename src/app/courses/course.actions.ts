import {createAction, props} from '@ngrx/store';
import {Course} from './model/course';
import {Update} from '@ngrx/entity';

// Load add courses, the result is used to fetch data that the target screen is going to need
export const loadAllCourses = createAction(
  "[Course Resolver] Load All Courses"
);
// More a command than event, we are not really reporting something that has happened in the past,
// we are actually issuing a command to the store to load some courses and store them in memory


// Save the courses in the store
export const allCoursesLoaded = createAction(
  "[Load Courses Effect] All Courses Loaded", // This effect is going to listen "load all courses" action
  props<{courses: Course[]}>()
);
// More an event that command, we are reporting something that has already happened in the past "all courses loaded"

export const courseUpdated = createAction(
"[Edit Course Dialog] Course Updated",
  props<{update: Update<Course>}>() // Only one property "update"
);

