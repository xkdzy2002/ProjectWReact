import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/map/js/china';
import $ from 'jquery';
import { Row, Col, Icon, DatePicker, Button } from 'antd';
import { now, moment } from 'moment';

export default class ZChinaMap extends Component {
  myEchart = null;

  zQueryDate = null;

  zEChartDom = null;

  // resdata = [
  //   { name: '北京', value: Math.round(Math.random() * 1000) },
  //   { name: '天津', value: Math.round(Math.random() * 1000) },
  //   { name: '上海', value: Math.round(Math.random() * 1000) },
  //   { name: '重庆', value: Math.round(Math.random() * 1000) },
  //   { name: '河北', value: Math.round(Math.random() * 1000) },
  //   { name: '河南', value: Math.round(Math.random() * 1000) },
  //   { name: '云南', value: Math.round(Math.random() * 1000) },
  //   { name: '辽宁', value: Math.round(Math.random() * 1000) },
  //   { name: '黑龙江', value: Math.round(Math.random() * 1000) },
  //   { name: '湖南', value: Math.round(Math.random() * 1000) },
  //   { name: '安徽', value: Math.round(Math.random() * 1000) },
  //   { name: '山东', value: Math.round(Math.random() * 1000) },
  //   { name: '新疆', value: Math.round(Math.random() * 1000) },
  //   { name: '江苏', value: Math.round(Math.random() * 1000) },
  //   { name: '浙江', value: Math.round(Math.random() * 1000) },
  //   { name: '江西', value: Math.round(Math.random() * 1000) },
  //   { name: '湖北', value: Math.round(Math.random() * 1000) },
  //   { name: '广西', value: Math.round(Math.random() * 1000) },
  //   { name: '甘肃', value: Math.round(Math.random() * 1000) },
  //   { name: '山西', value: Math.round(Math.random() * 1000) },
  //   { name: '内蒙古', value: Math.round(Math.random() * 1000) },
  //   { name: '陕西', value: Math.round(Math.random() * 1000) },
  //   { name: '吉林', value: Math.round(Math.random() * 1000) },
  //   { name: '福建', value: Math.round(Math.random() * 1000) },
  //   { name: '贵州', value: Math.round(Math.random() * 1000) },
  //   { name: '广东', value: Math.round(Math.random() * 1000) },
  //   { name: '青海', value: Math.round(Math.random() * 1000) },
  //   { name: '西藏', value: Math.round(Math.random() * 1000) },
  //   { name: '四川', value: Math.round(Math.random() * 1000) },
  //   { name: '宁夏', value: Math.round(Math.random() * 1000) },
  //   { name: '海南', value: Math.round(Math.random() * 1000) },
  //   { name: '台湾', value: Math.round(Math.random() * 1000) },
  //   { name: '香港', value: Math.round(Math.random() * 1000) },
  //   { name: '澳门', value: Math.round(Math.random() * 1000) },
  // ];

  updateMap = time => {
    this.zQueryDate = time;
    console.log(time);
    $.get('http://10.52.200.46:9002/api/order/count_by_day?date=' + time, data => {
      if (data.result == null) {
        return;
      }
      let maxvalue = 0;
      data.result.map(item => {
        if (item.value > maxvalue) {
          maxvalue = item.value;
        }
      });

      this.myEchart.setOption({
        backgroundColor: '#404a59',
        title: {
          text: '王卡订单来源分布',
          subtext: '日期：' + time,
          left: 'center',
          textStyle: {
            fontSize: 25,
            color: '#fff',
          },
          subtextStyle: {
            color: '#00FF00',
          },
        },
        tooltip: {
          trigger: 'item',
        },
        visualMap: {
          min: 0,
          max: maxvalue,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true,
          inRange: {
            color: ['#FFFFFF', '#2B32B2'], // 浅蓝
          },
          textStyle: {
            color: '#fff',
          },
          // dimension: 2
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: '王卡订单',
            type: 'map',
            mapType: 'china',
            roam: true,
            label: {
              show: true,
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(147, 235, 248, 1)',
                borderWidth: 1,
                areaColor: 'rgba(255,255,255,1)',
                shadowColor: 'rgba(128, 217, 248, 1)',
                // shadowColor: 'rgba(255, 255, 255, 1)',
                shadowOffsetX: -1,
                shadowOffsetY: -1,
                shadowBlur: 10,
              },
              emphasis: {
                areaColor: '#FF0000',
                borderWidth: 1,
              },
            },
            data: data.result,
          },
        ],
      });
    });
  };

  storeMapDom = element => {
    this.zEChartDom = element;
  };

  componentDidMount() {
    setTimeout(() => {
      console.log($(this.zEChartDom).height);
      this.myEchart = echarts.init(this.zEChartDom);
      let time = new Date(now());
      time = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
      this.updateMap(time);
      window.onresize = () => {
        this.myEchart.resize();
      };
    }, 100);
  }

  saveDatePicker = (e, datestring) => {
    this.zQueryDate = datestring;
  };
  queryButton = e => {
    this.updateMap(this.zQueryDate);
  };
  render() {
    return (
      <Row style={{ height: '100%', padding: '3px' }}>
        <Col span={24} style={{ height: '100%' }}>
          <Row style={{ height: '10%' }}>
            <Col span={6}>
              <DatePicker onChange={this.saveDatePicker} />
            </Col>
            <Col span={6}>
              <Button type="primary" icon="search" onClick={this.queryButton}>
                查询
              </Button>
            </Col>
          </Row>
          <Row style={{ height: '90%' }}>
            <Col span={24} style={{ height: '100%' }}>
              <div ref={this.storeMapDom} style={{ height: '100%' }} />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
