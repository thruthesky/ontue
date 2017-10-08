import { Injectable } from '@angular/core';
import { XapiService, UserService, ForumService } from './../angular-xapi/angular-xapi-service.module';


@Injectable()
export class ShareService {

    constructor(
        public user: UserService,
        public forum: ForumService,
        public xapi: XapiService
    ) {
        xapi.setServerUrl('https://www.sonub.com');
        console.log("login: ", user.isLogin);
    }
}