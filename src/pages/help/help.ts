import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';


@Component({
    selector: 'help-page',
    templateUrl: 'help.html'
})

export class HelpPage implements OnInit {
    constructor(
        public a: AppService
    ) { }

    ngOnInit() { }
}
