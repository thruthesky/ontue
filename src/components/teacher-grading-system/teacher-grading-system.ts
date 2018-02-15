import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';
import {TeacherGradeComponent} from "../teacher-grade/teacher-grade";
import {ModalController} from "ionic-angular";

@Component({
  selector: 'teacher-grading-system-component',
  templateUrl: 'teacher-grading-system.html'
})
export class TeacherGradingSystemComponent {
  constructor(
      public a: AppService,
      public modalCtrl: ModalController
    ) {
  }



  showGradeModal(grade){
    const modal = this.modalCtrl.create( TeacherGradeComponent, {grade: grade} );
    modal.onDidDismiss(()=> {});
    modal.present();
  }

}
