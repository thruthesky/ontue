import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
@Component({
    selector: 'help-page',
    templateUrl: 'help.html'
})
export class HelpPage implements OnInit {
    // re = null;
    constructor(
        public a: AppService
    ) {
        // a.lms.info().subscribe( re => {
        //     this.re = re;
        //     console.log(this.re);
        //  }, () => {} );
    }
    ngOnInit() { }
}
