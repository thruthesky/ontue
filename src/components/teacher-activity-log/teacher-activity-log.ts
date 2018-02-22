import { Component, OnInit  } from '@angular/core';
import { AppService } from './../../providers/app.service';
import {ModalController} from "ionic-angular";

@Component({
  selector: 'teacher-activity-log-component',
  templateUrl: 'teacher-activity-log.html'
})
export class TeacherActivityLogComponent implements OnInit  {

  actv = {
    visit: " visit the site.",
    login: " has log in.",
    'open-register': " visit the registration.",
    register: " has registered.",
    'view-profile': " has view the profile of ",
    'update-profile': " update profile.",
    reserve: " made reservation to ",
    cancel: " cancel reservation ",
    payment: " trying to pay ",
    evaluate: " evaluate to student ",
    comment: " comment to teacher"
  };

  constructor(
      public a: AppService,
      public modalCtrl: ModalController
    ) {

    }

  ngOnInit() { }


}
