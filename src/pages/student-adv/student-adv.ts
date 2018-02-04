
import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';


@Component({
    selector: 'student-adv-page',
    templateUrl: 'student-adv.html'
})
export class StudentAdvPage {
    constructor(
        public a: AppService
    ) {
        
    }
}
