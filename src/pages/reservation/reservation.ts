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
        a.lms.session_search({ user: 'me' }).subscribe(re => {
            console.log("Result of class_search(): ", re);
            this.books = re['books'];
        }, e => this.a.alert(e));

        this.updatePoint();
    }

    onClickCancelAll() {

    }
    onClickCancel(book) {
        book['process'] = true;

    }


  updatePoint() {
    
        this.a.loadMyPoint( p => this.my_point = p );
        
    
      }
}