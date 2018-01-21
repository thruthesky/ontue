import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
    selector: 'home-student-banner-component',
    templateUrl: 'home-student-banner.html'
})

export class HomeStudentBannerComponent implements OnInit, AfterViewInit {

    // if it is set to -1, it's not debugging.
    debugging = -1;  // When you debug a page, set it to animation number from 0.
    
    beginAni = false;
    no = 0;
    intervals = [4000, 5000, 6000, 12000];
    constructor() { }

    ngOnInit() { }

    ngAfterViewInit() {
        this.debug();
        setTimeout(() => this.begin(), 3000); // real
    }

    debug() {
        if ( this.debugging == -1 ) return;
        this.no = this.debugging;
        this.beginAni = true;
    }


    begin() {
        if ( this.debugging != -1 ) return;
        this.beginAni = true;
        this.dropDown();
    }

    dropDown( timeout = 1000) {
        setTimeout(() => this.animate(), timeout);
    }

    animate() {
        if ( this.debugging != -1 ) return;
        console.log("animate: ", this.no);
        if (this.no >= this.intervals.length) this.no = 0;
        setTimeout(() => {
            this.no++;
            this.animate();
        }, this.intervals[this.no]);
    }
}