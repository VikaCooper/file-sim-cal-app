import React, { Component } from 'react';
import { inject } from 'utils/mobx-react';
import { Menu } from 'td-ui';
import { Link, withRouter } from 'react-router-dom';

const { Item, ItemGroup } = Menu;

const menus = [{ // 左侧菜单导航
  key: 'form',
  display: '表单示例',
  submenus: [{
    key: 'BasicForm',
    display: '基本用法'
  }, {
    key: 'CustomForm',
    display: '自定义表单'
  }, {
    key: 'DynamicForm',
    display: '动态表单'
  }, {
    key: 'ValidateForm',
    display: '表单校验'
  }]
}, {
  key: 'table',
  display: '表格示例',
  submenus: [{
    key: 'BasicTable',
    display: '基本用法'
  }, {
    key: 'ExpandTable',
    display: '可展开表格'
  }, {
    key: 'SearchTable',
    display: '可搜索表格'
  }, {
    key: 'PaginationTable',
    display: '分页表格'
  }]
}];

class Sidebar extends Component {
  render() {
    const { location } = this.props;
    const selectedKeys = [];
    menus.some(group => {
      const menu = group.submenus.find(item => `/${group.key}/${item.key}` === location.pathname);
      if (menu) {
        selectedKeys.push(menu.key);
        return true;
      }
    });
    return (
      <Menu
        selectedKeys={selectedKeys}
        theme="dark"
      >
        {
          menus.map(group => (
            <ItemGroup key={group.key} title={group.display}>
              {
                group.submenus.map(item => (
                  <Item key={item.key}>
                    <Link to={`/${group.key}/${item.key}`}>{item.display}</Link>
                  </Item>
                ))
              }
            </ItemGroup>
          ))
        }
      </Menu>
    );
  }
}

export default withRouter(Sidebar)
