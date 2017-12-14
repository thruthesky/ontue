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

    ngOnInit() { }

    slideChanged() {
        let currentIndex = this.slides.getActiveIndex();
        if ( currentIndex > 4 ) currentIndex = 4; // bug
        this.on = currentIndex;
        console.log('Current index is', currentIndex);
    }

}