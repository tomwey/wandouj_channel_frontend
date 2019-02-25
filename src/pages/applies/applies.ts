import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { Users } from '../../provider/Users';
import { Tools } from '../../provider/Tools';
import { Utils } from '../../provider/Utils';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

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

  applies: any = [];
  error: any = null;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    private users: Users,
    private tools: Tools,
    private iosFixed: iOSFixedScrollFreeze,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AppliesPage');
    this.iosFixed.fixedScrollFreeze(this.content);

    setTimeout(() => {
      this.loadApplies();
    }, 200);
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
          label: '待审核',
          value: 0
        },
        {
          label: '已报名',
          value: 1
        },
        {
          label: '已取消',
          value: 2
        },
        {
          label: '已签到',
          value: 3
        },
        {
          label: '已签退',
          value: 4
        },
        {
          label: '报名未通过',
          value: 5
        },
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

  loadApplies() {
    let date = this.filterItems[0].value;
    let state = (this.filterItems[1].value || {}).value;
    let merch_id = (this.filterItems[2].value || {}).value;
    let job_id = (this.filterItems[this.filterItems.length - 1].value || {}).value;

    this.applies = [];

    this.users.GetApplies(date, state, merch_id, job_id)
      .then(data => {
        // console.log(data);
        this.applies = data['data'];
        this.error = this.applies.length === 0 ? '暂无报名人员' : null;
      })
      .catch(error => {
        this.error = error.message || "服务器出错了~";
      });
  }

  selectedFilterItem(item) {
    // console.log(item);
    // this.showOrHideToolbars();

    this.loadApplies();
  }

  filterItems: any = [
    {
      name: '工作日期',
      field: 'work_date',
      isPicker: true,
      value: Utils.dateFormat(new Date())
    },
    {
      name: '报名状态',
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
