import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
@Component({
  selector: 'teacher-intro-component',
  templateUrl: 'teacher-intro.html'
})

export class TeacherIntroComponent {


  constructor(
    public a: AppService
  ) {


  }

  ngOnInit() {

  }


}
