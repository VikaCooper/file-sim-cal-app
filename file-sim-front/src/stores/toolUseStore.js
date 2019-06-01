import {Get, PostJson, upload} from '../fetchHandler';
import {observable, action, computed, extendObservable, get} from 'mobx';
import omit from 'lodash/omit';
import {message} from 'td-ui';
import {toJS} from 'mobx';
import React, {Component} from 'react';


class toolUseStore {
    static namespace = 'toolUseStore';
    @observable fileList = {};
    @observable selectedBefore;
    @observable loading = false;
    @observable columnList = [];
    @observable resultData = [];
    @observable vsmSource = [];
    @observable flexScroll = 0;
    @observable lsiSource = [];
    @observable ldaSource = [];
    @observable resultSource =[];

    @action
    async uploadFile() {
        this.loading = true;
        const url = '/uploadFile';
        try {
            let formData = new FormData();
            formData.append('file1', this.fileList);
            const res = await upload(url, formData);
            message.info(res.message);
            this.loading = false;
            return res.result;
        } catch (e) {
            return false;
        }
    }

    @action
    async getFileList(filename, theme) {
        this.resultData.clear();
        this.vsmSource.clear();
        this.columnList.clear();
        this.lsiSource.clear();
        this.ldaSource.clear();


        this.loading = true;
        const url = '/getFileList/' + filename + '&' + theme;
        try {
            const res = await Get(url);
            this.resultData = res.data;
            this.formatResultData();
            this.flexScroll = 150 * this.columnList.length;

            this.loading = false;
        } catch (e) {
            return false;
        }
    }

    formatResultData() {
        this.columnList.push({
            key: 'stno',
            dataIndex: 'stno',
            title: '学号'
        });
        this.columnList = this.columnList.concat(
            this.resultData[0].vsm.map(item => {
                console.log(item);
                const key = Object.keys(item)[0];
                return {
                    key: key,
                    dataIndex: key,
                    title: key,
                    render: (text)=>{
                        const value = parseFloat(text);
                        if (value>0.5&&value<1){
                            return <span style={{color: 'red'}}>{text}</span>
                        }
                        else if (value == 1){
                            return <span style={{color: 'orange'}}>{text}</span>
                        }
                        else {
                            return <span style={{color: 'green'}}>{text}</span>
                        }
                    }
                }
            })
        );


        this.vsmSource = this.resultData[0].vsm.map(item => {
            let obj = {};
            for (let i = 0; i < this.columnList.length; i++) {
                let item_key = Object.keys(item)[0];
                if (i == 0) {
                    obj.stno = item_key;
                }
                else obj[this.columnList[i].key] = item[item_key][i - 1];
            }
            return obj;
        });

        this.lsiSource = this.resultData[1].lsi.map(item => {
            let obj = {};
            for (let i = 0; i < this.columnList.length; i++) {
                let item_key = Object.keys(item)[0];
                if (i == 0) {
                    obj.stno = item_key;
                }
                else obj[this.columnList[i].key] = item[item_key][i - 1];
            }
            return obj;
        });

        this.ldaSource = this.resultData[2].lda.map(item => {
            let obj = {};
            for (let i = 0; i < this.columnList.length; i++) {
                let item_key = Object.keys(item)[0];
                if (i == 0) {
                    obj.stno = item_key;
                }
                else obj[this.columnList[i].key] = item[item_key][i - 1];
            }
            return obj;
        });

        this.resultSource = this.resultData[3].result.map(item => {
            let obj = {};
            for (let i = 0; i < this.columnList.length; i++) {
                let item_key = Object.keys(item)[0];
                if (i == 0) {
                    obj.stno = item_key;
                }
                else obj[this.columnList[i].key] = item[item_key][i - 1];
            }
            return obj;
        });

        localStorage.setItem('vsm', [toJS(this.columnList), toJS(this.vsmSource)]);
        localStorage.setItem('lsi', [toJS(this.columnList), toJS(this.lsiSource)]);
        localStorage.setItem('lda', [toJS(this.columnList), toJS(this.ldaSource)]);
        localStorage.setItem('result', [toJS(this.columnList), toJS(this.ldaSource)]);

    }
}

export default toolUseStore;