import React, { Component } from 'react';
import { Row, Col } from 'antd';

import { Bar } from 'components/Charts';
// 登录表单
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;
// end

const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}

export default class TableTime extends Component {
  // 登录
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  // end

  render() {
    // 登录
    // const { getFieldDecorator } = this.props.form;
    // end

    return (
      <div>
        <Bar height={200} title="销售额趋势" data={salesData} />
        {/* 登录 */}
      </div>
    );
  }
}
