import React, { Component } from 'react';
import { inject } from 'utils/mobx-react';
import { Layout, Menu } from 'td-ui';
import { Link } from 'react-router-dom';
import '../styles/controllers.css';
const { SubMenu, ItemGroup } = Menu;



@inject('globalStore')
export default class Header extends Component {
  render() {
    const {currLocation} = this.props.globalStore;
    return (
      <Layout.Header className="file-sim-front-header">
        <Menu mode="horizontal" style={{color: 'white'}} selectedKeys={[currLocation]}>
          <Menu.Item key='homepage'><Link className={'link-control'} to='/'>主页</Link></Menu.Item>
          <Menu.Item key='tooluse'><Link className={'link-control'} to='/tooluse'>文本查重</Link></Menu.Item>
          <Menu.Item key='quicklearn'><Link className={'link-control'} to='/quicklearn'>快速上手</Link></Menu.Item>
          <Menu.Item key='updatelog'><Link className={'link-control'} to='/updatelog'>更新日志</Link></Menu.Item>
          <Menu.Item key='tooldetail'><Link className={'link-control'} to='/tooldetail'>工具详情</Link></Menu.Item>
          <Menu.Item key='loggin' className={'loggin'}><Link className={'link-control'} to='/loggin'>登录</Link></Menu.Item>
        </Menu>
      </Layout.Header>
    );
  }
}
