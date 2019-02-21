import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AppliesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-applies',
  templateUrl: 'applies.html',
})
export class AppliesPage {

  applyType: string = '0';
  datesData: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AppliesPage');
  }

  segmentChanged(ev) {

  }

  selectDate(date) {
    console.log(date);
  }

}
