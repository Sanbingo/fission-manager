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
        title: 'ID'
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