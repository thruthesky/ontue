import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { XapiService } from './xapi.service';
export * from './xapi.service';

import { ForumService } from './forum.service';
export { ForumService } from './forum.service';
import { UserService } from './user.service';
export { UserService } from './user.service';
import { FileService } from './file.service';
export { FileService } from './file.service';

export { SERVER_ERROR_CODE } from './interfaces';

@NgModule({
    imports: [
        HttpClientModule
    ],
    exports: [],
    declarations: [],
    providers: [XapiService, ForumService, UserService, FileService],
})
export class AngularXapiModule { }
