
import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';


@Component({
    selector: 'student-register-success-page',
    templateUrl: 'student-register-success.html'
})
export class StudentRegisterSuccessPage {
    constructor(
        public a: AppService
    ) {
        window['gtag']('event', 'conversion', { 'send_to': 'AW-1059724698/td9VCKnX93sQmruo-QM' });
    }
}
