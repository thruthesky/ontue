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


    today = new Date();
    constructor(public a: AppService) {

      this.date = this.today.getFullYear() + '-' + this.a.add0(this.today.getMonth()+1) + '-' + this.a.add0(this.today.getDate());

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

    preDate(date) {
        if (!date) return '';
        let y = date.slice(0, 4);
        let m = date.slice(4, 6);
        let d = date.slice(6, 9);
        return `${y}-${m}-${d}`;
      }


}

