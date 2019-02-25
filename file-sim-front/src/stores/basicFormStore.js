import { observable, action } from 'mobx';

export default class BasicFormStore {
  static namespace = 'basicFormStore';

  @observable fieldA;
  @observable fieldB;
  @observable layout = 'horizontal';

  constructor(globalStore) {
    this.globalStore = globalStore;
  }

  @action setLayout(layout) {
    this.layout = layout;
  }

  @action submit(datas) {
    // 提交表单，返回成功后，将值设置到store中，此处省略请求后端的代码
    this.fieldA = datas.fieldA || '';
    this.fieldB = datas.fieldB || '';
    console.log(datas);
  }
}