import {Component} from '@angular/core';
import {AppService} from '../../providers/app.service';
import {NavParams,ViewController} from 'ionic-angular';

@Component({
  selector: 'evaluate-view',
  templateUrl: 'evaluate-view.html'
})
export class EvaluateView {


  session;
  level;

  constructor(
    public a: AppService,
    public navParams: NavParams,
    public viewCtrl: ViewController,
  ) {

    let idx = navParams.data['idx'];
    console.log( idx );

    this.a.lms.get_session_evaluation( idx ).subscribe(res => {
      console.log("get_session_evaluation:: " , res.session);
      let s = res.session;
      this.session = s;

      this.level = Math.floor(( this.a.toInt(s.expression) + this.a.toInt(s.vocabulary) + this.a.toInt(s.grammar) + this.a.toInt(s.pronunciation) + this.a.toInt(s.speed)  ) / 5);
    }, e => {
      this.a.alert(e);
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


  toInt(n:any){
    if( typeof n == 'string' ) {
      return parseInt( n );
    }
    else if( typeof n == 'number' ){
      return n;
    }
    else {
      return 0;
    }
  }


  onClickPrint(){
    window.print();
  }



}
