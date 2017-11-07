import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';
import {TEACHERS_LIST} from "../../angular-xapi/lms.service";




@Component({
  selector: 'page-teacher-list',
  templateUrl: 'teacher-list.html'
})
export class TeacherListPage {

  teachersList: TEACHERS_LIST = [];

  constructor(
    public a: AppService
  ) {




    a.lms.user_search( { type: 'T' }).subscribe( re => {
        console.log("user search: ", re);
        this.teachersList = re;
    }, e => a.alert(e));


  }

  onClickTeacher(teacher) {
    console.log(teacher);

    this.a.open('schedule-table', teacher);
  }


}
