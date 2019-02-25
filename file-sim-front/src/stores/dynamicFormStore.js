import { observable, action } from 'mobx';

export default class DynamicFormStore {
  static namespace = 'dynamicFormStore';

  @observable keys1 = [ 0 ]; // 默认至少有一个key

  @observable keys2 = [ 0 ];

  constructor(globalStore) {
    this.globalStore = globalStore;
  }

  @action submit(values) {
    // 提交表单，返回成功后，将值设置到store中，此处省略请求后端的代码
    console.log(values);
  }

  @action setKeys1(keys1) {
    this.keys1 = keys1 || [];
  }

  @action setKeys2(keys2) {
    this.keys2 = keys2 || [];
  }
}
