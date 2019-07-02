import React from 'react';
import {
  Card,
  Table,
  Divider,
  Tag,
  message,
  Button
} from 'antd';
import { TipBtn } from '../common';
import { post } from '../../utils/fetch'
import DomainNew from './domainNew'


export default class DomainManager extends React.Component {
  state = {
    domainList: [],
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
            domainList: data.data
          })
        }
      } else {
        message.warning(meta.message)
      }
    })
  }
  loadList = () => {
    this.request('/domains/queryAll', {})
  }
  handleEnable = (id) => {
    this.request('/domains/enable', {
      entity: {
        id,
        dataStatus: 1
      }
    }, this.loadList)
  }
  handleDisable = (id) => {
    this.request('/domains/enable', {
      entity: {
        id,
        dataStatus: 3
      }
    }, this.loadList)
  }
  handleDelete = (id) => {
    this.request('/domains/batch/hardRemove', {
      batchRemoveIds: [id]
    }, this.loadList)
  }
  columns = [{
    key: 'id',
    dataIndex: 'id',
    title: 'ID'
  }, {
    key: 'type',
    dataIndex: 'type',
    title: '域名类型',
    render: (text) => {
      if (text === 1) {
        return '危险域名'
      } else if (text === 2) {
        return '安全域名'
      } else {
        return '其他域名'
      }
    }
  }, {
    key: 'dataStatus',
    dataIndex: 'dataStatus',
    title: '域名状态',
    render: (text) => {
      if(text === 1) {
        return <Tag color="#87d068">启用</Tag>
      }
      return <Tag color="#9e9e9e">禁用</Tag>
    }
  }, {
    key: 'domain',
    dataIndex: 'domain',
    title: '域名名称'
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
      <Card title="域名管理">
        <DomainNew callback={this.loadList} />
        <Table
          style={{ marginTop: '15px' }}
          columns={this.columns}
          dataSource={this.state.domainList}
        />
      </Card>
    );
  }
}