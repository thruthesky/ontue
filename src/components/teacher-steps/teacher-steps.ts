import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';
import {HowToInstallKakaoComponent} from "../how-to-install-kakao/how-to-install-kakao";
import {ModalController} from "ionic-angular";

@Component({
  selector: 'teacher-steps-component',
  templateUrl: 'teacher-steps.html'
})
export class TeacherStepComponent {

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
