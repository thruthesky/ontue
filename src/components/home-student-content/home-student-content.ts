import { Component, OnInit } from '@angular/core';

import { AppService } from './../../providers/app.service';
@Component({
    selector: 'home-student-content-component',
    templateUrl: 'home-student-content.html'
})

export class HomeStudentContentComponent implements OnInit {


    // stats;
    showMoreMyOwnPlan_1 = false;
    showMoreMyOwnPlan_2 = false;
    showMoreMyOwnPlan_3 = false;
    moreAboutKatalkEnglish = false;

    moreAbout1 = false;
    moreAbout2 = false;
    moreAbout3 = false;
    moreAbout4 = false;

    teachers = [];
    total_teachers = 0;


    show = {};
    constructor(
        public a: AppService
    ) {
        this.loadTeachers();
    }

    ngOnInit() { }


    showMoreMyOwnPlan() {
        setTimeout(() => this.showMoreMyOwnPlan_1 = true, 100);
        setTimeout(() => this.showMoreMyOwnPlan_2 = true, 300);
        setTimeout(() => this.showMoreMyOwnPlan_3 = true, 500);
    }


    showMoreAboutKatalkEnglish() {

        this.moreAboutKatalkEnglish = true;

        setTimeout(() => this.moreAbout1 = true, 100);
        setTimeout(() => this.moreAbout2 = true, 1000);
        setTimeout(() => this.moreAbout3 = true, 2000);
        setTimeout(() => this.moreAbout4 = true, 3000);

    }

    loadTeachers() {
        this.a.lms.teacher_list({
            recommend: true,
            page_no: 1,
            limit: 6
        }).subscribe(re => {
            // console.log("teachers: ", re);
            this.teachers = re['teachers'];
            this.total_teachers = re['total'];
        });
    }

}