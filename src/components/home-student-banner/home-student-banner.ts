import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
    selector: 'home-student-banner-component',
    templateUrl: 'home-student-banner.html'
})

export class HomeStudentBannerComponent implements OnInit, AfterViewInit {

    beginAni = false;
    no = 0;
    intervals = [4000, 4500, 4500, 8000];
    constructor() { }

    ngOnInit() { }


    ngAfterViewInit() {
        setTimeout(() => this.begin(), 3000);
    }


    begin() {
        this.beginAni = true;
        this.dropDown();
    }

    dropDown() {
        setTimeout(() => this.animate(), 1000);
    }

    animate() {
        console.log("animate: ", this.no);
        if (this.no >= this.intervals.length) this.no = 0;
        setTimeout(() => {
            this.no++;
            this.animate();
        }, this.intervals[this.no]);
    }
}