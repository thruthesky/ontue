import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';


@Component({
    selector: 'hook-content-top',
    templateUrl: 'hook-content-top.html'
})

export class HookContentTopComponent implements OnInit {
    constructor(
        public a: AppService
    ) { }

    ngOnInit() { }
}