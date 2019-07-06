import React from 'react';
import { Card, Table, message } from 'antd';
import { post } from '../../utils/fetch'
import PopularNew from './popularNew'

export default class PopularManager extends React.Component {
  state = {
    popularList: [],
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
            popularList: data.data
          })
        }
      } else {
        message.warning(meta.message)
      }
    })
  }
  loadList = () => {
    this.request('/popularize/queryList', { pageSize: 100, pageNum: 1 })
  }
  columns = [{
        key: 'id',
        dataIndex: 'id',
        title: '查看',
        render: (text, {
            randomSafeDomain,
            outerUri
          }) => {
          return <a href={`http://${randomSafeDomain}${outerUri}`} target="__blank">点击查看</a>
        }
      }, {
        key: 'address',
        dataIndex: 'address',
        title: '地址',
        render: (text, {
            randomSafeDomain,
            outerUri
          }) => {
          return `http://${randomSafeDomain}${outerUri}`
        }
      }, {
        key: 'name',
        dataIndex: 'name',
        title: '推广名称'
      }]
  render() {
    return (
      <Card title="推广管理">
        <PopularNew callback={this.loadList} />
        <Table
          style={{ marginTop: '15px' }}
          columns={this.columns}
          dataSource={this.state.popularList}
        />
      </Card>
    );
  }
}