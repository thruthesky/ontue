import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { AppService } from './../../providers/app.service';
import { ChooseUserTypeModal } from './../../components/choose-user-type-modal/choose-user-type-modal';


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {


  constructor(
    public modalCtrl: ModalController,
    public a: AppService
  ) {



    // test
    // setTimeout(() => this.presentChooseUserTypeModal(), 50);
  }




  presentChooseUserTypeModal() {
    const modal = this.modalCtrl.create(ChooseUserTypeModal);
    modal.present();
  }

}


