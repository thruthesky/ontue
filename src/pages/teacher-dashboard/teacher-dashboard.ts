import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
@Component({
  selector: 'teacher-dashboard-page',
  templateUrl: 'teacher-dashboard.html'
})

export class TeacherDashboardPage {



  constructor(
    public a: AppService
  ) {


  }

  ngOnInit() {

  }


}
