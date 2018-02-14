import { Component, Input, OnInit,} from '@angular/core';
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

  more($id){
    document.getElementById(('less_'+$id)).classList.remove('d-none');
    document.getElementById(('less_'+$id)).classList.add('hide-effect');
    document.getElementById(('more_'+$id)).classList.add('d-none');
  }

  less($id){
    document.getElementById(('less_'+$id)).classList.add('d-none');
    document.getElementById(('more_'+$id)).classList.remove('d-none');
    document.getElementById(('more_'+$id)).classList.add('hide-effect');
  }
  
}
