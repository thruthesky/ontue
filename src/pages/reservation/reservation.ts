import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';

@Component({
  selector: 'page-reservation',
  templateUrl: 'reservation.html'
})
export class ReservationPage {
  books = [];
  my_teachers = [];


  my_point;

  future_class:boolean = false;
  past_class:boolean = false;


  date_begin = null;
  date_end = null;


  constructor(public a: AppService) {
    this.a.loadMyPoint( p => this.my_point = p );

    this.sessionSearch(this.request());
    this.updatePoint();

  }

  request( options = {} ) {
    let defaults = {
      // date_begin: '20171201',
      // date_end: '20171201',
      orderby: 'date ASC, class_begin ASC'
    };

    if(this.future_class != this.past_class ) {
      if( this.future_class ) defaults['future']= this.future_class;
      if( this.past_class ) defaults['past']= this.past_class;
    }
    if( this.date_begin ) defaults['date_begin']= this.date_begin.replace(/\-/g, '');
    if( this.date_end ) defaults['date_end']= this.date_end.replace(/\-/g, '');
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
    }, e => this.a.alert(e ));

  }

  updatePoint() {

    this.a.loadMyPoint( p => this.my_point = p );


  }

  onChangeSearchOption() {
    this.sessionSearch( this.request() );
  }

  sessionSearch( options ) {
    this.a.lms.session_search(options).subscribe(re => {
      console.log("Result of class_search(): ", re);
      this.books = re['books'];
      this.my_teachers = re['my_teachers'];
    }, e => this.a.alert(e));

  }

  onClickSearch() {
    this.a.lms.session_search( this.request() ).subscribe( re => {
      console.log(re);
    }, e => this.a.alert(e) );
  }
}
