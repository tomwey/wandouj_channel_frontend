import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import html2canvas from 'html2canvas';
import { Tools } from '../../provider/Tools';

/**
 * Generated class for the ShareQrcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-share-qrcode',
  templateUrl: 'share-qrcode.html',
})
export class ShareQrcodePage {

  company: any;
  shareImageUrl: any = null;

  constructor(public navCtrl: NavController,
    private viewCtrl: ViewController,
    private tools: Tools,
    public navParams: NavParams) {
    this.company = this.navParams.data.company;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ShareQrcodePage');
    this.tools.showLoading("正在生成二维码");
    this.createQrcodeInfo(this.company, (url) => {
      this.shareImageUrl = url;
      this.tools.hideLoading();
    });
  }

  close() {
    this.viewCtrl.dismiss().catch();
  }

  createQrcodeInfo(comp, callback) {
    let div = document.createElement("div");
    div.style.display = "block";
    div.style.width = "288px";
    div.style.background = "#fff";
    div.style.padding = "20px";
    div.style.textAlign = "center";
    div.style.borderRadius = "8px";
    div.style.position = "absolute";
    div.style.zIndex = "-10000";

    let img = document.createElement("img");
    img.src = comp.qrcode_url;
    img.style.width = "100%";
    img.style.height = "100%";
    div.appendChild(img);

    let logo = document.createElement("img");
    logo.src = comp.logo;
    logo.style.width = "58px";
    logo.style.height = "58px";
    logo.style.position = "absolute";
    logo.style.zIndex = "100";
    logo.style.left = "50%";
    logo.style.top = "115px";
    logo.style.marginLeft = "-29px";
    logo.style.borderRadius = "4px";

    div.appendChild(logo);

    let p = document.createElement("p");
    p.textContent = "长按识别二维码";
    p.style.marginTop = "2px";
    p.style.textAlign = "center";
    p.style.fontSize = "12px";
    p.style.color = "#999";

    div.appendChild(p);

    let h2 = document.createElement("h2");
    h2.textContent = comp.alias_name || comp.name;
    h2.style.marginTop = "10px";
    h2.style.textAlign = "center";
    h2.style.fontSize = "16px";
    h2.style.color = "#333";

    div.appendChild(h2);

    document.body.appendChild(div);

    html2canvas(div, { useCORS: true, scale: 1.0 }).then(canvas => {
      if (callback) {
        callback(canvas.toDataURL("image/jpeg"));
      }
      document.body.removeChild(div);
    });
  }

}
