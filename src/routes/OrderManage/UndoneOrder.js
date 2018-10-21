import React, { Component } from 'react';
import { Table, Form, Modal, Popconfirm, Divider, Button, Select, Input } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;
// 弹框
const CreateForm = Form.create()(props => {
  const { modalVisiable, showModal, formValues, form, get_data } = props;
  const { getFieldDecorator } = props.form;
  const Option = Select.Option;
  //触发onOk事件的时候，首先检验，然后提交数据
  const okHandle = () => {
    form.validateFields((err, fieldsValues) => {
      if (err) { return; }
      const { order_id, customer_name, cert_num, address, status } = fieldsValues;
      let params = {};
      params.order_id = order_id;
      params.status = status;
      params.customer_name = customer_name;
      params.cert_num = cert_num;
      params.address = address;
      axios.get("http://10.52.200.46:9002/api/order/confirm", {params: params})
      .then((res)=>{
        get_data();
      })
      .catch((error)=> {
        console.log(error);
      });
      form.resetFields();
      showModal(false);
    });
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
          initialValue: formValues.customer_name,
          rules: [{
            required: true,
            message: '请输入正确姓名',
            pattern: /^[\u4E00-\u9FA5]{2,4}$/
          }],
        })(<Input placeholder="姓名"/>)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{span:15}} label="身份证号">
        {getFieldDecorator('cert_num', {
          initialValue: formValues.cert_num,
          rules: [{
            required: true,
            message: '请输入正确身份证号',
            max: 18,
            pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
          }],
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
          initialValue: formValues.address,
          rules: [{
            required: true,
            message: '请输入正确地址',
            min: 6
          }],
        })(<Input placeholder="联系地址"/>)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} label="处理选择" >
        {getFieldDecorator('status', { rules: [{
            required: true,
            message: '必填选项',
          }],})(
          <Select style={{ width: 120 }} placeholder="请选择">
            <Option value="1">已办理</Option>
            <Option value="2">已取消办理</Option>
          </Select>
        )}
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
      title: '操作',
      key: 'action',
      render: (text, record, index) => (
        <Button type="primary" icon="edit" size="small" onClick={()=>this.showModal(true, index)}>
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

  render() {
    const { modalVisiable, listIndex } = this.state;
    const sor = [this.state.dataList[0]];
    return (
      <div>
        <Table columns={this.columns} dataSource={this.state.dataList} size="small" />
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
