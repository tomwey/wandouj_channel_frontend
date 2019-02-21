import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Tools } from '../../provider/Tools';
import { Users } from '../../provider/Users';
import { jsClipboard } from '../../provider/jsClipboard';

/**
 * Generated class for the JobListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-job-list',
  templateUrl: 'job-list.html',
})
export class JobListPage {

  actions: any;
  error: any = null;
  jobs: any = [];

  company: any;

  constructor(public navCtrl: NavController,
    // private events: Events,
    private tools: Tools,
    private users: Users,
    private jsCopy: jsClipboard,
    private modalCtrl: ModalController,
    // private alertCtrl: AlertController,
    public navParams: NavParams) {
    this.company = this.navParams.data.company;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad JobListPage');
    setTimeout(() => {
      this.loadJobs();
    }, 300);
  }

  loadJobs() {
    if (!this.company) return;

    this.users.GetJobs(this.company.id)
      .then(data => {
        this.jobs = data['data'];
        this.error = this.jobs.length === 0 ? '暂无兼职' : null;
      })
      .catch(error => {
        this.error = error.message || "服务器出错了~";
      })
  }

  copy() {
    this.jsCopy.copy(this.company.shop_url);
    this.tools.showToast("招人链接复制成功，您可以在任何地方直接粘贴");
  }

  share() {
    this.modalCtrl.create('ShareQrcodePage', { company: this.company }).present();
  }

}
