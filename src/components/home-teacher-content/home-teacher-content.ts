import { Component, OnInit } from '@angular/core';
import {AppService} from "../../providers/app.service";

@Component({
    selector: 'home-teacher-content-component',
    templateUrl: 'home-teacher-content.html'
})

export class HomeTeacherContentComponent implements OnInit {
    constructor(
      public a: AppService
    ) {
      this.a.lms.get_teacher_site_info().subscribe( res => {
          console.log("site info", res);

      }, () => {})

    }

    ngOnInit() { }




}
