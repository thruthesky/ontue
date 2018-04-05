import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { AppService } from './../../providers/app.service';
import { SCHEDULE_EDIT } from './../../angular-xapi/lms.service';

@Component({
    selector: 'add-schedule',
    templateUrl: 'add-schedule.html'
})

export class AddSchedule {

    timezone_offset = 0;
    timezone_name = 0;
    time = '';
    timer = 0;
    data: SCHEDULE_EDIT = <SCHEDULE_EDIT>{};
    allDays: boolean = false;
    params;

    php_to_kwr;
    usd_to_kwr;
    share_teacher;
    max_point_per_minute;


    payment_method = 'paypal';

    constructor(
        public a: AppService,
        public viewCtrl: ViewController,
        public navParams: NavParams
    ) {
        this.params = navParams.data;
        this.php_to_kwr = this.params['php_to_kwr'];
        this.usd_to_kwr = this.params['usd_to_kwr'];
        this.share_teacher = this.params['share_teacher'];
        this.max_point_per_minute = this.params['max_point_per_minute'];

        console.log('params', this.params['schedule']);
        this.updateTime();
        if (this.params.schedule && this.params.schedule.idx) {
            let s = this.params.schedule;
            this.data = {
                idx: s.idx,
                point: s.point,
                prere: s.prere,
                class_begin_hour: s.user_time_class_begin.substr(0, 2),
                class_begin_minute: s.user_time_class_begin.substr(2, 2),
                duration: s.duration,
                sunday: s.user_time_days.sunday,
                monday: s.user_time_days.monday,
                tuesday: s.user_time_days.tuesday,
                wednesday: s.user_time_days.wednesday,
                thursday: s.user_time_days.thursday,
                friday: s.user_time_days.friday,
                saturday: s.user_time_days.saturday
            }
        }
    }


    updateTime() {
        if (this.timezone_name) {
            // console.log('this. timezone ', this.timezone_offset)
            this.time = this.a.lms.localeString(this.timezone_offset);
            // console.log( this.time );
        }
        this.timer = setTimeout(() => this.updateTime(), 1000);
    }

    ngOnInit() {
        this.a.lms.timezone().subscribe(re => {
            this.timezone_name = re['name'];
            this.timezone_offset = parseInt(re['offset']);
        }, () => { });
    }

    ngOnDestroy() {
        if (this.timer) clearTimeout(this.timer);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }


    checkEmptySchedule() {
        const s = this.data;
        if (!s.sunday && !s.monday && !s.tuesday && !s.wednesday && !s.thursday && !s.friday && !s.saturday) {
            return true;
        }
        return false;
    }
    onSubmit() {
        // return console.log('data::', this.data);

        if (this.checkEmptySchedule()) {
            this.a.okDialog('Warning: Select Days!', `You need to select days to add/edit a schedule.`);
            return;
        }
        this.a.showLoader();
        this.a.lms.schedule_edit(this.data).subscribe(re => {
            console.log('re: ', re);
            this.a.hideLoader();
            if (re['schedule']['idx']) {
                if (this.data.idx) this.a.showAlert('Update Success', "Schedule was update successful.");
                else this.a.showAlert('Create Success', "New Schedule was created.");
                this.viewCtrl.dismiss();
            }
        }, e => {
            this.a.alert(e);
            this.a.hideLoader();
        })
    }

    onClickAllDays() {
        if (!this.allDays) {
            this.data['sunday'] = true;
            this.data['monday'] = true;
            this.data['tuesday'] = true;
            this.data['wednesday'] = true;
            this.data['thursday'] = true;
            this.data['friday'] = true;
            this.data['saturday'] = true;
        } else {
            this.data['sunday'] = false;
            this.data['monday'] = false;
            this.data['tuesday'] = false;
            this.data['wednesday'] = false;
            this.data['thursday'] = false;
            this.data['friday'] = false;
            this.data['saturday'] = false;
        }
    }


    calculateEarning() {
        let c = this.countSelectedDays();
        let point = this.data.point * c * 4; // 20 days.
        if (!point) return 0;
        point = Math.ceil(point);
        let php = parseFloat(this.php_to_kwr);
        if (!php) return 0;
        console.log("php: ", this.payment_method);


        let amount = Math.round(point / php * this.share_teacher / 100);
        if (this.payment_method == 'western-union') {
            amount = Math.round(amount * 94 / 100); // @see https://docs.google.com/document/d/1ZpGsmKhnjqE9estnjr_vl9DcjdpeMSgxTz4B4eoTm7c/edit#heading=h.yjz5bpwzcj9j
        }

        return amount;

    }

    countSelectedDays() {

        let c = 0;
        if (this.data['sunday']) c++;
        if (this.data['monday']) c++;
        if (this.data['tuesday']) c++;
        if (this.data['wednesday']) c++;
        if (this.data['thursday']) c++;
        if (this.data['friday']) c++;
        if (this.data['saturday']) c++;

        return c;

    }


    maxPoint() {
        if (!this.data['point']) return 0;
        if (!this.data['duration']) return 0;
        return this.data['point'] > this.data['duration'] * this.max_point_per_minute;
    }
}


