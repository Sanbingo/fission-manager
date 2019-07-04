import React from 'react';
import {
  Form,
  Input,
  Button,
  Modal,
  message,
} from 'antd';
import { createOptions, createRadios } from '../common'
import { DOMAIN_STYLE, DOMAIN_STATUS } from './consts'
import { post } from '../../utils/fetch'

const FormItem = Form.Item;
const TITLE = '新建域名'

class DomainNew extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleSubmit = e => {
    const { callback } = this.props;
    e.preventDefault();
    const that = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        post('/domains/batch/insert', {
          entities: [{
            ...values,
            type: parseInt(values.type, 10),
            dataStatus: 3
          }]
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
            <FormItem label="域名名称">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入标题!' }],
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem label="域名类型">
            {getFieldDecorator('type', {
              rules: [{ required: true, message: '请选择域名类型' }],
            })(
              createOptions(DOMAIN_STYLE),
            )}
          </FormItem>
          <FormItem label="域名值">
            {getFieldDecorator('domain', {
              rules: [{ required: true, message: '请输入实际域名' }],
            })(
              <Input />,
            )}
          </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(DomainNew)
