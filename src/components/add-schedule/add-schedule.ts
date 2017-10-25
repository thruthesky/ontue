import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
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
    data:SCHEDULE_EDIT = <SCHEDULE_EDIT> {};
    constructor(
        public a: AppService,
        public viewCtrl: ViewController
    ) {
        this.updateTime();
    }


    updateTime() {
        if ( this.timezone_name ) {
            // console.log('this. timezone ', this.timezone_offset)
            this.time = this.a.lms.localeString( this.timezone_offset );
            // console.log( this.time );
        }
        this.timer = setTimeout( () => this.updateTime(), 1000 );
    }

    ngOnInit() {
        this.a.lms.timezone().subscribe( re => {
            this.timezone_name = re['name'];
            this.timezone_offset = parseInt(re['offset']);
         } );
    }

    ngOnDestroy() {
        if ( this.timer ) clearTimeout( this.timer );
    }
    
    dismiss() {
        this.viewCtrl.dismiss();
    }

    
    onSubmit() {

        this.a.lms.schedule_edit( this.data ).subscribe( re => {
            console.log('re: ', re);
            this.a.alert("SUCESS: A schedule has been added.");
        }, e => this.a.alert( e ) );
    }



}


