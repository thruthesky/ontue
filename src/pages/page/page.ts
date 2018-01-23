import { Component, Input } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { AppService } from '../../providers/app.service';
@Component({
    selector: 'page-page',
    templateUrl: 'page.html'
})
export class PagePage {
    @Input() name;
    content = null;
    constructor(
        public a: AppService,
        public navParams: NavParams
    ) {
        this.name = navParams.get('name');
    }
    ngAfterViewInit() {
        this.a.lms.page( { name: this.name } ).subscribe(re => this.content = re, () => {});
    }
}


