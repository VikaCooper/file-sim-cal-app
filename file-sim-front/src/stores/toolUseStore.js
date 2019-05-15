import {Get, PostJson, upload} from '../fetchHandler';
import {observable, action, computed, extendObservable, get} from 'mobx';
import omit from 'lodash/omit';
import {message} from 'td-ui';

class toolUseStore{
    static namespace = 'toolUseStore';
    @observable fileList={};

    @action
    async uploadFile(){
        const url = '/uploadFile';
        try{
            let formData = new FormData();
            formData.append('file1', this.fileList);
            const res = await upload(url, formData);
            console.log(res.result);
        }catch (e){
            return false;
        }
    }
}
export default toolUseStore;