import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ModalController, Events } from 'ionic-angular';
import { Users } from '../../provider/Users';
import { Tools } from '../../provider/Tools';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  controls: any = [
    {
      id: 'name',
      name: '账号名字',
      type: 2,
      required: true
    },
    {
      id: 'pay_name',
      name: '支付宝姓名',
      type: 2,
      required: true,
      placeholder: "输入支付宝实名认证姓名"
    },
    {
      id: 'pay_account',
      name: '支付宝账号',
      type: 2,
      required: true
    }
  ];

  profile: any = {};
  constructor(public navCtrl: NavController,
    private users: Users,
    private tools: Tools,
    private app: App,
    private events: Events,
    // private modalCtrl: ModalController,
    public navParams: NavParams) {

    this.profile = this.navParams.data.profile;
    this.fillControls(this.profile);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ProfilePage');
  }

  private fillControls(profile) {
    if (profile.pay_account) {
      this.controls.forEach(control => {
        control.value = profile[control.id];
      });
    }
  }

  save() {
    let params = {};
    for (let i = 0; i < this.controls.length; i++) {
      const control = this.controls[i];
      if (control.required && !control.value) {
        this.tools.showToast(`${control.name}不能为空`);
        return;
      }

      if (control.type == 4) {
        params[control.id] = control.value ? control.value.value : "";
      } else {
        params[control.id] = control.value;
      }
    }

    this.users.SaveProfile(params)
      .then(data => {
        // this.tools.showToast("保存成功");
        if (this.profile) {
          this.events.publish("reloadprofile");
          this.navCtrl.pop();
        } else {
          this.app.getRootNavs()[0].setRoot(TabsPage);
        }
      })
      .catch(error => {
        this.tools.showToast(error.message || "保存失败了，请重试");
      });
  }

}
