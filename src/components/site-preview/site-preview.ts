import { Component, Input } from '@angular/core';
import { AppService } from './../../providers/app.service';
import { SITE_PREVIEW } from './../../angular-xapi/interfaces';
@Component({
  selector: 'site-preview-widget',
  templateUrl: 'site-preview.html'
})

export class SitePreviewWidget {
  @Input() preview: SITE_PREVIEW;
  @Input() loading: boolean = false;
  @Input() edit: boolean = false;

  constructor(
    public app: AppService
  ) {
    console.log('SitePreview Init::', this.preview);
  }

  onClickDelete() {
    console.log("deleting site preview: ", this.preview.id );
    this.app.forum.deletePreview( this.preview.id ).subscribe( res => {
      this.preview.id = 0;
      this.preview.content = '';
      this.preview.title = '';
      this.preview.url = '';
      this.preview.url_image = '';
    }, e => this.app.showError(e) );
  }
}
