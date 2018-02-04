import { Component, Input, OnInit  } from '@angular/core';
import { AppService } from './../../providers/app.service';


@Component({
  selector: 'teacher-statistics-component',
  templateUrl: 'teacher-statistics.html'
})
export class TeacherStatisticsComponent implements OnInit  {

  @Input() no_teachers = [];
  @Input() no_students = [];
  @Input() no_reservations = [];
  @Input() no_pasts = [];

  constructor(
      public a: AppService,
    ) {
    
    }

  ngOnInit() { }
  
}
