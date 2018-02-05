import { ViewChild,Component } from '@angular/core';
import { AppService } from './../../providers/app.service';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'teacher-grading-system-component',
  templateUrl: 'teacher-grading-system.html'
})
export class TeacherGradingSystemComponent {
  @ViewChild('gradingSystem') slides: Slides;
  constructor(
      public a: AppService
    ) {
  }

  next() {
      this.slides.slideNext(500);
  }

  previous() {
    this.slides.slidePrev(500);
  }
}
