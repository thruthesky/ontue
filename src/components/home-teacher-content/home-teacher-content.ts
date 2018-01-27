import { Component, OnInit } from '@angular/core';
import {AppService} from "../../providers/app.service";

@Component({
    selector: 'home-teacher-content-component',
    templateUrl: 'home-teacher-content.html'
})

export class HomeTeacherContentComponent implements OnInit {


    site_info = {
      comment_from_student: [],
      comment_from_teacher: [],
      no_of_past: 0,
      no_of_reservations: 0,
      no_of_student: 0,
      no_of_teacher: 0,
      recent_graded_teachers: [],
      recent_reservations: []
    };

    constructor(
      public a: AppService
    ) {
      this.a.lms.get_teacher_site_info().subscribe( res => {
          console.log("site info", res);
          this.site_info = res['site_info'];
      }, () => {})

    }

    ngOnInit() { }


}
