import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'page-reservation',
  templateUrl: 'reservation.html'
})
export class ReservationPage {
  books = [];

  my_point;

  sunday;
  monday;
  tuesday;
  wednesday;
  thursday;
  friday;
  saturday;

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
      user: 'me',
      future: true,
      // teaceher_name: '',
      // sunday: this.sunday ? 'Y' : '',
      // monday: this.monday ? 'Y'  : '',
      // tuesday: this.tuesday ? 'Y' : '',
      // wednesday: this.wednesday ? 'Y' : '',
      // thursday: this.thursday ? 'Y' : '',
      // friday: this.friday ? 'Y' : '',
      // saturday: this.saturday ? 'Y' : '',
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
    }, e => this.a.alert(e));

  }


  onChangeValue() {
    this.typing.next();
  }


  clearDaySelected(){
    this.sunday=this.monday=this.tuesday=this.wednesday=this.thursday=this.friday=this.saturday=false;
    this.onChangeSearchOption();
  }

  selectMonToFri(){
    this.clearDaySelected();
    this.monday=this.tuesday=this.wednesday=this.thursday=this.friday=true;
    this.onChangeSearchOption();
  }
  selectMWF(){
    this.clearDaySelected();
    this.monday=this.wednesday=this.friday=true;
    this.onChangeSearchOption();
  }
  selectTTh(){
    this.clearDaySelected();
    this.tuesday=this.thursday=true;
    this.onChangeSearchOption();
  }

  selectSunSat(){
    this.clearDaySelected();
    this.sunday=this.saturday=true;
    this.onChangeSearchOption();
  }
  selectAll(){
    this.sunday=this.monday=this.tuesday=this.wednesday=this.thursday=this.friday=this.saturday=true;
    this.onChangeSearchOption();
  }
}
