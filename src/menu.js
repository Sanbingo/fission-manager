import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom'

const { SubMenu } = Menu;

export default class MenuComponent extends React.Component {
  menus = [{
    title: '仪表盘',
    url: 'dashboard',
    icon: 'dashboard',
    children: [{
      title: '活动统计',
      url: '/dash/pages'
    }, {
      title: '广告统计',
      url: '/dash/ads'
    }]
  }, {
    title: '页面',
    url: 'activity',
    icon: 'font-colors',
    children: [{
      title: '新建页面',
      url: '/activity/new'
    }, {
      title: '页面管理',
      url: '/activity/manager'
    }]
  }, {
    title: '模板',
    url: 'template',
    icon: 'copy',
    children: [{
      title: '新建模板',
      url: '/template/new'
    }, {
      title: '模板管理',
      url: '/template/manager'
    }]
  }, {
    title: '域名',
    url: 'domain',
    icon: 'edit',
    children: [{
      title: '域名管理',
      url: '/domain/manager'
    }]
  }, {
    title: '推广',
    url: 'popular',
    icon: 'appstore',
    children: [{
      title: '推广管理',
      url: '/popular/manager'
    }]
  }, {
    title: '资源服务',
    url: 'assets',
    icon: 'youtube',
    children: [{
      title: '资源上传',
      url: '/assets/new'
    }]
  }]
  renderTitle = (item) => {
    return (
      <span>
        <Icon type={item.icon} />
        <span>{item.title}</span>
      </span>
    );
  }
  renderMenus = (menus) => {
    return menus.map(item => {
      if (item.children) {
        return (
          <SubMenu key={item.url} title={this.renderTitle(item)}>
            {this.renderMenus(item.children)}
          </SubMenu>
        );
      }
      return <Menu.Item key={item.url}><Link to={item.url}>{item.title}</Link></Menu.Item>
    })
  }
  render() {
    return (
      <Menu mode="inline" theme="dark">
        {this.renderMenus(this.menus)}
      </Menu>
    );
  }
}
