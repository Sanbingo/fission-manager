import React from 'react';
import { Tag } from 'antd';
const ENABLE_COLOR = '#87d068';
const DISABLE_COLOR = '#9e9e9e';


export const TEMPLATE_TYPE = {
  1: '广告',
  2: '分享',
  3: '活动',
  4: '推广',
  5: '模板',
  6: '上传',
}

export const TEMPLATE_STATUS = {
  1: <Tag color={ENABLE_COLOR}>启用</Tag>,
  2: <Tag color={DISABLE_COLOR}>禁用</Tag>,
}