import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';

@Component({
    selector: 'my-point-page',
    templateUrl: 'my-point.html'
})

export class MyPointPage implements OnInit {
    point;
    constructor(
        public a: AppService
    ) {
        this.a.loadMyPoint(p => {
            this.point = p;
        });
     }

    ngOnInit() { }
}