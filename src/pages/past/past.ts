import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';

@Component({
    selector: 'page-past',
    templateUrl: 'past.html'
})
export class PastPage {
    books = [];
    constructor( public a: AppService ) {

        // a.lms.class_search({ user: 'me' }).subscribe( re => {
        //     console.log("Result of class_search(): ", re);
        //     this.books = re;
        // }, e => this.a.alert(e));

    }
}
