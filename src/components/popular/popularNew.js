import React from 'react';
import {
  Form,
  Input,
  Button,
  Modal,
  message,
  Select,
} from 'antd';
import { createOptions } from '../common'
import { post } from '../../utils/fetch'

const FormItem = Form.Item;
const TITLE = '新建推广'
const { Option } = Select;

class PopularNew extends React.Component {
  state = {
    visible: false,
    pagesList: [],
    templatesList: [],
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  componentDidMount() {
    post('/pages/queryAll', {}).then(({ data }) => {
      const { meta={} } = data
      if (meta.success) {
        this.setState({
          pagesList: data.data
        })
      }
    })
    post('/templates/queryAll', {}).then(({ data }) => {
      const { meta={} } = data
      if (meta.success) {
        this.setState({
          templatesList: data.data
        })
      }
    })
  }

  handleSubmit = e => {
    const { callback } = this.props;
    e.preventDefault();
    const that = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { name, shellId, themes, shares, ads } = values
        post('/popularize/add', {
          name,
          shellId,
          pagesMap: {
            1: ads,
            2: shares,
            3: themes
          }
        }).then(({ data }) => {
          const { meta={} } = data
          if (meta.success) {
            message.success('创建成功')
            that.handleCancel()
            callback && callback()
          }
        })
      }
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  renderTemplatesOptions = () => {
    const { templatesList } = this.state;
    return templatesList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
  }
  renderOptionsByType = (type) => {
    const { pagesList } = this.state;
    return pagesList.filter(item => item.type === type).map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      },
    };
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          {TITLE}
        </Button>
        <Modal
          title={TITLE}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <FormItem label="推广名称">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入标题!' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="推广页面">
            {getFieldDecorator('shellId', {
              rules: [{ required: true, message: '请选择域名类型' }],
            })(
              <Select>
                {this.renderTemplatesOptions}
              </Select>
            )}
          </FormItem>
            <FormItem label="活动页面">
            {getFieldDecorator('themes', {
              rules: [{ required: true, message: '请选择域名类型' }],
            })(
              <Select mode="multiple">
                {this.renderOptionsByType(3)}
              </Select>
            )}
          </FormItem>
            <FormItem label="分享页面">
            {getFieldDecorator('shares', {
              rules: [{ required: true, message: '请选择域名类型' }],
            })(
              <Select mode="multiple">
                {this.renderOptionsByType(2)}
              </Select>
            )}
          </FormItem>
            <FormItem label="广告页面">
            {getFieldDecorator('ads', {
              rules: [{ required: true, message: '请选择域名类型' }],
            })(
              <Select mode="multiple">
                {this.renderOptionsByType(1)}
              </Select>
            )}
          </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(PopularNew)
