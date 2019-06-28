import React from 'react';
import { Form, Input, Upload, Button, Select, Card, Icon } from 'antd'

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

class ActivityNew extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 2
      },
      wrapperCol: {
        span: 8
      },
    };
    return (
      <Card title="新建视频">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <FormItem label="视频标题">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入视频标题!' }],
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem label="视频类型">
            {getFieldDecorator('templateName', {
              rules: [{ required: true, message: '请选择视频类型!' }],
            })(
              <Select>
                <Option value="funny">搞笑</Option>
                <Option value="hotspot">热点</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem label="视频摘要">
            {getFieldDecorator('params', {
              rules: [{ required: true, message: '请输入视频摘要!' }],
            })(
              <TextArea rows={8} />,
            )}
          </FormItem>
          <FormItem label="视频素材">
            {getFieldDecorator('video', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button>
                  <Icon type="upload" /> 点击上传
                </Button>
              </Upload>,
            )}
          </FormItem>
          <FormItem label="视频封面">
            {getFieldDecorator('video', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload name="logo" action="/upload.do" listType="picture-card">
                <div>
                  <Icon type="plus" />
                  <div>点击上传</div>
                </div>
              </Upload>,
            )}
          </FormItem>
          <FormItem wrapperCol={{ span: 8, offset: 2 }}>
            <Button type="primary" htmlType="submit">创建</Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(ActivityNew)
