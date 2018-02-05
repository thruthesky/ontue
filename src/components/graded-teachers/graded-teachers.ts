import {Component, Input, OnInit  } from '@angular/core';
import { AppService } from './../../providers/app.service';

@Component({
  selector: 'graded-teachers-component',
  templateUrl: 'graded-teachers.html'
})
export class GradedTeachersComponent implements OnInit  {
  @Input() teachers = [];

  constructor(
      public a: AppService,
    ) {
    
    }

  ngOnInit() { }
  
}
