import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { AppService } from './../../providers/app.service';
import { TEACHERS_LIST } from "../../angular-xapi/lms.service";




@Component({
  selector: 'teacher-list-page',
  templateUrl: 'teacher-list.html'
})
export class TeacherListPage {

  display_options = false;
  teachersList: TEACHERS_LIST = [];

  mode = null;
  re: any;
  teachers = [];

  gender = '';
  recommend = 'Y';
  page_no: number;
  limit = 30; // default should be 60. it looks good in 60.

  noMoreTeachers: boolean;
  loading: boolean;
  constructor(
    public nav: NavParams,
    public a: AppService
  ) {
    this.mode = nav.get('mode');
    this.init();
    this.loadTeachers();
  }

  init() {
    this.teachers = [];
    this.page_no = 1;
    this.noMoreTeachers = false;
  }

  onClickTeacher(teacher) {
    // console.log(teacher);
    this.a.open('schedule-table', teacher);
  }


  loadTeachers() {
    this.loading = true;
    this.a.lms.teacher_list({
      gender: this.gender,
      recommend: this.recommend,
      page_no: this.page_no,
      limit: this.limit
    }).subscribe(re => {
      this.loading = false;
      // console.log(re);
      this.re = re;
      this.teachers = this.teachers.concat( this.re.teachers );
      if ( this.re.teachers.length < this.limit ) {
        this.noMoreTeachers = true;
      }
    }, e => this.a.alert(e));
  }



  onChangeRecommend() {
    this.init();
    this.loadTeachers();
  }
  onChangeGender() {
    this.init();
    this.loadTeachers();
  }

  onClickShowMoreTeacher() {
    this.page_no ++;
    this.loadTeachers();
  }

}
