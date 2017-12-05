import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { NavParams } from 'ionic-angular';

@Component({
    selector: 'evaluate-page',
    templateUrl: 'evaluate.html'
})
export class EvaluatePage {


    idx;

    student_absent: boolean;
    class_successfull: boolean;
    expression: number;
    vocabulary: number;
    grammar: number;
    pronounciation: number;
    speed: number;
    comment: string;
    book_use: string;
    book_next: string;



    an = [];
    ob = {};

    constructor(
        navParams: NavParams,
        public a: AppService
    ) {
        this.idx = navParams.data['idx'];
        console.log(this.idx);
    }


  onClickSubmitEvaluation() {



  }
}
