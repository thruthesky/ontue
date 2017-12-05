import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { NavParams } from 'ionic-angular';

@Component({
    selector: 'evaluate-page',
    templateUrl: 'evaluate.html'
})
export class EvaluatePage {


    idx;

    student_absent: boolean = false;
  unsuccessful: boolean = false;
    expression: number;
    vocabulary: number;
    grammar: number;
    pronunciation: number;
    speed: number;
    comment: string;
    book_use: string;
    book_next: string;



    an = []; //[1,2,3,4,5,6];
    ob = {a:1,b:2};

    constructor(
        navParams: NavParams,
        public a: AppService
    ) {
        this.idx = navParams.data['idx'];
        console.log(this.idx);

        this.a.lms.get_session_evaluation(this.idx).subscribe(res => {
          console.log("get_session_evaluation");
          console.log(res);
        }, e => {
          this.a.alert(e);
        })
    }


  onClickSubmitEvaluation() {
      let data = [];
      data['idx'] = this.idx;
      this.student_absent ? data['student_absent'] = "y" : data['student_absent'] = "n";

      if( this.student_absent || this.unsuccessful )data['success'] = "n";
      else data['success'] = 'y';
      if( this.expression ) data['expression'] = this.expression;
      if( this.vocabulary ) data['vocabulary'] = this.vocabulary;
      if( this.grammar ) data['grammar'] = this.grammar;
      if( this.pronunciation ) data['pronunciation'] = this.pronunciation;
      if( this.speed ) data['speed'] = this.speed;
      if( this.comment ) data['comment'] = this.comment;
      if( this.book_use ) data['book_use'] = this.book_use;
      if( this.book_next ) data['book_next'] = this.book_next;


      console.log(data);

      this.a.lms.session_evaluate( data ).subscribe(res => {
        console.log(res)
      }, e => {
        this.a.alert(e);
      })

  }
}
