import React from 'react';
import { Form, Input, Button, Select, Card, message, Alert } from 'antd'
import RcUeditor from 'react-ueditor-wrap';
import { post } from '../../utils/fetch'

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

class ActivityNew extends React.Component {
  state = {
    templateList: [],
    domainList: [],
    address: ''
  }
  componentWillMount(){
    post('/templates/queryAll', {}).then(({ data }) => {
      const { meta={} } = data
      if (meta.success) {
        this.setState({
          templateList: data.data
        })
      }
    })
    post('/domains/queryAll', {}).then(({ data }) => {
      const { meta={} } = data
      if (meta.success) {
        this.setState({
          domainList: data.data
        })
      }
    })
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { params, statistics, domainIds, pageName, templateId, type} = values
        const paramsList = params.split(',')
        paramsList.push(`statistics=${statistics}`)
        post('/pages/generate', {
          domainIds,
          pageName,
          templateId,
          type,
          paramsList,
        }).then(({data}) => {
          const { meta={} } = data
          if (meta.success) {
            message.success('创建成功~')
            this.setState({
              address: data.data
            })
          }
        })
      }
    });
  };
  renderDomainOptions = () => {
    const { domainList } = this.state;
    return domainList.map(item => <Option key={item.id} value={item.id}>{item.domain}</Option>)
  }
  renderTemplateOptions = () => {
    const { templateList } = this.state;
    return templateList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
  }
  renderRcUeditor = () => {
    const { getFieldValue } = this.props.form;
    if (getFieldValue('type') === 1) {
      return (
      <FormItem label="广告编辑">
        <RcUeditor onChange={this.hanldeChage}/>
      </FormItem>
    );
    }
    
  }
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
      <Card title="新建页面33">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <FormItem label="标题">
            {getFieldDecorator('pageName', {
              rules: [{ required: true, message: '请输入标题!' }],
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem label="域名">
            {getFieldDecorator('domainIds', {
              rules: [{ required: true, message: '请选择域名!' }],
            })(
              <Select mode="multiple">
                {this.renderDomainOptions()}
              </Select>,
            )}
          </FormItem>
          <FormItem label="模板">
            {getFieldDecorator('templateId', {
              rules: [{ required: true, message: '请选择模板!' }],
            })(
              <Select>
                {this.renderTemplateOptions()}
              </Select>,
            )}
          </FormItem>
          <FormItem label="页面类型">
            {getFieldDecorator('type', {
              rules: [{ required: true, message: '请选择模板类型!' }],
            })(
              <Select>
                <Option key="3" value={3}>活动</Option>
                <Option key="2" value={2}>分享</Option>
                <Option key="1" value={1}>广告</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem label="内容参数">
            {getFieldDecorator('params')(
              <TextArea rows={8} />,
            )}
          </FormItem>
          {this.renderRcUeditor()}
          <FormItem label="统计代码">
            {getFieldDecorator('statistics')(
              <Input />,
            )}
          </FormItem>

          <FormItem wrapperCol={{ span: 8, offset: 2 }}>
            <Button type="primary" htmlType="submit">创建</Button>
            {this.state.address && <Alert type="success" message={this.state.address} />}
          </FormItem>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(ActivityNew)
