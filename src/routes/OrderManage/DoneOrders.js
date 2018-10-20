import React, { Component } from 'react';
import { Table, Button, Form, Select, Row, Col, Input } from 'antd';
import axios from 'axios';

const Option = Select.Option;
const FormItem = Form.Item;
// 创建表单
const CreateForm = Form.create()(props => {
  const { getFieldDecorator } = props.form;
  const {getTableList} = props;
  const province_list = [];
  // 提交
  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        axios.get("http://10.52.200.46:9002/api/order/detail", {params:Object.assign(values,{processed:true})})
        .then((res)=>{
          if(res.data.result) {
            res.data.result.forEach(function (el, i) {
              el.key = i + 1;
              if (el.status === 1) {
                el.status = "已办理";
              } else if (el.status === 2) {
                el.status = "已取消办理";
              }
            });
            getTableList(res.data.result)
          } else {
            getTableList([])
          }
        })
      }
    });
  }
  // 获得省
  axios.get("http://10.52.200.46:9002/api/address/province_name")
  .then( (res)=>{
    res.data.result.forEach((el,i)=>{
      province_list.push(<Option key={el}>{el}</Option>)
    })
  })
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row>
        <Col span={6}>
          <FormItem
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 8 }}
            label="邮寄地址"
          >
            {getFieldDecorator('province', { })(
              <Select placeholder="选择省" style={{ width: 150 }}>
                <Option value="">全国</Option>
                {province_list}
              </Select>
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 8 }}
            label="订单状态"
          >
            {getFieldDecorator('status', { })(
              <Select placeholder="处理状态" style={{ width: 150 }}>
                <Option value="">全部</Option>
                <Option value="1">已办理</Option>
                <Option value="2">已取消办理</Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col span={6}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{span: 6}} label="姓名">
            {getFieldDecorator('name', { })(<Input style={{ width: 100 }} placeholder="姓名"/>)}
          </FormItem>
        </Col>
        <Col span={2}>
          <FormItem  wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">提交</Button>
          </FormItem>
        </Col>
        </Row>
        

      </Form>
    </div>
  )

});
export default class DoneOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
    }
  }

  componentDidMount() {
    axios.get('http://10.52.200.46:9002/api/order/detail?processed=true')
      .then((res) => {
        res.data.result.forEach(function (el, i) {
          el.key = i + 1;
          if (el.status === 1) {
            el.status = "已办理";
          } else if (el.status === 2) {
            el.status = "已取消办理";
          }
        });
        this.setState({ dataList: res.data.result });
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  // 获取table
  getTableList = (values)=> {
    this.setState({dataList: values})
  }

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    // 表头
    const columns = [
      {
        title: '订单ID',
        dataIndex: 'order_id',
        key: 'order_id',
      },
      {
        title: '用户姓名',
        dataIndex: 'customer_name',
        key: 'customer_name',
      },
      {
        title: '新选号',
        dataIndex: 'svc_num',
        key: 'svc_num',
      },
      {
        title: '预留手机号',
        dataIndex: 'contact_phone',
        key: 'contact_phone',
      },
      {
        title: '邮寄地址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
      },
      {
        title: '更新时间',
        dataIndex: 'update_time',
        key: 'update_time',
      },
      {
        title: '订单状态',
        dataIndex: 'status',
        key: 'status',
      },
    ];
    return (
      <div>
        <CreateForm getTableList={this.getTableList}>
        </CreateForm>
        <Table columns={columns} dataSource={this.state.dataList} size="middle" />
      </div>
    );
  }
}
