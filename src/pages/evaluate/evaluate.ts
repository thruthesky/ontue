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


    if ( this.student_absent ) {
      if ( this.comment.length <= 2 ) {
        this.a.alert("You must comment even if the student was absent.");
      }
      if ( this.comment.length < 10 ) {
        this.a.alert("You must comment more than 10 characters.");
      }
    }
    else {

      if (this.expression) data['expression'] = this.expression;
      else {
        this.a.alert("Please select the expression score on the session with the student");
        return;
      }
      if (this.vocabulary) data['vocabulary'] = this.vocabulary;
      else {
        this.a.alert("Please select the vocabulary score on the session with the student");
        return;
      }
      if (this.grammar) data['grammar'] = this.grammar;
      else {
        this.a.alert("Please select the grammar score on the session with the student");
        return;
      }
      if (this.pronunciation) data['pronunciation'] = this.pronunciation;
      else {
        this.a.alert("Please select the pronunciation score on the session with the student");
        return;
      }
      if (this.speed) data['speed'] = this.speed;
      else {
        this.a.alert("Please select the speed score on the session with the student");
        return;
      }
      if (this.comment.length >= 50) data['comment'] = this.comment;
      else {
        this.a.alert("You must comment more than 50 characters.");
        return;
      }
      if (this.book_used) data['book_used'] = this.book_used;
      else {
        this.a.alert("Please specify book you uses for today session.");
        return;
      }
      if (this.book_next) data['book_next'] = this.book_next;
      else {
        this.a.alert("Please specify book you uses for today session.");
        return;
      }


    }





    console.log(data);

    this.a.lms.session_evaluate(data).subscribe(res => {
      console.log(res);
      this.a.alert("Evaluation Submitted!!!");
      this.a.open('session-past');
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
