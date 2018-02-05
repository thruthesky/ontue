import { Component, Input, OnInit  } from '@angular/core';
import { AppService } from './../../providers/app.service';


@Component({
  selector: 'teacher-evaluations-component',
  templateUrl: 'teacher-evaluations.html'
})
export class TeacherEvaluationsComponent implements OnInit  {

  @Input() evaluations = [];

  constructor(
      public a: AppService,
    ) {
    
    }

  ngOnInit() { }
  
}
