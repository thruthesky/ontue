import { Component, OnInit } from '@angular/core';
import { AppService } from './../../providers/app.service';

@Component({
    selector: 'choose-user-type-component',
    templateUrl: 'choose-user-type.html'
})

export class ChooseUserTypeComponent implements OnInit {
    constructor(
        public a: AppService
    ) {

    }

    ngOnInit() { }

    onClickType(type) {
        this.a.showLoader();
        this.a.lms.setUserType(type).subscribe(re => {
            console.log("seType:", re);
            if (re.user_type == this.a.lms.userType.student) {
                this.a.user.loadProfile()
                .subscribe(
                    re => this.a.open('schedule'),
                    e => this.a.alert( e )
                );
            }
            else if (re.user_type == this.a.lms.userType.teacher) {
                this.a.user.loadProfile()
                    .subscribe(
                        re => this.a.open('teacher-profile'),
                        e => this.a.alert( e )
                    );
            }
            else {
                this.a.alert("Wrong user type");
            }
        }, e => this.a.alert( e ));
    }
}