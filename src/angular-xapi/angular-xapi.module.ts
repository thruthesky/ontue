import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { XapiService } from './xapi.service';
export { XapiService } from './xapi.service';

import { ForumService } from './forum.service';
export { ForumService } from './forum.service';
import { UserService } from './user.service';
export { UserService } from './user.service';
import { FileService } from './file.service';

import { LMSService } from './lms.service';
export { LMSService } from './lms.service';




export { SERVER_ERROR_CODE } from './interfaces';

@NgModule({
    imports: [
        HttpClientModule
    ],
    exports: [],
    declarations: [],
    providers: [XapiService, ForumService, UserService, FileService, LMSService],
})
export class AngularXapiModule { }
