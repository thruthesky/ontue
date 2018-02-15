import { Component, ViewChild } from '@angular/core';
import { AppService } from './../../providers/app.service';
import {NavParams, Slides, ViewController} from "ionic-angular";

@Component({
  selector: 'teacher-grade-component',
  templateUrl: 'teacher-grade.html'
})
export class TeacherGradeComponent {


  @ViewChild(Slides) slides: Slides;
  grade = 0;

  constructor(
    public a: AppService,
    public nav: NavParams,
    public viewCtrl: ViewController
  ) {


  }

  ionViewDidEnter() {
    let grade = this.nav.get('grade');
    console.log(grade);
    if( grade ) this.grade = grade;
    this.slides.slideTo(this.grade, 100);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


}
