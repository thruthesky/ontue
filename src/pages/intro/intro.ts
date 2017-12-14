import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
@Component({
    selector: 'intro-page',
    templateUrl: 'intro.html'
})

export class IntroPage implements OnInit {

    @ViewChild(Slides) slides: Slides;

    on = 0;

    constructor() {

    }

    ngOnInit() {
        setTimeout(x => this.slides.slideTo(2), 100);
    }

    slideChanged() {
        let currentIndex = this.slides.getActiveIndex();
        console.log('Current index is', currentIndex);
        if ( currentIndex > 2 ) currentIndex = 2; // bug
        this.on = currentIndex;
    }

}