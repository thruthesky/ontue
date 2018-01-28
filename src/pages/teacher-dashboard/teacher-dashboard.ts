import { Component } from '@angular/core';
import { AppService } from '../../providers/app.service';
import {TeacherPolicyComponent} from "../../components/teacher-policy/teacher-policy";
import {ModalController} from "ionic-angular";
@Component({
  selector: 'teacher-dashboard-page',
  templateUrl: 'teacher-dashboard.html'
})

export class TeacherDashboardPage {

  _modal = {
    teacherPolicy: TeacherPolicyComponent
  };

  constructor(
    public a: AppService,
    public modalCtrl: ModalController
  ) {


  }

  ngOnInit() {

  }

  showModal(modal_name) {
    const modal = this.modalCtrl.create( this._modal[modal_name] );
    modal.onDidDismiss(()=> {});
    modal.present();
  }

}
