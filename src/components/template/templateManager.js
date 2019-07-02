import React from 'react';
import {
  Card,
  Table,
  Divider,
  message,
} from 'antd';
import { TipBtn } from '../common';
import { TEMPLATE_TYPE, TEMPLATE_STATUS } from '../common/consts';
import { post } from '../../utils/fetch'
// import DomainNew from './domainNew'


export default class TemplateManager extends React.Component {
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
    this.request('/templates/queryAll', {})
  }
  handleEnable = (id) => {
    this.request('/templates/enable', {
      entity: {
        id,
        dataStatus: 1
      }
    }, this.loadList)
  }
  handleDisable = (id) => {
    this.request('/templates/enable', {
      entity: {
        id,
        dataStatus: 2
      }
    }, this.loadList)
  }
  handleDelete = (id) => {
    this.request('/templates/batch/hardRemove', {
      batchRemoveIds: [id]
    }, this.loadList)
  }
  columns = [{
    key: 'id',
    dataIndex: 'id',
    title: 'ID'
  }, {
    key: 'name',
    dataIndex: 'name',
    title: '模板名称'
  }, {
    key: 'type',
    dataIndex: 'type',
    title: '模板类型',
    render: (text) => {
      return TEMPLATE_TYPE[text]
    }
  }, {
    key: 'dataStatus',
    dataIndex: 'dataStatus',
    title: '模板状态',
    render: (text) => {
      return TEMPLATE_STATUS[text]
    }
  }, {
    key: 'uri',
    dataIndex: 'uri',
    title: '模板地址'
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
        </span>
      );
    }
  }]
  render() {
    return (
      <Card title="模板管理">
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