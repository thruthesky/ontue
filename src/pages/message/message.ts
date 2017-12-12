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
    limit = 10;
    box = "inbox";

    constructor(
        public a: AppService
    ) {

        this.loadMessage( { box: this.box, page_no: this.page_no, limit: this.limit  } );

    }


    onClickBox( box ) {
        this.box = box;
        this.loadMessage( { box: this.box, page_no: 1, limit: this.limit  } );
    }


    loadMessage( o ) {
        this.a.lms.message( o ).subscribe( re => {
            console.log(re);
            this.data = re;
            this.message_count = this.data.messages.length;
        }, e => this.a.alert(e) );

    }

    onClickPrevious() {
      this.page_no--;
      this.loadMessage({box: this. box, page_no: this.page_no, limit: this.limit });
}

    onClickNext() {
      this.page_no++;
      this.loadMessage({box: this. box, page_no: this.page_no, limit: this.limit});
    }



}
