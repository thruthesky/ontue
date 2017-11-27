import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'page-reservation',
  templateUrl: 'reservation.html'
})
export class ReservationPage {
  books = [];
  my_teachers = [];

  my_point;

  


  date_begin = null;
  date_end = null;

  private typing = new Subject<string>();

  constructor(public a: AppService) {
    this.a.loadMyPoint( p => this.my_point = p );

    this.sessionSearch(this.request());
    this.updatePoint();
    this.typing
      .debounceTime(300)
      .subscribe(() => {
        this.onChangeSearchOption();
      });


      
  }


  request( options = {} ) {
    let defaults = {
      // future: true,
      // date_begin: '20171201',
      // date_end: '20171201',
      orderby: 'date ASC, class_begin ASC'
    };
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


  onChangeValue() {
    this.typing.next();
  }


  
  onClickSearch() {
    let date_begin = this.date_begin.replace(/\-/g, '');
    let date_end = this.date_begin.replace(/\-/g, '');


    this.a.lms.session_search( { date_begin: date_begin, date_end: date_end } ).subscribe( re => {
      console.log(re);
    }, e => this.a.alert(e) );
  }
}
