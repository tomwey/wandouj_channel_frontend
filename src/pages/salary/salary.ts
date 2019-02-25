import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';
import { Users } from '../../provider/Users';
import { Utils } from '../../provider/Utils';
import { Tools } from '../../provider/Tools';

/**
 * Generated class for the SalaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-salary',
  templateUrl: 'salary.html',
})
export class SalaryPage {

  user: any = {
    unpayed_money: '--',
    payed_money: '--',
    total_money: '--',
  };

  error: any = null;
  dataType: any = '0';
  salaryData: any = [];

  // @ViewChild('slides') slides: Slides;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    private iosFixed: iOSFixedScrollFreeze,
    private users: Users,
    private tools: Tools,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SalaryPage');
    this.iosFixed.fixedScrollFreeze(this.content);

    this.loadUserData();
    this.loadSalariesData();
  }

  loadUserData() {
    this.user = this.navParams.data.profile;
  }

  loadSalariesData() {
    this.error = null;
    this.salaryData = [];

    let date = this.filterItems[0].value;
    let state = (this.filterItems[1].value || {}).value;
    let merch_id = (this.filterItems[2].value || {}).value;
    let job_id = (this.filterItems[this.filterItems.length - 1].value || {}).value;

    this.users.GetSalaries(date, state, merch_id, job_id)
      .then(data => {
        if (data && data['data']) {
          this.salaryData = data['data'];
          this.error = this.salaryData.length == 0 ? '暂无工资数据' : null;
        } else {
          this.error = '非法错误';
        }
      })
      .catch(error => {
        this.error = error.message || '服务器出错了~';
      });
  }

  segmentChanged(ev) {
    this.loadSalariesData();
  }

  selectFilterItem(item, callback) {
    if (item.field == "job_id") {
      const compItem = this.filterItems[2];
      if (!compItem.value || !compItem.value.value) {
        this.tools.showToast("请先选择供应商");
        return;
      }

      this.users.GetCommJobs(compItem.value.value)
        .then(data => {
          let temp = [{ label: '全部', value: null }];
          let arr = data['data'];
          arr.forEach(ele => {
            temp.push({ label: `【${ele.project_name}】${ele.name}`, value: ele.id });
          });
          if (callback) {
            callback(temp);
          }
        })
        .catch(error => {

        });
    }

    if (item.field == "state") {
      let temp = [
        {
          label: '全部',
          value: -1
        },
        {
          label: '待发放',
          value: '0'
        },
        {
          label: '已发放',
          value: '1'
        }
      ];
      if (callback) {
        callback(temp);
      }
    } else if (item.field == "merch_id") {
      const jobItem = this.filterItems[this.filterItems.length - 1];
      if (jobItem) jobItem.value = null;

      this.users.GetCommCompanies()
        .then(data => {
          // console.log(data);
          let temp = [{ label: '全部', value: null }];
          let arr = data['data'];
          arr.forEach(ele => {
            temp.push({ label: ele.alias_name, value: ele.id });
          });
          if (callback) {
            callback(temp);
          }
        })
        .catch(error => {

        });
    }
  }

  selectedFilterItem(ev) {
    // console.log(ev);
    this.loadSalariesData();
  }

  filterItems: any = [
    {
      name: '日期',
      field: 'date',
      isPicker: true,
      value: Utils.dateFormat(new Date())
    },
    {
      name: '发放状态',
      field: 'state',
      // value: {
      //   label: "待签到",
      //   value: "0"
      // },
      selectFunc: (item, callback) => {
        this.selectFilterItem(item, callback);
      }
    },
    {
      name: '所属供应商',
      field: 'merch_id',
      selectFunc: (item, callback) => {
        this.selectFilterItem(item, callback);
      }
    },
    {
      name: '所属兼职',
      field: 'job_id',
      selectFunc: (item, callback) => {
        this.selectFilterItem(item, callback);
      }
    }
  ];

}
