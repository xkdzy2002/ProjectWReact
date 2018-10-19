import React, { Component } from 'react';
import { Table, Button, Form, Select, Row, Col } from 'antd';
import axios from 'axios';

const Option = Select.Option;
const FormItem = Form.Item;
const CreateForm = Form.create()(props => {
  const { getFieldDecorator } = props.form;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(123);
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     console.log('Received values of form: ', values);
    //   }
    // });
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row>
        <Col span={8}>
          <FormItem
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 8 }}
            label="邮寄地址"
            hasFeedback
          >
            {getFieldDecorator('address', {
              rules: [
                { required: true, message: 'Please select your country!' },
              ],
            })(
              <Select placeholder="Please select a country" style={{ width: 200 }}>
                <Option value="china">China</Option>
                <Option value="use">U.S.A</Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 8 }}
            label="订单状态"
            hasFeedback
          >
            {getFieldDecorator('orderStatus', {
              rules: [
                { required: true, message: 'Please select your country!' },
              ],
            })(
              <Select placeholder="Please select a country" style={{ width: 200 }}>
                <Option value="china">China</Option>
                <Option value="use">U.S.A</Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem
            wrapperCol={{ span: 12, offset: 6 }}
          >
            <Button type="primary" htmlType="submit">Submit</Button>
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
    axios.get('http://10.52.200.46:9002/api/order?key=status&value=1')
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
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }


  // state = {
  //   filteredInfo: null,
  //   sortedInfo: null,
  // };

  // handleChange = (pagination, filters, sorter) => {
  //   console.log('Various parameters', pagination, filters, sorter);
  //   this.setState({
  //     filteredInfo: filters,
  //     sortedInfo: sorter,
  //   });
  // };

  // clearFilters = () => {
  //   this.setState({ filteredInfo: null });
  // };

  // clearAll = () => {
  //   this.setState({
  //     filteredInfo: null,
  //     sortedInfo: null,
  //   });
  // };

  // setAgeSort = () => {
  //   this.setState({
  //     sortedInfo: {
  //       order: 'descend',
  //       columnKey: 'age',
  //     },
  //   });
  // };

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
        // filters: [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }],
        // filteredValue: filteredInfo.name || null,
        // onFilter: (value, record) => record.name.includes(value),
        // sorter: (a, b) => a.name.length - b.name.length,
        // sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      },
      {
        title: '用户姓名',
        dataIndex: 'customer_name',
        key: 'customer_name',
        // sorter: (a, b) => a.age - b.age,
        // sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
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
        // filters: [{ text: 'London', value: 'London' }, { text: 'New York', value: 'New York' }],
        // filteredValue: filteredInfo.address || null,
        // onFilter: (value, record) => record.address.includes(value),
        // sorter: (a, b) => a.address.length - b.address.length,
        // sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
      },
      {
        title: '订单状态',
        dataIndex: 'status',
        key: 'status',
        // filters: [{ text: 'London', value: 'London' }, { text: 'New York', value: 'New York' }],
        // filteredValue: filteredInfo.status || null,
        // onFilter: (value, record) => record.address.includes(value),
      },
    ];
    return (
      <div>
        <CreateForm>
        </CreateForm>
        <Table columns={columns} dataSource={this.state.dataList} />
      </div>
    );
  }
}
