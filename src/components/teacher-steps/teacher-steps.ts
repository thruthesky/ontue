import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';
import {HowToInstallKakaoMobileComponent} from "../how-to-install-kakao-mobile/how-to-install-kakao-mobile";
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
    const modal = this.modalCtrl.create( HowToInstallKakaoMobileComponent );
    modal.onDidDismiss(()=> {});
    modal.present();
  }
}
