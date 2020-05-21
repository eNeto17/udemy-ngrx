import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {Course} from '../model/course';
import {Injectable} from '@angular/core';

@Injectable()
export class CourseEntityService extends EntityCollectionServiceBase<Course> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Course', serviceElementsFactory);
  }
}
// Allow manipulate entity in cache, fetch data from backend, saving and make query to data
