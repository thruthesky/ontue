import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
@Component({
    selector: 'hook-content-bottom',
    templateUrl: 'hook-content-bottom.html'
})

export class HookContentBottomComponent implements OnInit {
    constructor(
        public a: AppService
    ) { }

    ngOnInit() { }

    onClickTop() {
        document.querySelector('.scroll-content').scrollTo(0,0);
    }
}