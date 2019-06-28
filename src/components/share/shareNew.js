import React from 'react';
import { Form, Input, Upload, Button, Select, Card } from 'antd'

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
      <Card title="新建分享">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <FormItem label="标题">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入标题!' }],
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem label="模板">
            {getFieldDecorator('templateName', {
              rules: [{ required: true, message: '请选择模板!' }],
            })(
              <Select>
                <Option value="hb">红包</Option>
                <Option value="video">视频</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem label="参数">
            {getFieldDecorator('params', {
              rules: [{ required: true, message: '请输入标题!' }],
            })(
              <TextArea rows={8} />,
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
