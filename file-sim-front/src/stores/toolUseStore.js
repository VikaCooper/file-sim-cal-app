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
    @observable resultSource = [];
    @observable singleResult = [];
    @observable isCreated = false;
    @observable docResult = [];
    @observable docSource = [];

    @observable fileType;
    currData = {};

    constructor(store) {
        this.globalStore = store;
    }

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
    async getRecordById(id) {
        this.loading = true;
        const url = '/getRecordById/' + id;
        try {
            const res = await Get(url);
            if (res.result)
                this.singleResult = res.data;
            this.loading = false;

        } catch (e) {
            message.warning('请求异常');
        }
    }


    @action
    async getFileList(filename, theme) {

        try {
            this.resultData.clear();

        } catch (TypeError) {

        }
        localStorage.removeItem('recordId');
        this.loading = true;
        const url = '/getFileList/' + filename + '&' + theme;
        try {
            const res = await Get(url);
            this.resultData = res.data;
            localStorage.setItem('recordId', res.recordId);
            [this.columnList, this.vsmSource, this.lsiSource, this.ldaSource, this.resultSource] = this.formatResultData(this.resultData);
            this.flexScroll = 150 * this.columnList.length;
            this.loading = false;
        } catch (e) {
            return false;
        }
    }

    @action
    async getSingleDoc(filename, theme) {
        localStorage.removeItem('recordId');
        this.loading = true;
        const url = '/getFileList/' + filename + '&' + theme;
        try {
            const res = await Get(url);
            this.docResult = res.data;
            localStorage.setItem('recordId', res.recordId);
            let i = 0;
            this.docSource= this.docResult.map(
                item => {
                    const key = Object.keys(item)[0];
                    return {
                        key: key,
                        num: i++,
                        docId: key,
                        simResult: item[key]
                    }
                }
            );

            console.log('doc Source: ',toJS(this.docSource));
            this.loading = false;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    formatResultData(resultData) {
        this.vsmSource.clear();
        this.columnList.clear();
        this.lsiSource.clear();
        this.ldaSource.clear();
        let column = [], vsmSrc, lsiSrc, ldaSrc, resultSrc;
        column.push({
            key: 'stno',
            dataIndex: 'stno',
            title: '学号'
        });
        column = column.concat(
            resultData[0].vsm.map(item => {
                const key = Object.keys(item)[0];
                return {
                    key: key,
                    dataIndex: key,
                    title: key,
                    render: (text) => {
                        const value = parseFloat(text);
                        if (value > 0.6 && value < 1) {
                            return <span style={{color: 'red'}}>{text}</span>
                        }
                        else if (value == 1) {
                            return <span style={{color: 'orange'}}>{text}</span>
                        }
                        else {
                            return <span style={{color: 'green'}}>{text}</span>
                        }
                    }
                }
            })
        );


        vsmSrc = resultData[0].vsm.map(item => {
            let obj = {};
            for (let i = 0; i < column.length; i++) {
                let item_key = Object.keys(item)[0];
                if (i == 0) {
                    obj.stno = item_key;
                }
                else obj[column[i].key] = item[item_key][i - 1];
            }
            return obj;
        });

        lsiSrc = resultData[1].lsi.map(item => {
            let obj = {};
            for (let i = 0; i < column.length; i++) {
                let item_key = Object.keys(item)[0];
                if (i == 0) {
                    obj.stno = item_key;
                }
                else obj[column[i].key] = item[item_key][i - 1];
            }
            return obj;
        });

        ldaSrc = resultData[2].lda.map(item => {
            let obj = {};
            for (let i = 0; i < column.length; i++) {
                let item_key = Object.keys(item)[0];
                if (i == 0) {
                    obj.stno = item_key;
                }
                else obj[column[i].key] = item[item_key][i - 1];
            }
            return obj;
        });

        resultSrc = resultData[3].result.map(item => {
            let obj = {};
            for (let i = 0; i < column.length; i++) {
                let item_key = Object.keys(item)[0];
                if (i == 0) {
                    obj.stno = item_key;
                }
                else obj[column[i].key] = item[item_key][i - 1];
            }
            return obj;
        });

        return [
            column, vsmSrc, lsiSrc, ldaSrc, resultSrc
        ]
    }

    showHistoryResult(result) {
        const tmp = JSON.parse(result[0].result);
        [this.columnList, this.vsmSource, this.lsiSource, this.ldaSource, this.resultSource] = this.formatResultData(tmp);
        this.flexScroll = 150 * this.columnList.length;
    }

    @action
    async createResultExcel() {

        if (this.resultData.length !== 0)
            this.currData.result = toJS(this.resultData);
        else
            this.currData.result = toJS(this.singleResult[0].result);
        this.currData.column = toJS(this.columnList);

        const url = '/createExcel';
        try {
            const res = await PostJson(url, this.currData);
            if (!res.result) {
                message.warning(res.message);
            }
            this.isCreated = res.result;
            return res.result;
        } catch (e) {
            message.warning('请求异常')
        }
    }

    @action
    async getResultExcel() {
        const url = '/downloadExcel';
        window.open(url);
    }

}

export default toolUseStore;