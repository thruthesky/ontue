import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';

@Component({
    selector: 'message-page',
    templateUrl: 'message.html'
})
export class MessagePage {


    data = null;

    constructor(
        public a: AppService
    ) {

        this.loadMessage( { box: 'inbox' } );

    }


    onClickBox( box ) {

        this.loadMessage( { box: box } );
    }


    loadMessage( o ) {


        this.a.lms.message( o ).subscribe( re => {
            console.log(re);
            this.data = re;
        }, e => this.a.alert(e) );
        
    }
}