import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';

@Component({
    selector: 'page-reservation',
    templateUrl: 'reservation.html'
})
export class ReservationPage {
    books = [];

    my_point;
    constructor(public a: AppService) {
        this.a.loadMyPoint( p => this.my_point = p );
        a.lms.session_search({ user: 'me', future: true }).subscribe(re => {
            console.log("Result of class_search(): ", re);
            this.books = re['books'];
        }, e => this.a.alert(e));

        this.updatePoint();
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
}