import { observable, action } from 'mobx';

export default class CustomFormStore {
  static namespace = 'customFormStore';

  @observable custom = {};

  constructor(globalStore) {
    this.globalStore = globalStore;
  }

  @action submit(custom) {
    // 提交表单，返回成功后，将值设置到store中，此处省略请求后端的代码
    this.custom = custom || {};
    console.log(custom);
  }
}