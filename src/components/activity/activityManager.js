import React from 'react';
import {
  Card,
  Table,
  message,
  Divider,
} from 'antd';
import { TipBtn } from '../common';
import { TEMPLATE_TYPE, TEMPLATE_STATUS } from '../common/consts';
import { post } from '../../utils/fetch'
// import DomainNew from './domainNew'


export default class ActivityManager extends React.Component {
  state = {
    templateList: [],
  }
  componentWillMount() {
    this.loadList()
  }
  request = (url, params={}, callback, msg) => {
    post(url, params).then(({ data }) => {
      const { meta={} } = data
      if (meta.success) {
        if (callback) {
          callback()
          message.success(msg || '操作成功')
        } else {
          this.setState({
            templateList: data.data
          })
        }
      } else {
        message.warning(meta.message)
      }
    })
  }
  loadList = () => {
    this.request('/pages/queryAll', {})
  }
  handleEnable = (id) => {
    this.request('/pages/enable', {
      entity: {
        id,
        dataStatus: 1
      }
    }, this.loadList)
  }
  handleDisable = (id) => {
    this.request('/pages/enable', {
      entity: {
        id,
        dataStatus: 2
      }
    }, this.loadList)
  }
  handleDelete = (id) => {
    this.request('/pages/batch/hardRemove', {
      batchRemoveIds: [id]
    }, this.loadList)
  }
  columns = [{
    key: 'name',
    dataIndex: 'name',
    title: '页面名称'
  }, {
    key: 'type',
    dataIndex: 'type',
    title: '页面类型',
    render: (text) => {
      return TEMPLATE_TYPE[text]
    }
  }, {
    key: 'dataStatus',
    dataIndex: 'dataStatus',
    title: '页面状态',
    render: (text) => {
      return TEMPLATE_STATUS[text]
    }
  }, {
    key: 'uri',
    dataIndex: 'uri',
    title: '页面地址',
    width: 400,
    render: (text, {
        innerUri,
        outerUri,
        randomSafeDomain
      }) => {
      return (
        <div>
          <p>内部地址：{innerUri || '-'}</p>
          <p>跳转地址：{randomSafeDomain ? `${randomSafeDomain}${outerUri}` : outerUri}</p>
        </div>
      );
    }
  }, {
    key: 'viewsCount',
    dataIndex: 'viewsCount',
    title: '浏览次数'
  }, {
    key: 'createTime',
    dataIndex: 'createTime',
    title: '创建时间'
  }, {
    key: 'op',
    dataIndex: 'op',
    title: '操作',
    render: (text, record) => {
      const { id } = record
      return (
        <span>
          {record.dataStatus === 1 ? <TipBtn onOk={() => this.handleDisable(id)}>禁用</TipBtn> : <TipBtn onOk={() => this.handleEnable(id)}>启用</TipBtn>}
          <Divider type="vertical" />
          <TipBtn onOk={() => this.handleDelete(id)}><span style={{ color: 'red' }}>删除</span></TipBtn>
        </span>
      );
    }
  }]
  render() {
    return (
      <Card title="页面管理">
        {/* <DomainNew callback={this.loadList} /> */}
        <Table
          style={{ marginTop: '15px' }}
          columns={this.columns}
          dataSource={this.state.templateList}
        />
      </Card>
    );
  }
}