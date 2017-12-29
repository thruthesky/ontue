import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';


@Component({
    selector: 'schedule-available-page',
    templateUrl: 'schedule-available.html'
})

export class ScheduleAvailablePage implements OnInit {
    re = null;
    pageInLoading = true;
    loading = {};
    constructor(
        public a: AppService
    ) {
        a.lms.schedule_available().subscribe( re => {
            this.pageInLoading = false;
            this.re = re;
            console.log("schedule_available(): ", re);
        }, e => a.alert(e) );
    }

    ngOnInit() { }

    onClickSchedule(schedule) {
        this.loading[ schedule.idx ] = true;
        this.a.lms.session_reserve( { idx_schedule: schedule.idx, date: schedule.date } ).subscribe( re => {
            this.loading[ schedule.idx ] = false;
            let ss = this.re.available_schedules;
            this.re.available_schedules = ss.filter( i => i['idx'] != schedule.idx );
            this.a.alert("예약을 하였습니다. 수업 예약 메뉴에서 확인을 하세요.");
            console.log(re);
        }, e => {
            this.loading[ schedule.idx ] = false;
            this.a.alert(e);
        });
    }
}