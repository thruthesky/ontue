import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';

@Component({
    selector: 'teacher-dayoff-page',
    templateUrl: 'teacher-dayoff.html'
})
export class TeacherDayoffPage {


    dayoffs = [];
    date;
    showForm = false;
    constructor(public a: AppService) {


        this.loadDayoffs();

    }

    loadDayoffs() {
        this.a.lms.get_dayoffs().subscribe( re => this.dayoffs, e => this.a.alert(e) );
    }

    onClickCreateDayoff() {
        this.showForm = true;
    }
}

