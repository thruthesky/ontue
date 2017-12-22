import { Component, Input } from '@angular/core';

import { AppService } from './../../providers/app.service';



@Component({
    selector: 'header-content',
    templateUrl: 'header.html'
})
export class HeaderComponent {

    @Input() page = '';
    constructor(
        public a: AppService
    ) {

    }

    


}
