import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';

@Component({
    selector: 'page-past',
    templateUrl: 'past.html'
})
export class PastPage {
    books = [];
    constructor( public a: AppService ) {



        a.lms.session_search({ user: 'me', past: true }).subscribe( re => {
            console.log("Result of class_search(): ", re);
            this.books = re['books'];
        }, e => this.a.alert(e));

    }


    // onClickCancel(book) {
    //     this.a.lms.session_cancel( book.idx ).subscribe( re => {
    //         console.log(re);
    //     }, e => this.a.alert(e ));
    // }
}
