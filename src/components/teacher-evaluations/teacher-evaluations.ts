import {Component, Input, OnInit,} from '@angular/core';
import {AppService} from './../../providers/app.service';


@Component({
  selector: 'teacher-evaluations-component',
  templateUrl: 'teacher-evaluations.html'
})
export class TeacherEvaluationsComponent implements OnInit {

  @Input() evaluations = [];


  pageOption = {
    limitPerPage: 5,
    currentPage: 1,
    limitPerNavigation: 4,
    totalRecord: 0
  };




  constructor(public a: AppService,) {

  }

  ngOnInit() {
  }


  loadEvaluations() {
    let data = {
      limit: this.pageOption.limitPerPage,
      page: this.pageOption.currentPage
    };
    this.a.lms.get_teacher_evaluations_to_student(data).subscribe(res => {
      this.evaluations = res['evaluations'];
      this.pageOption.currentPage = res['page'];
      this.pageOption.limitPerPage = res['limit'];
      this.pageOption.totalRecord = res['total']
    }, error => {
      this.a.alert(error);
    })
  }

  onPostPageClick($event) {
    this.pageOption['currentPage'] = $event;
    this.loadEvaluations();
  }

  preDate(date) {
    if (!date) return '';
    let y = date.slice(0, 4);
    let m = date.slice(4, 6);
    let d = date.slice(6, 9);
    return `${y}-${m}-${d}`;
  }



}
