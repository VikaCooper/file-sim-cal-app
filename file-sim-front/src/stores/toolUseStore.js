import {Get, PostJson, upload} from '../fetchHandler';
import {observable, action, computed, extendObservable, get} from 'mobx';
import omit from 'lodash/omit';
import {message} from 'td-ui';

class toolUseStore{
    static namespace = 'toolUseStore';
    @observable fileList={};
    @observable selectedBefore;

    @observable columnList = [];

    @action
    async uploadFile(){
        const url = '/uploadFile';
        try{
            let formData = new FormData();
            formData.append('file1', this.fileList);
            const res = await upload(url, formData);
            message.info(res.message);
            return res.result;
        }catch (e){
            return false;
        }
    }
    @action
    async getFileList(filename, theme){
        const url = '/getFileList/'+filename+'&'+theme;
        try {
            const res = await Get(url);
            console.log(res.data);
        }catch (e){
            return false;
        }
    }
}
export default toolUseStore;