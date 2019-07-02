import React from 'react';
import { Popconfirm, Select, Radio } from 'antd';
import { forEach } from 'lodash';

const { Option } = Select;

export const TipBtn = (props) => {
  return (
    <Popconfirm
      title="确定执行这个操作"
      onConfirm={props.onOk}
      okText="确定"
      cancelText="取消"
    >
      <a>{props.children}</a>
    </Popconfirm>
  );
}

export const createOptions = (obj) => {
    const ret = []
    forEach(obj, (value, key) => ret.push(<Option key={key} value={key}>{value}</Option>))
    return (
      <Select>
        {ret}
      </Select>
    );
}

export const createRadios = (obj) => {
  const ret = []
    forEach(obj, (value, key) => ret.push(<Radio key={key} value={key}>{value}</Radio>))
    return (
      <Radio.Group>
        {ret}
      </Radio.Group>
    );
}