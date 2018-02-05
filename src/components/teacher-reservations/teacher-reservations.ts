import { Component, Input, OnInit  } from '@angular/core';
import { AppService } from './../../providers/app.service';


@Component({
  selector: 'teacher-reservations-component',
  templateUrl: 'teacher-reservations.html'
})
export class TeacherReservationsComponent implements OnInit  {

  @Input() reservations = [];

  constructor(
      public a: AppService,
    ) {
    
    }

  ngOnInit() { }
  
  getLastTwo(text){
    return text.slice(2,5);
  }

  getFirstTwo(text){
    return text.slice(0,2);
  }
}
