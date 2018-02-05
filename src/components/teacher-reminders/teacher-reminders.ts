import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';
import {ModalController} from "ionic-angular";
import {HowToInstallKakaoComponent} from "../how-to-install-kakao/how-to-install-kakao";


@Component({
  selector: 'teacher-reminders-component',
  templateUrl: 'teacher-reminders.html'
})
export class TeacherRemindersComponent {

  constructor(
      public a: AppService,
      public modalCtrl: ModalController
    ) {
  }

  showKakaoInstall(){
    const modal = this.modalCtrl.create( HowToInstallKakaoComponent );
    modal.onDidDismiss(()=> {});
    modal.present();
  }
  
}
