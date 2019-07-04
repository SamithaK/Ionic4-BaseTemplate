import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonFunctionsService {
  loaderToShow: any; // loading controller
  constructor(public alertController: AlertController, public loadingCtrl: LoadingController, public toastController: ToastController, ) { }

  //to show simple alert
  async showSimpleAlert(title, message, buttonText?, callback?, cancelBtn?) {
    var buttons: any = [
      {
        text: buttonText ? buttonText : "OK",
        handler: callback
      }
    ]
    if (cancelBtn) {
      buttons.push({
        text: 'Cancel',
        role: 'cancel'
      });
    }
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: buttons
    });
    await alert.present();
  }

  //loading controller present function
  showLoader(message) {
    this.loaderToShow = this.loadingCtrl.create({
      message: message
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });

  }

  //loading controller hide function
  hideLoader() {
    setTimeout(() => {
      this.loadingCtrl.dismiss();
    }, 600);
  }

  // toast mesage function
  async presentToast(message, color?) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color:color?color:'medium'
    });
    setTimeout(() => {
      toast.present();
    }, 600);
  }


}
