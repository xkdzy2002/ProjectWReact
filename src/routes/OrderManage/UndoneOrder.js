import React, { Component } from 'react';
import { Table, Form, Modal, Popconfirm, Divider, Button, Select, Input } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;
// 弹框
const CreateForm = Form.create()(props => {
  const { modalVisiable, showModal, formValues, form, get_data } = props;
  const { getFieldDecorator } = props.form;
  const Option = Select.Option;
  let optSts;
  //触发onOk事件的时候，首先检验，然后提交数据
  const okHandle = () => {
    form.validateFields((err, fieldsValues) => {
      if (err) { return; }
      const { order_id, customer_name, cert_num, address } = fieldsValues;
      let params = {};
      params.order_id = order_id;
      params.status = optSts;
      params.customer_name = customer_name;
      params.cert_num = cert_num;
      params.address = address;
      axios.get("http://10.52.200.46:9002/api/order/confirm", {params: params})
      .then((res)=>{
        console.log(res);
        get_data();
      })
      .catch((error)=> {
        console.log(error);
      });
    });
    showModal(false)
    
  }
  const handleChange =(value) => {
    console.log(`selected ${value}`);
    optSts = value;
  }
  return (
    <Modal
      visible={modalVisiable}
      title="确认订单"
      okText="确定"
      cancelText="取消"
      onOk={okHandle}
      onCancel={()=>showModal(false)}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{span:15}}>
        {getFieldDecorator('order_id', {
          initialValue: formValues.order_id
        })(<Input type="hidden"/>)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{span:15}} label="姓名">
        {getFieldDecorator('customer_name', {
          initialValue: formValues.customer_name
        })(<Input placeholder="姓名"/>)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{span:15}} label="身份证号">
        {getFieldDecorator('cert_num', {
          initialValue: formValues.cert_num
        })(<Input placeholder="身份证号"/>)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{span:15}} label="联系方式">
        {getFieldDecorator('contact_phone', {
          initialValue: formValues.contact_phone
        })(<Input placeholder="联系方式" disabled />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{span:15}} label="新选手机号">
        {getFieldDecorator('svc_num', {
          initialValue: formValues.svc_num
        })(<Input placeholder="新选手机号" disabled/>)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{span:15}} label="联系地址" >
        {getFieldDecorator('address', {
          initialValue: formValues.address
        })(<Input placeholder="联系地址"/>)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} label="处理选择">
        <Select style={{ width: 120 }} onChange={handleChange} placeholder="请选择">
          <Option value="1">确认办理</Option>
          <Option value="2">取消办理</Option>
        </Select>
      </FormItem>
    </Modal>
  )
})

export default class UndoneOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      modalVisiable: false,
      listIndex: -1
    }
  }
  componentDidMount() {
    this.get_data()
  }

  get_data = () => {
    axios.get('http://10.52.200.46:9002/api/order?key=status&value=0')
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

  columns = [
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
      title: '操作',
      key: 'action',
      render: (text, record, index) => (
        <Button type="primary" onClick={()=>this.showModal(true, index)}>
          编辑
        </Button>
      ),
    },
  ];
  showModal = (status, index) => {
    this.setState({
      modalVisiable: status,
      listIndex: index
    });
  };

  // handleOk = e => {
  //   this.setState({
  //     modalVisiable: false,
  //   });
  // };

  // handleCancel = e => {
  //   this.setState({
  //     modalVisiable: false,
  //   });
  // };
  render() {
    const { modalVisiable, listIndex } = this.state;
    const sor = [this.state.dataList[0]];
    return (
      <div>
        <Table columns={this.columns} dataSource={this.state.dataList} />
        <CreateForm
          modalVisiable={modalVisiable}
          showModal={this.showModal}
          get_data={this.get_data}
          formValues={this.state.dataList[listIndex]||{}}
        />
      </div>
    );
  }
}
