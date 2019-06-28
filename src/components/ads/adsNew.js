import React from 'react';
import { Form, Input, Button, Card, Row, Col } from 'antd';
import RcUeditor from 'react-ueditor-wrap';

const FormItem = Form.Item;
const { TextArea } = Input;

class AdsNew extends React.Component {
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
        span: 3
      },
      wrapperCol: {
        span: 20
      },
    };
    return (
      <Card title="新建广告">
        <Row>
          <Col span={11}>
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <FormItem label="标题">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: '请输入标题!' }],
              })(
                <Input />,
              )}
            </FormItem>
            <FormItem label="富文本">
              {getFieldDecorator('params', {
                rules: [{ required: true, message: '请输入标题!' }],
              })(
                <TextArea rows={20} />,
              )}
            </FormItem>
            <FormItem wrapperCol={{ span: 8, offset: 2 }}>
              <Button type="primary" htmlType="submit">创建</Button>
            </FormItem>
          </Form>
          </Col>
          <Col span={13} >
            <h2>文章编辑</h2>
            <RcUeditor style={{ marginRight: '10px' }} />
          </Col>
        </Row>
      </Card>
    );
  }
}

export default Form.create()(AdsNew)
