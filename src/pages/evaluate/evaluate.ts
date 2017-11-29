import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { NavParams } from 'ionic-angular';

@Component({
    selector: 'evaluate-page',
    templateUrl: 'evaluate.html'
})
export class EvaluatePage {


    idx;
    constructor(
        navParams: NavParams,
        public a: AppService
    ) {
        this.idx = navParams.data['idx'];
    }
}