import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';
import { TEACHERS_LIST } from "../../angular-xapi/lms.service";




@Component({
  selector: 'page-teacher-list',
  templateUrl: 'teacher-list.html'
})
export class TeacherListPage {

  display_options = false;
  teachersList: TEACHERS_LIST = [];

  re: any;

  gender = '';
  recommend = 'Y';
  constructor(
    public a: AppService
  ) {


    this.loadTeachers();


    // this.onClickTeacher( '' );

  }

  onClickTeacher(teacher) {
    console.log(teacher);

    this.a.open('schedule-table', teacher);
  }


  loadTeachers() {

    this.a.lms.teacher_list({ type: 'T' }).subscribe(re => {
      this.re = re;
      // console.log("user search: ", re);
      // this.teachersList = re['teachers'];
    }, e => this.a.alert(e));

  }


  countStar( grade ) {
    let re = Array( parseInt(grade) ).fill(true);
    // console.log(grade,re);
    return re;
  }

}
