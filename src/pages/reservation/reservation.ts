import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';
import { NavParams } from 'ionic-angular';


@Component({
  selector: 'page-reservation',
  templateUrl: 'reservation.html'
})
export class ReservationPage {
  books = [];
  my_teachers = [];
  show_teacher: number = 0;


  my_point;


  date_begin = null;
  date_end = null;


  constructor(
    navParams: NavParams,
    public a: AppService
  ) {
    this.a.loadMyPoint( p => this.my_point = p );

    this.sessionSearch(this.request( navParams.data ));
    this.updatePoint();

  }

  request( options = {} ) {
    let defaults = {
      orderby: 'date ASC, class_begin ASC'
    };



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
