import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';



@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  
  constructor(public a: AppService) {

    
  }

}
