import {Get, PostJson, upload} from '../fetchHandler';
import {observable, action, computed, extendObservable, get} from 'mobx';
import omit from 'lodash/omit';
import {message} from 'td-ui';
import {toJS} from 'mobx';
import React, {Component} from 'react';

class resutltStore{
    static namespace = 'resultStore';
    @observable columnList = [];
    @observable vsmSource = [];
    @observable flexScroll = 0;
    @observable lsiSource = [];
    @observable ldaSource = [];
    @observable resultSource =[];


}
export default resutltStore;