import { observable, action } from 'mobx';

export default class ExpandTableStore {
  static namespace = 'expandTableStore';

  @observable dataList = [{
    key: '1',
    seqId: '1500537541872152S170C295D6830048',
    eventType: '登陆事件',
    occurTime: '2017-07-20 15:59:01',
    description: 'description'
  }, {
    key: '2',
    seqId: '1500537409406188S170C295D7848529',
    eventType: '登陆事件',
    occurTime: '2017-07-20 15:56:49',
    description: 'description'
  }];

  constructor(globalStore) {
    this.globalStore = globalStore;
  }
}