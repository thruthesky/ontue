import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
@Component({
    selector: 'policy-page',
    templateUrl: 'policy.html'
})
export class PolicyPage {
    constructor(
        public a: AppService
    ) {
    }
}
