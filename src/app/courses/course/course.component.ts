import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {Observable, of} from 'rxjs';
import {Lesson} from '../model/lesson';
import {concatMap, delay, filter, first, map, shareReplay, tap, withLatestFrom} from 'rxjs/operators';
import {CoursesHttpService} from '../services/courses-http.service';
import {CourseEntityService} from '../services/course-entity.service';
import {LessonEntityService} from '../services/lesson-entity.service';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;
  loading$: Observable<boolean>; // Adding loading control

  displayedColumns = ['seqNo', 'description', 'duration'];

  nextPage = 0;

  constructor(
    private courseEntityService: CourseEntityService,
    private lessonEntityService: LessonEntityService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    const courseUrl = this.route.snapshot.paramMap.get('courseUrl');

    this.course$ = this.courseEntityService.entities$.pipe(
      map(courses => courses.find(course => course.url == courseUrl))
    );

    this.lessons$ = this.lessonEntityService.entities$.pipe(
      withLatestFrom(this.course$), // Getting course observable values
      tap(([lessons, course]) => { // We have a tuple of observable values
        if (this.nextPage == 0) { // Load lesson only when page is zero
          this.loadLessonsPage(course); // Side effect to load lessons
        }
      }),
      map(([lessons, course]) => // Still we have a tuple of observable values
        lessons.filter(lesson => lesson.courseId == course.id)) // Get only lessons related to course
    );

    this.loading$ = this.lessonEntityService.loading$.pipe(delay(0));
  }


  loadLessonsPage(course: Course) {
    this.lessonEntityService.getWithQuery({ // Send query parameters to load lessons
      'courseId': course.id.toString(),
      'pageNumber': this.nextPage.toString(), // Paginated query lessons
      'pageSize': '3'
    });
    this.nextPage += 1;
  }

}
