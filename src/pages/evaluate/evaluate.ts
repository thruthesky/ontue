import {Component} from '@angular/core';
import {AppService} from '../../providers/app.service';
import {NavParams} from 'ionic-angular';

@Component({
  selector: 'evaluate-page',
  templateUrl: 'evaluate.html'
})
export class EvaluatePage {


  idx;
  point: number;

  student_absent: boolean = false;
  unsuccessful: boolean = false;
  expression: number = 0;
  vocabulary: number = 0;
  grammar: number = 0;
  pronunciation: number = 0;
  speed: number = 0;
  comment: string;
  book_used: string;
  book_next: string;

  an = []; //[1,2,3,4,5,6];
  ob = {a: 1, b: 2};

  level: number = 0;

  constructor(navParams: NavParams,
              public a: AppService) {
    this.idx = navParams.data['idx'];
    console.log(this.idx);

    this.a.lms.get_session_evaluation(this.idx).subscribe(res => {
      console.log("get_session_evaluation");
      let session = res.session;
      this.point = session.point;
      if (session.student_absent == "y") this.student_absent = true;
      if (session.successful == "n") this.unsuccessful = true;
      this.expression = session.expression;
      this.vocabulary = session.vocabulary;
      this.grammar = session.grammar;
      this.pronunciation = session.pronunciation;
      this.speed = session.speed;
      this.comment = session.comment;
      this.book_used = session.book_used;
      this.book_next = session.book_next;
      this.onChangeChecklevel();
    }, e => {
      this.a.alert(e);
    })
  }


  onClickSubmitEvaluation() {
    let data = {};
    data['idx'] = this.idx;
    this.student_absent ? data['student_absent'] = "y" : data['student_absent'] = "n";

    if (this.student_absent || this.unsuccessful) data['successful'] = "n";
    else data['successful'] = 'y';
    if (this.expression) data['expression'] = this.expression;
    if (this.vocabulary) data['vocabulary'] = this.vocabulary;
    if (this.grammar) data['grammar'] = this.grammar;
    if (this.pronunciation) data['pronunciation'] = this.pronunciation;
    if (this.speed) data['speed'] = this.speed;
    if (this.comment) data['comment'] = this.comment;
    if (this.book_used) data['book_used'] = this.book_used;
    if (this.book_next) data['book_next'] = this.book_next;


    console.log(data);

    this.a.lms.session_evaluate(data).subscribe(res => {
      console.log(res)
      this.a.alert("Evaluation Submitted!!!")
    }, e => {
      this.a.alert(e);
    })
  }


  onChangeChecklevel(){
    if(this.expression  && this.vocabulary && this.grammar && this.pronunciation && this.speed) {
      this.level = Math.floor(( this.a.toInt(this.expression) + this.a.toInt(this.vocabulary) + this.a.toInt(this.grammar) + this.a.toInt(this.pronunciation) + this.a.toInt(this.speed)  ) / 5);
    } else this.level = 0;
  }


}
