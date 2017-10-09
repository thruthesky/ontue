import { Injectable } from '@angular/core';



import { SchedulePage } from '../pages/schedule/schedule';
import { ForumPage } from '../pages/forum/forum';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { MenuPage } from '../pages/menu/menu';

import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';


@Injectable()
export class ShareService {


    pages = {
        home: {
            component: HomePage
        },
        forum: {
            component: ForumPage
        },

        schedule: {
            component: SchedulePage
        },

        menu: {
            component: MenuPage
        },

        settings: {
            component: SettingsPage
        },

        register: {
            component: RegisterPage
        },
        login: {
            component: LoginPage
        }
    };



    constructor() { }
}