import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../providers/app.service';


@Component({
    selector: 'hook-content-top',
    templateUrl: 'hook-content-top.html'
})

export class HookContentTopComponent implements OnInit {

    @Input() showLoginBox = true;
    constructor(
        public a: AppService
    ) { }

    ngOnInit() { }
}