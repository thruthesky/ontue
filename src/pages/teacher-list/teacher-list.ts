import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';




@Component({
  selector: 'page-teacher-list',
  templateUrl: 'teacher-list.html'
})
export class TeacherListPage {

  constructor(
    public a: AppService
  ) {
      
    


    a.lms.user_search( { type: 'T' }).subscribe( re => {
        console.log("user search: ", re);
    }, e => a.alert(e));

    
  }

  
}
