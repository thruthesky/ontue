import { Component, Input } from '@angular/core';
import { AppService, SHARE_SESSION_LIST } from '../../providers/app.service';
import { ModalController } from 'ionic-angular';
import { EvaluateView } from '../../components/evaluate-view/evaluate-view';
import {MessageWrite} from "../message-write/message-write";


@Component({
  selector: 'session-list',
  templateUrl: 'session-list.html'
})
export class SessionList {
  // @Input() data: {past:false;future:false};
  // @Input() page = '';
  @Input() share: SHARE_SESSION_LIST = <SHARE_SESSION_LIST>{};


  re = null;
  books = [];
  my_teachers = [];
  show_teacher: number = 0;
  date_begin = null;
  date_end = null;
  today = new Date();
  show_refund_in_progress = false;
  show_refunded = false;

  displayTeacherName = true;
  displayDate = true;
  displayPoint = true;
  constructor(
    public a: AppService,
    public modalCtrl: ModalController,
  ) {
    this.updatePoint();
  }

  get future(): boolean {
    return this.a.page == 'session-future';
  }
  get past(): boolean {
    return this.a.page == 'session-past';
  }

  ngOnInit() {
    let now = this.today.getFullYear() + '-' + this.a.add0(this.today.getMonth() + 1) + '-' + this.a.add0(this.today.getDate());
    if ( this.future ) {
      this.date_begin = now;
    }
    else if ( this.past ) {
      let _begin = new Date(this.today.getTime() - 24 * 60 * 60 * 1000 * this.a.DEFAULT_DAYS_TO_SHOW_ON_PAST_PAGE);
      this.date_begin = _begin.getFullYear() + '-' + this.a.add0(_begin.getMonth() + 1) + '-' + this.a.add0(_begin.getDate());
      this.date_end = now;
    }
    this.sessionSearch();
  }

  request(options = {}) {
    let defaults = {
      orderby: 'date DESC, class_begin DESC',
      future: this.future,
      past: this.past
    };

    console.log(defaults);

    defaults['show_refund_in_progress'] = this.show_refund_in_progress;
    defaults['show_refunded'] = this.show_refunded;
    if (this.show_teacher > 0) defaults['idx_teacher'] = this.show_teacher;
    if (this.date_begin) {
      defaults['date_begin'] = this.date_begin.replace(/\-/g, '');
    }
    if (this.date_end) {
      defaults['date_end'] = this.date_end.replace(/\-/g, '');
    }
    const req = Object.assign(defaults, options);
    console.log("Request: ", req);
    return req;
  }

  onClickCancelAll() {
    this.books.map(book => this.onClickCancel(book));
  }
  onClickCancel(book) {
    book['process'] = true;
    this.a.lms.session_cancel(book.idx).subscribe(re => {
      console.log(re);
      this.books = this.books.filter(book => book.idx != re['idx_reservation']);
      this.updatePoint();
    }, e => {
      book['process'] = false;
      this.a.alert(e);
    });

  }

  updatePoint() {
    this.a.loadMyPoint(p => this.share.point = p);
  }

  onChangeSearchOption() {
    this.sessionSearch();
  }

  sessionSearch() {
    this.a.lms.session_search( this.request() ).subscribe(re => {
      console.log("Result of class_search(): ", re);
      this.re = re;
      this.re['total_session_refunded'] = this.a.toInt(this.re['total_session_refunded']);
      this.re['total_session_refund_in_progress'] = this.a.toInt(this.re['total_session_refund_in_progress']);
      this.books = re['books'];
      this.my_teachers = re['my_teachers'];
    }, e => {
      this.a.alert(e);
    });

  }

  onClickSearch() {
    this.a.lms.session_search(this.request()).subscribe(re => {
      console.log(re);
    }, e => {
      this.a.alert(e);
    });
  }

  onClickRefundRequest(book) {
    // console.log(book);
    const modal = this.modalCtrl.create(MessageWrite, {title: "Why Request Refund?"});
    modal.onDidDismiss(re => {
      // console.log("onDidDismiss", re);
      if (re) {
        this.a.lms.session_refund_request({
          idx_reservation: book['idx'],
          refund_request_message: 're'
        }).subscribe(re => {
          book['refund_request_at'] = 1;
        }, e => this.a.alert(e));
      }
    });
    modal.present();

  }

  onClickCancelRefundRequest(book) {
    console.log(book);
    this.a.lms.session_cancel_refund_request(book['idx']).subscribe(re => {
      book['refund_request_at'] = 0;
    }, e => this.a.alert(e));
  }

  refund_in_progress( book ) {
    if ( book['paid'] > 0 ) return false;
    if ( book['refund_done_at'] > 0 ) return false;
    if ( book['refund_request_at'] > 0 ) return true;
    if ( book['refund_reject_at'] > 0 ) return true;
    return false;
  }
  refund_request(book) {
    if ( book['refund_reject_at'] == 0 && book['refund_request_at'] > 0 ) {
      return true;
    }
    else {
      return false;
    }
  }

  paid(book) {
    return book['paid'] > 0;
  }

  refundable(book) {
    if ( this.paid( book ) ) return false;
    if ( this.refunded( book ) ) return false;
    if ( this.refund_in_progress( book ) ) return false;
    return true;
  }
  refunded(book) {
    return book['refund_done_at'] > 0;
  }
  rejected(book) {
    return book['refund_reject_at'] > 0;
  }
  onClickRefund(book) {
    this.a.lms.session_refund(book['idx']).subscribe(re => {
      console.log(re);
      book['refund_done_at'] = 1;
    }, e => this.a.alert(e));
  }

  onClickRejectRefundRequest(book) {
    const modal = this.modalCtrl.create(MessageWrite, {title: "Why Reject Refund?"});
    modal.onDidDismiss(re => {
      // console.log("onDidDismiss", re);
      if (re) {
        this.a.lms.session_refund_reject({idx_reservation: book['idx'], refund_reject_message: re}).subscribe(re => {
          console.log(re);
          book['refund_reject_at'] = 1;
        }, e => this.a.alert(e));
      }
    });
    modal.present();
  }

  onClickEvaluateView(idx) {
    const modal = this.modalCtrl.create(EvaluateView,
      { idx: idx });
    modal.onDidDismiss(() => { });
    modal.present();
  }

  date(d: string) {
    let new_date = d.split('-');
    new_date.shift();
    return new_date.join('/');
  }
  evaluated(book) {
    // console.log('book: ', book);
    if (!book.comment) return false;
    if (!book.comment.length) return false;
    if (book.comment.length < 30) return false;
    return true;
  }
  point(book) {
    if (this.refunded(book)) return '';
    else return this.a.number_format(book['point']);
  }

}
