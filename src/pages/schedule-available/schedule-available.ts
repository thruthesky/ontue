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
            // console.log("schedule_available(): ", re);
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
            this.a.okDialog( '즉시 수업', '<div class="my-3">지금 곧 시작하는 수업을 예약 하였습니다.</div>수업 예약 페이지로 이동을 합니다.', () => this.a.open('session-future') );
            // console.log(re);
        }, e => {
            this.loading[ schedule.idx ] = false;
            this.a.alert(e);
        });
    }

    class_begin( schedule ) {
        let begin = schedule.user_time_class_begin;
        let h = begin.substr(0, 2);
        let m = begin.substr(2, 2);
        return h + ':' + m;
    }
}
