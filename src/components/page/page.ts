import { Component, Input } from '@angular/core';
import { AppService } from '../../providers/app.service';
@Component({
    selector: 'page',
    template: `
    page name: {{ name }}
    <section class="page {{name}}" [innerHTML]=" content "></section>
    `
})
export class PageComponent {
    @Input() name;
    content = null;
    constructor(
        public a: AppService
    ) {
    }
    ngAfterViewInit() {
        this.a.lms.page( { name: this.name } ).subscribe(re => this.content = re);
    }
}