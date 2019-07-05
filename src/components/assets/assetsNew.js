import React from 'react';
import {
  Form,
  Alert,
  Upload,
  Button,
  Select,
  Card,
  Icon,
  message
} from 'antd'
import { post } from '../../utils/fetch'

const FormItem = Form.Item;
const { Option } = Select;

class TemplateNew extends React.Component {
  state = {
    fileList: [],
    uploading: false,
    address: ''
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

        this.setState({
          uploading: true,
        });
        console.log('Received values of form: ', values);
        post('file/upload', formData).then(({data}) => {
          const { success } = data.meta;
          const { fileName } = data.data;
          if (success) {
            message.success('上传成功！')
            this.setState({
              address: fileName
            })
          }
        })
      }
    });
  };
  normFile = e => {
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
      <Card title="资源上传">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <FormItem label="上传">
            {getFieldDecorator('file', {})(
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
            <Button type="primary" htmlType="submit">上传</Button>
          </FormItem>
          {this.state.address && <Alert type="success" message={this.state.address} />}
        </Form>
      </Card>
    );
  }
}

export default Form.create()(TemplateNew)
