import React, { Component } from 'react';
import { inject } from 'utils/mobx-react';
import { Layout, Menu } from 'td-ui';
import { Link } from 'react-router-dom';
import '../styles/controllers.css';
const { SubMenu, ItemGroup } = Menu;



@inject('globalStore')
export default class Header extends Component {
  render() {
    return (
      <Layout.Header className="file-sim-front-header">
        <Menu mode="horizontal" style={{color: 'white'}}>
          <Menu.Item><Link className={'link-control'} to='/'>Home</Link></Menu.Item>
          <Menu.Item><Link className={'link-control'} to='/'>Tool</Link></Menu.Item>
        </Menu>
      </Layout.Header>
    );
  }
}
