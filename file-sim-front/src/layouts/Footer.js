import React, { Component } from 'react';
import { inject } from 'utils/mobx-react';
import { Layout, Menu } from 'td-ui';
import { Link } from 'react-router-dom';
import '../styles/controllers.css';
const { SubMenu, ItemGroup } = Menu;



@inject('globalStore')
export default class Footer extends Component {
  render() {
    return (
      <Layout.Footer className="file-sim-front-footer">
        <p>This is a footer.</p>
      </Layout.Footer>
    );
  }
}
