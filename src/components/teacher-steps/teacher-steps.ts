import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';


@Component({
  selector: 'teacher-steps-component',
  templateUrl: 'teacher-steps.html'
})
export class TeacherStepComponent {

  constructor(
      public a: AppService
    ) {

  }
}
