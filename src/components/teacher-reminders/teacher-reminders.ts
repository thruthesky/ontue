import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';


@Component({
  selector: 'teacher-reminders-component',
  templateUrl: 'teacher-reminders.html'
})
export class TeacherRemindersComponent {

  constructor(
      public a: AppService,
    ) {
  }
}
