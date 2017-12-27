import { Component } from '@angular/core';
import { AppService } from './../../providers/app.service';


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  date_today;
  today = new Date();
  constructor(
    public a: AppService
  ) {

      this.date_today = this.today.getFullYear() + '-' + this.a.add0(this.today.getMonth()+1) + '-' + this.a.add0(this.today.getDate());


    // test
    // setTimeout(() => this.presentChooseUserTypeModal(), 50);
  }

  add0(n: number): string {
    if (!n) return;
    return n < 10 ? '0' + n : n.toString();
  }


}


