import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';

@Component({
    selector: 'message-page',
    templateUrl: 'message.html'
})
export class MessagePage {


    data = null;
    page_no = 1;
    message_count;
    no_of_post;
    box = "inbox";

    constructor(
        public a: AppService
    ) {

        this.loadMessage( { box: this.box } );

    }


    onClickBox( box ) {
        this.box = box;
        this.loadMessage( { box: this.box } );
    }


    loadMessage( o ) {


        this.a.lms.message( o ).subscribe( re => {
            console.log(re);
            this.data = re;
        }, e => this.a.alert(e) );

    }

    onClickPrevious() {
      this.page_no--;
      this.loadMessage({box: this. box});
    }

    onClickNext() {
      this.page_no++;
      this.loadMessage({box: this. box});
    }



}
