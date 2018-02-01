import { Component, Input } from '@angular/core';

import { AppService } from '../../providers/app.service';



@Component({
    selector: 'teacher-header-component',
    templateUrl: 'teacher-header.html'
})
export class TeacherHeaderComponent {

    // @Input() page = '';
    @Input() title = null;
    constructor(
        public a: AppService
    ) {

    }

    // showMenu() {

    //   this.a.open('menu');
    //   // if ( this.a.teacherTheme ) this.a.open('teacher-dashboard');
    //   // else this.a.open('menu');
    // }

}
