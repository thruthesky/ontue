import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';



@Component({
  selector: 'how-to-use-page',
  templateUrl: 'how-to-use.html'
})
export class HowToUsePage {


  constructor(
    public a: AppService
  ) {

  }


}

