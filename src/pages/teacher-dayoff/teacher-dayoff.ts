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
        this.a.lms.get_dayoffs().subscribe( re => this.dayoffs = re['dayoffs'], e => this.a.alert(e) );
    }

    onClickCreateDayoff() {
        this.showForm = true;
    }

    onClickSubmit() {
        let date = this.date.replace(/\-/g, '');
        this.a.lms.set_dayoff( date ).subscribe( re => {
            console.log(re);
            this.loadDayoffs();
        }, e => this.a.alert(e) );
    }

    onClickDeleteDate( dayoff ) {
        this.a.lms.delete_dayoff( dayoff.date ).subscribe( re => {
            console.log(re);
            // this.loadDayoffs();
            let idx = re['idx_dayoff'];
            this.dayoffs = this.dayoffs.filter( dayoff => dayoff['idx'] != idx );
        }, e => this.a.alert(e) );
    }
}

