import { Component, Input, OnInit  } from '@angular/core';
import { AppService } from './../../providers/app.service';
import {ModalController} from "ionic-angular";

@Component({
  selector: 'teacher-activity-log-component',
  templateUrl: 'teacher-activity-log.html'
})
export class TeacherActivityLogComponent implements OnInit  {

  @Input() actv = [];

  constructor(
      public a: AppService,
      public modalCtrl: ModalController
    ) {
    
    }

  ngOnInit() { }
  

}
