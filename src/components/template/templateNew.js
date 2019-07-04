import React from 'react';
import { Form, Input, Upload, Button, Select, Card, Icon, message } from 'antd'
import { post } from '../../utils/fetch'

const FormItem = Form.Item;
const { Option } = Select;

class TemplateNew extends React.Component {
  state = {
    fileList: [],
    uploading: false,
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {
          fileList
        } = this.state;
        const formData = new FormData();
        fileList.forEach(file => {
          formData.append('file', file);
        });
        formData.append('name', values.name)
        formData.append('type', values.type)

        this.setState({
          uploading: true,
        });
        console.log('Received values of form: ', values);
        post('/templates/upload', formData).then(({data}) => {
          const { success } = data.meta;
          if (success) {
            message.success('上传成功！')
          }
        })
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
    const { fileList } = this.state;
    const formItemLayout = {
      labelCol: {
        span: 2
      },
      wrapperCol: {
        span: 8
      },
    };
    return (
      <Card title="上传模板">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <FormItem label="模板名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入模板名称!' }],
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem label="模板类型">
            {getFieldDecorator('type', {
              rules: [{ required: true, message: '请选择模板类型!' }],
            })(
              <Select>
                <Option value="3">活动</Option>
                <Option value="2">分享</Option>
                <Option value="1">广告</Option>
                <Option value="4">壳</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem label="上传模板">
            {getFieldDecorator('file', {
              rules: [{ required: true, message: '请上传模板!' }],
            })(
              <Upload
                name = "logo"
                listType = "picture"
                onRemove = { file => {
                  this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                      fileList: newFileList,
                    };
                  });
                }}
                beforeUpload = {(file) => {
                  this.setState(state => ({
                    fileList: [...state.fileList, file],
                  }));
                  return false;
                }}
              >
              {
                fileList.length >= 1 ? null : <Button><Icon type="upload" /> 点击上传</Button>
              }
                
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

export default Form.create()(TemplateNew)
