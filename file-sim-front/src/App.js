import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject } from 'utils/mobx-react';
import { Layout, Loading } from 'td-ui';
import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';
import Content from './layouts/Content';
import './styles/index.less';
import Footer from './layouts/Footer';

const { Sider } = Layout;

/**
 * 页面组件入口，引入布局
 * Loading -- 遮罩层，加载中
 *   Layout -- 布局
 *     Header -- 顶部导航
 *     Layout -- 布局
 *       Sidebar -- 左侧导航
 *       Content -- 右侧内容
 */
@inject('globalStore') // 注入globalStore到本组件，可选store为main.js中注入的stores
class App extends Component {
  render() {
    const { globalStore } = this.props;
    const { loading } = globalStore;
    return (
      <Loading loading={loading}>
        <Layout>
          <Header />
          <Layout>
            {/* <Sider style={{ minHeight: 'calc(100vh - 64px)' }} className="file-sim-front-sidebar">
              <Sidebar />
            </Sider> */}
            <Layout>
              <Content />
            </Layout>
          </Layout>
          {/* <Layout><Footer /></Layout> */}
        </Layout>
      </Loading>
    );
  }
}

export default withRouter(App);
