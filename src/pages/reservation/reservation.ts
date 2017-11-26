import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';

@Component({
    selector: 'page-reservation',
    templateUrl: 'reservation.html'
})
export class ReservationPage {
    books = [];
    constructor( public a: AppService ) {

        a.lms.search_reservation({ user: 'me' }).subscribe( re => {
            console.log("Result of class_search(): ", re);
            this.books = re['books'];
        }, e => this.a.alert(e));

    }
}