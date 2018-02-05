import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';


@Component({
  selector: 'teacher-guidelines-component',
  templateUrl: 'teacher-guidelines.html'
})
export class TeacherGuidelinesComponent {

  constructor(
      public a: AppService
    ) {

  }
}
