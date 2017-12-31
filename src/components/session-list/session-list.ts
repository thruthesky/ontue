import { Component, Input } from '@angular/core';
import { AppService, SHARE_SESSION_LIST } from '../../providers/app.service';
import { ModalController } from 'ionic-angular';
import { EvaluateView} from '../../components/evaluate-view/evaluate-view';


@Component({
  selector: 'session-list',
  templateUrl: 'session-list.html'
})
export class SessionList {
  @Input() data: {past:false;future:false};
  @Input() share: SHARE_SESSION_LIST = <SHARE_SESSION_LIST> {};
  
  
  re = null;
  books = [];
  my_teachers = [];
  show_teacher: number = 0;
  date_begin = null;
  date_end = null;
  today = new Date();
  show_refund_in_progress = false;
  show_refunded = false;
  constructor(
    public a: AppService,
    public modalCtrl: ModalController,
  ) {
    this.updatePoint();
  }


  ngOnInit() {
    let now =  this.today.getFullYear() + '-' + this.a.add0(this.today.getMonth()+1) + '-' + this.a.add0(this.today.getDate());
    if( this.data.future ) {
      this.date_begin = now;
    } else if ( this.data.past ) {
      let _begin = new Date(this.today.getTime() - 24*60*60*1000 * this.a.DEFAULT_DAYS_TO_SHOW_ON_PAST_PAGE);
      this.date_begin = _begin.getFullYear() + '-' + this.a.add0(_begin.getMonth()+1) + '-' + this.a.add0(_begin.getDate());
      this.date_end = now;
    }
    this.sessionSearch(this.request( this.data ));
  }

  request( options = {} ) {
    let defaults = {
      orderby: 'date ASC, class_begin ASC'
    };

    defaults['show_refund_in_progress'] = this.show_refund_in_progress;
    defaults['show_refunded'] = this.show_refunded;
    if( this.show_teacher > 0 ) defaults['idx_teacher'] = this.show_teacher;
    if( this.date_begin ) {
      defaults['date_begin']= this.date_begin.replace(/\-/g, '');
    }
    if( this.date_end ) {
      defaults['date_end']= this.date_end.replace(/\-/g, '');
    }
    const req = Object.assign( defaults, options );
    console.log("Request: ", req );
    return req;
  }

  onClickCancelAll() {
    this.books.map( book => this.onClickCancel( book ) );
  }
  onClickCancel(book) {
    book['process'] = true;
    this.a.lms.session_cancel( book.idx ).subscribe( re => {
      console.log(re);
      this.books = this.books.filter( book => book.idx != re['idx_reservation'] );
      this.updatePoint();
    }, e => {
      book['process'] = false;
      this.a.alert(e );
    });

  }

  updatePoint() {
    this.a.loadMyPoint( p => this.share.point = p );
  }

  onChangeSearchOption() {
    this.sessionSearch(this.request( this.data ));
  }

  sessionSearch( options ) {
    this.a.lms.session_search(options).subscribe(re => {
      console.log("Result of class_search(): ", re);
      this.re = re;
      this.re['total_session_refunded'] = this.a.toInt( this.re['total_session_refunded'] );
      this.re['total_session_refund_in_progress'] = this.a.toInt( this.re['total_session_refund_in_progress'] );
      this.books = re['books'];
      this.my_teachers = re['my_teachers'];
    }, e => this.a.alert(e));

  }

  onClickSearch() {
    this.a.lms.session_search( this.request() ).subscribe( re => {
      console.log(re);
    }, e => this.a.alert(e) );
  }

  onClickRefundRequest( book ) {
    console.log(book);
    this.a.lms.session_refund_request( { idx_reservation: book['idx'], 'refund_request_message': 'test'}).subscribe( re => {
      book['refund_request_at'] = 1;
    }, e => this.a.alert(e));
  }

  onClickCancelRefundRequest( book ) {
    console.log(book);
    this.a.lms.session_cancel_refund_request( book['idx']).subscribe( re => {
      book['refund_request_at'] = 0;
    }, e => this.a.alert(e));
  }

  refund_request(book) {
    if ( book['refund_request_at'] > 0 ) {
      return true;
    }
    else {
      return false;
    }
  }
  refunded( book ) {
    return book['refund_done_at'] > 0;
  }
  rejected( book ) {
    return book['refund_reject_at'] > 0;
  }
  onClickRefund( book ) {
    this.a.lms.session_refund( book['idx'] ).subscribe( re => {
      console.log(re);
      book['refund_done_at'] = 1;
    }, e => this.a.alert(e));
  }

  onClickRejectRefundRequest( book ) {
    this.a.lms.session_refund_reject( { idx_reservation: book['idx'], refund_reject_message: 'test reject' }).subscribe( re => {
      console.log(re);
      book['refund_reject_at'] = 1;
    }, e => this.a.alert(e));
  }

  onClickEvaluateView(idx) {
    const modal = this.modalCtrl.create( EvaluateView,
      {idx: idx} );
    modal.onDidDismiss(()=> {});
    modal.present();
  }
}
