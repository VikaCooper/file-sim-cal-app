import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { HashRouter as Router } from 'react-router-dom';
import 'whatwg-fetch';
import moment from 'moment';
import 'moment/locale/zh-cn';
import stores from './stores';
import App from './App';
moment.locale('zh-cn');

const MOUNT_NODE = document.getElementById('app');// 页面渲染的位置

ReactDOM.render((// 渲染页面，注入stores
  <Router>
    <Provider {...stores}>
      <App />
    </Provider>
  </Router>
), MOUNT_NODE);
