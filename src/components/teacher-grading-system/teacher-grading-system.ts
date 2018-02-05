import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';


@Component({
  selector: 'teacher-grading-system-component',
  templateUrl: 'teacher-grading-system.html'
})
export class TeacherGradingSystemComponent {

  constructor(
      public a: AppService
    ) {

  }
}
