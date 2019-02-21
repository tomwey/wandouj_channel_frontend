import { Component, ViewChild } from '@angular/core';
import { /*IonicPage, */NavController, NavParams, Content, App } from 'ionic-angular';
// import { ApiService } from '../../provider/api-service';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';
import { Users } from '../../provider/Users';
// import { Tools } from '../../provider/Tools';
// import { Tools } from '../../provider/Tools';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  channel: any = null;

  error: any = null;
  companies: any = [];
  children: any = null;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    // private api: ApiService,
    private app: App,
    private users: Users,
    // private tools: Tools,
    private iosFixed: iOSFixedScrollFreeze,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad HomePage');
    this.iosFixed.fixedScrollFreeze(this.content);

    this.loadHomeData();

    // console.log(new Date().getDay());
  }

  callPhone(phone) {
    // alert(phone);
    window.open("tel:" + phone);
  }

  viewProfile() {
    this.app.getRootNavs()[0].push('ProfilePage', { profile: this.channel });
  }

  viewSalary() {

  }

  loadHomeData() {
    return new Promise((resolve) => {
      this.users.GetUserHomeData()
        .then(data => {
          console.log(data);
          let result = data['data'];
          this.channel = result['channel'];
          this.companies = result['companies'];
          this.children = result['children'];
          resolve();
        })
        .catch(error => {
          this.error = error.message || "额，服务器出错了~";
          resolve();
        });
    });
  }

}
