import { Component } from '@angular/core';

import { SchedulePage } from '../schedule/schedule';
import { ForumPage } from '../forum/forum';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SchedulePage;
  tab3Root = ForumPage;
  tab4Root = SettingsPage;

  constructor() {

  }
}
