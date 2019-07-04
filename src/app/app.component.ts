import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ProfileService } from './api/profile.service';
import { NetworkService } from './api/network.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private profile: ProfileService,
    private nav: NavController,
    public networkService: NetworkService
  ) {
    this.initializeApp();
    this.networkService
      .getNetworkStatus()
      .pipe(debounceTime(300))
      .subscribe((connected: boolean) => {
        console.log('app [Home] connected', connected);
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.profile.profileInit().then((isLoggedIn) => {
        console.log("Init user ", isLoggedIn)
        if (isLoggedIn) {
          this.nav.navigateRoot('/home')
        } else {
          this.nav.navigateRoot('/login')
        }
      }).catch((error) => {
        console.log("Init error ", error)
        this.nav.navigateRoot('/login')
      })


    });


  }
}
