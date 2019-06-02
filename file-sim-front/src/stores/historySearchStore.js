import {Get, PostJson, upload} from '../fetchHandler';
import {observable, action} from 'mobx';
import {message} from 'td-ui';
import {toJS} from 'mobx';

class historySearchStore {
    static namespace = 'historySearchStore';
    @observable dateStrings = [];
    @observable dataSource = [];


    @action
    async getHistoryRecord(dateStrings) {
        const url = '/historysearch';
        try {
            const res = await PostJson(url, dateStrings);
            message.info(res.message);
            let tmp = [];
            let i = 0;
            this.dataSource = res.data.map(
                item => {
                    return {
                        key: i++,
                        num: i,
                        calTime: item.cal_time,
                        result: item.result,
                        username: item.username,
                        recordId: item.record_id
                }
                }
            );
            console.log(toJS(this.dataSource));
            if (!res.result)
                message.warning('查询失败');
        } catch (e) {
            message.warning('请求异常');
        }
    }
}

export default historySearchStore;