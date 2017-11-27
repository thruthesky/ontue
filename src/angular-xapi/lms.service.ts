import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { XapiService } from './xapi.service';
import { UserService } from './user.service';


import { Base } from './base';

export interface SCHEDULE_EDIT extends DAYS {
    idx?:number;
    point: number;
    prere: string;
    class_begin_hour: number;
    class_begin_minute: number;
    duration: number;
}

export interface SCHEDULE extends DAYS {
    idx: number;
    idx_teacher: number;
    class_begin: number;
    class_end: number;
    original_class_begin: number;
    original_class_end: number;
    point: number;
    prere: string;
    stamp_created: number;
    user_time_days: {
        sunday: 'Y' | '',
        monday: 'Y' | '',
        tuesday: 'Y' | '',
        wednesday: 'Y' | '',
        thursday: 'Y' | '',
        friday: 'Y' | '',
        saturday: 'Y' | '',
    }
}


export type SCHEDULE_EDIT_RESPONSE = Array<SCHEDULE>

export interface DAYS {
    sunday: boolean;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
}

export interface TEACHER_LIST {
    ID: number;
    bookable_time: number;
    class_id: string;
    display_name: string;
    grade: number;
    list_order: number;
}

export type TEACHERS_LIST = Array<TEACHER_LIST>



@Injectable()
export class LMSService extends Base {

    userType = {
        teacher: 'T',
        student: 'S'
    };

    constructor(
        private x: XapiService,
        private user: UserService
    ) {
        super();
    }


    /**
     * Returns 'student' or 'teacher'.
     */
    getUserType(): '' | 'student' | 'teacher' {
        const profile = this.user.getProfile();
        if (profile['user_type']) {
            if (profile['user_type'] == 'T') return 'teacher';
            else if (profile['user_type'] == 'S') return 'student';
            else return '';
        }
        else return '';
    }
    setUserType(type) {
        let data = {
            session_id: this.user.sessionId,
            route: 'lms.set_user_type',
            type: type
        };
        return this.x.post(data);
    }

    schedule_edit(data: SCHEDULE_EDIT): Observable<SCHEDULE_EDIT_RESPONSE> {
        const defaults = {
            route: 'lms.schedule_edit',
            session_id: this.user.sessionId
        };
        data = Object.assign(defaults, data);
        return this.x.post(data);
    }

    schedule_delete(idx) {
        let data = {
            route: 'lms.schedule_delete',
            session_id: this.user.sessionId,
            idx: idx
        };
        return this.x.post(data);

    }


    getUserLocalTimezoneOffset() {

        const localTz = (new Date).getTimezoneOffset() / 60;

        let offset = Math.abs(Math.floor(localTz));
        if (localTz < 0) {
            offset = Math.abs(localTz);
        }
        else {
            offset = -1 * offset;
        }

        return offset;

    }

    timezone(): Observable<string> {
        const data = {
            route: 'lms.timezone_info',
            session_id: this.user.sessionId
        };
        return this.x.post(data);
    }



    /**
     * Get all the timezones.
     */
    timezones(): Observable<any> {
        const data = {
            route: 'lms.timezones_info'
        };
        return this.x.post(data);
    }

    timezone_set(offset): Observable<any> {
        const data = {
            route: 'lms.timezone_set',
            session_id: this.user.sessionId,
            timezone: offset
        };
        return this.x.post(data);
    }


    localeString(offset) {
        // console.log('offset: ', offset);
        const d = new Date();
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const newDate = new Date(utc + (3600000 * offset));
        return newDate.toLocaleString();
    }



    my_schedules(): Observable<any> {

        let data = {
            route: 'lms.schedule_search',
            session_id: this.user.sessionId,
            teachers: [this.user.id],
        };

        return this.x.post(data);
    }

    schedule_search(data) {
        data['route'] = 'lms.schedule_search';
        data['session_id'] = this.user.sessionId;
        return this.x.post(data);
    }


    schedule_table(data) {
        data['route'] = 'lms.new_schedule_table';
        data['session_id'] = this.user.sessionId;
        return this.x.post(data);
    }




    user_search(data) {
        data['route'] = 'lms.user_search';
        return this.x.post(data);
    }


    session_reserve( data ) {
        data['route'] = 'lms.session_reserve';
        data['session_id'] = this.user.sessionId;
        return this.x.post( data );
    }

    session_cancel( idx_reservation ) {
        let data = { idx_reservation: idx_reservation };
        data['route'] = 'lms.session_cancel';
        data['session_id'] = this.user.sessionId;
        return this.x.post( data );
    }


    session_search(data) {

        data['route'] = 'lms.session_search';
        data['session_id'] = this.user.sessionId;
        return this.x.post(data);
    }


    my_point() {
        let data = {};
        data['route'] = 'lms.my_point';
        data['session_id'] = this.user.sessionId;
        return this.x.post( data );
    }

    get_dayoffs() {
        let data = {};
        data['route'] = 'lms.dayoff_get';
        data['session_id'] = this.user.sessionId;
        return this.x.post( data );
    }


    set_dayoff( date ) {
        let data = { route: 'lms.dayoff_set', session_id: this.user.sessionId, date: date };
        return this.x.post( data );
    }

    delete_dayoff( date ) {
        let data = { route: 'lms.dayoff_delete', session_id: this.user.sessionId, date: date };
        return this.x.post( data );
    }


}
