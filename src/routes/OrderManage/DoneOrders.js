import React, { Component } from 'react';
import { Table, Button } from 'antd';
import axios from 'axios';

export default class DoneOrders extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dataList: [],
    }
}

  componentDidMount() {
    axios.get('http://10.52.200.46:9002/api/order?key=status&value=1')
    .then((res)=>{
      res.data.result.forEach(function(el, i) {
        el.key = i+1;
      });
      this.setState({dataList: res.data.result});
    })
    .catch(function(error){
      console.log(error);
    });
}

  state = {
    filteredInfo: null,
    sortedInfo: null,
  };

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  };

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
    ];
    return (
      <div>
        <div className="table-operations">
          {/* <Button onClick={this.setAgeSort}>Sort age</Button>
                    <Button onClick={this.clearFilters}>Clear filters</Button> */}
          {/* <Button onClick={this.clearAll}>恢复默认设置</Button> */}
        </div>
        <Table columns={columns} dataSource={this.state.dataList} onChange={this.handleChange} />
      </div>
    );
  }
}
