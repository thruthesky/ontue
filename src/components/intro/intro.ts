import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { AppService } from '../../providers/app.service';
@Component({
    selector: 'intro-component',
    templateUrl: 'intro.html'
})

export class IntroComponent
    // implements OnInit
    {

    @ViewChild(Slides) slides: Slides;

    on = 0;

    constructor(
        public a: AppService
    ) {

    }

    // ngOnInit() {
    //     setTimeout(x => this.slides.slideTo(2), 200);
    // }

    slideChanged() {
        let currentIndex = this.slides.getActiveIndex();
        console.log('Current index is', currentIndex);
        if ( currentIndex > 2 ) currentIndex = 2; // bug
        this.on = currentIndex;
    }

}