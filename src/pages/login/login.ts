import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI {

  mobile: any;
  password: any;
  errorMessage: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    public storage: Storage) {
    super();
  }

  login() {
    var loading = super.showLoading(this.loadingCtrl, "登录中...");
    this.rest.login(this.mobile, this.password)
      .subscribe(
        f => {
          console.log("f['Status']=" + f['Status']);
          if (f["Status"] == "OK") {
            //处理登录成功的页面跳转
            //也可以存储接口返回的 token
            this.storage.set('UserId',f["UserId"]);
            loading.dismiss();
            this.dismiss();
          } else {
            loading.dismiss();
            console.log("f['StatusContent']=" + f['StatusContent']);
            // super.showToast(this.toastCtrl, f["StatusContent"]);
            super.showToast(this.toastCtrl, '登录失败，请重新输入！');
          }
        },
        error => this.errorMessage = <any>error
      )
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
