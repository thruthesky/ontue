import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';
import { TEACHERS_LIST } from "../../angular-xapi/lms.service";
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'page-teachers-list-video',
  templateUrl: 'teacher-list-video.html'
})
export class TeacherListVideoPage {

  teachersList: TEACHERS_LIST = [];

  constructor(public a: AppService,
              public sanitizer: DomSanitizer
  ) {

    a.lms.teacher_list( { type: 'T' }).subscribe( re => {
      console.log("user search: ", re);
      this.teachersList = re['users'];
    }, e => a.alert(e));
  }

}
