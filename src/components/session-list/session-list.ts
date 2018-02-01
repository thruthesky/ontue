import { Component, Input } from '@angular/core';
import { AppService, SHARE_SESSION_LIST } from '../../providers/app.service';
import { AlertController, ModalController } from 'ionic-angular';
import { EvaluateView } from '../../components/evaluate-view/evaluate-view';
import { MessageWrite } from "../message-write/message-write";
import { RefundRequestView } from "../refund-request-view/refund-request-view";
import { StudentCommentEdit } from "../../components/student-comment-edit/student-comment-edit";


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
  teacher_summary = {
    total_points_from_payable_session: 0,
    total_teacher_share_points: 0,
    counts_of_payable_session: 0,
    counts_of_not_payable_session: 0,
    counts_of_paid_session: 0,
    counts_of_refunded_session: 0,
    counts_of_rejected_refund: 0,
    counts_of_requested_refund: 0,
    counts_of_incomplete_eval: 0
  };
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
    public alertCtrl: AlertController
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
    if (this.future) {
      this.date_begin = now;
    }
    else if (this.past) {
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
    // console.log("Request: ", req);
    return req;
  }

  onClickCancelAll() {
    this.books.map(book => this.onClickCancel(book));
  }
  onClickCancel(book) {
    book['process'] = true;
    this.a.lms.session_cancel(book.idx).subscribe(re => {
      // console.log(re);
      this.books = this.books.filter(book => book.idx != re['idx_reservation']);

      this.a.updateLmsInfoUserNoOfTotalSessions(re['no_of_total_sessions']);
      this.a.updateLmsInfoUserNoOfReservation(re['no_of_reservation']);
      this.updatePoint();


      this.a.onLmsCancel();
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

  get teachers_keys() {
    return Object.keys(this.my_teachers);
  }

  sessionSearch() {
    this.a.lms.session_search(this.request()).subscribe(re => {
      console.log("Result of class_search(): ", re);
      this.re = re;
      this.re['total_session_refunded'] = this.a.toInt(this.re['total_session_refunded']);
      this.re['total_session_refund_in_progress'] = this.a.toInt(this.re['total_session_refund_in_progress']);
      this.books = re['books'];
      this.my_teachers = re['my_teachers'];
      this.teacher_summary = re['teacher_summary'];
    }, e => {

      console.log('sessionSearch::', e);
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
    const modal = this.modalCtrl.create(MessageWrite, { title: "포인트 복구 사유를 적어주세요." });
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

  refund_in_progress(book) {
    if (book['paid'] > 0) return false;
    if (book['refund_done_at'] > 0) return false;
    if (book['refund_request_at'] > 0) return true;
    if (book['refund_reject_at'] > 0) return true;
    return false;
  }

  refund_request(book) {
    if (book['refund_reject_at'] == 0 && book['refund_request_at'] > 0) {
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
    if (book.refund_timeover) return false;
    if (this.paid(book)) return false;
    if (this.refunded(book)) return false;
    if (this.refund_in_progress(book)) return false;
    return true;
  }
  refunded(book) {
    return book['refund_done_at'] > 0;
  }
  rejected(book) {
    return book['refund_reject_at'] > 0;
  }
  onClickRefund(book) {

    let confirm = this.alertCtrl.create({
      title: 'Refund Class',
      message: 'Are you sure you want to refund?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            console.log('yes continue');
            this.a.lms.session_refund(book['idx']).subscribe(re => {
              console.log(re);
              book['refund_done_at'] = 1;
            }, e => this.a.alert(e));
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel');
          }
        }
      ]
    });
    confirm.present();

  }

  onClickRejectRefundRequest(book) {
    const modal = this.modalCtrl.create(MessageWrite, { title: "Why Reject Refund?" });
    modal.onDidDismiss(re => {
      // console.log("onDidDismiss", re);
      if (re) {
        this.a.lms.session_refund_reject({ idx_reservation: book['idx'], refund_reject_message: re }).subscribe(re => {
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

  onClickShowRequest(book) {
    console.log("onClickShowRequest:: ", book);
    const modal = this.modalCtrl.create(RefundRequestView, { book: book });
    modal.onDidDismiss(re => {
      console.log("onClickShowRequest::onDidDismiss:: ", re);
      if (!re) return;
      console.log("onDidDismiss::", re);
      if (re == 'accept') {
        book['refund_done_at'] = 1;
      } else if (re == 'reject') {
        book['refund_reject_at'] = 1;
      }
    });
    modal.present();

  }


  /**
   * Returns teacher photo url.
   * @param book book
   */
  photoURL(book) {
    return this.my_teachers[book.idx_teacher].photoURL ? this.my_teachers[book.idx_teacher].photoURL : this.a.anonymousPhotoURL;
  }

  onClickKakaoQRMarkString(url) {
    window.open(url, '_blank');
  }

  onClickCommentCreate(idx_teacher) {
    const createCommentModal = this.modalCtrl.create(StudentCommentEdit, { idx_teacher: idx_teacher }, { cssClass: 'student-comment-create' }
    );
    createCommentModal.onDidDismiss(res => {
      // if (res == 'success') this.onClickCommentList();
    });
    createCommentModal.present();
  }

}
