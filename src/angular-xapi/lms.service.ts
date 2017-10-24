import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { XapiService } from './xapi.service';
import { UserService } from './user.service';


import { Base } from './base';

export interface SCHEDULE_EDIT {
    point: number;
    prere: string;
    class_begin_hour: number;
    class_begin_minute: number;
    duration: number;
    sunday: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
};


export interface SCHEDULE_EDIT_RESPOSE {
};



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
    setUserType( type ) {
        let data = {
            session_id: this.user.sessionId,
            route: 'lms.set_user_type',
            type: type
        };
        return this.x.post(data);
    }

    schedule_edit(data: SCHEDULE_EDIT): Observable<SCHEDULE_EDIT_RESPOSE> {
        const defaults = {
            route: 'lms.schedule_edit',
            session_id: this.user.sessionId
        };
        data = Object.assign( defaults, data );
        return this.x.post( data );
    }
    

}
