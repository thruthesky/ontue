import { Component } from '@angular/core';

import { AppService } from './../../providers/app.service';



@Component({
    selector: 'header-content',
    templateUrl: 'header.html'
})
export class HeaderComponent {

    
    constructor(
        public a: AppService
    ) {

    }

    ngAfterViewInit() {
    }


}
