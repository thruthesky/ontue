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
  ionViewCanEnter() {
    let grade = this.nav.get('grade');
    // console.log(grade);
    if( grade ) this.grade = grade;
    this.slides.initialSlide=this.grade;
    this.slides.simulateTouch=false;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  next(){
    this.slides.slideNext(0);
  }

  prev(){
    this.slides.slidePrev(0);
  }


}
