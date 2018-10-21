import React, { Component } from 'react';
import { Row, Col, Icon, DatePicker, Button } from 'antd';
import { now } from 'moment';
import ReactEcharts from 'echarts-for-react';
import Particles from 'react-particles-js';
import $ from 'jquery';
import 'echarts/map/js/china';
import TipBox from './TipBox';
let zAnimationOpts1 = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 80,
      },
    },
    color: {
      value: 'random',
    },
    shape: {
      type: 'triangle', //"circle","edge","triangle" "polygon" "star" "image"）
      stroke: {
        width: 0,
        color: '#000000',
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: 'img/github.svg',
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 1,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 4,
        size_min: 0.3,
        sync: false,
      },
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: '#ffffff',
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 600,
      },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'bubble',
      },
      onclick: {
        enable: true,
        mode: 'repulse',
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 250,
        size: 0,
        duration: 2,
        opacity: 0,
        speed: 3,
      },
      repulse: {
        distance: 400,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
};
let zAnimationOpts2 = {
  particles: {
    line_linked: {
      color: '#0000FF',
      distance: 150,
      width: 1,
      // shadow: {
      //   enable: true,
      //   color: "#3CA9D1",
      //   blur: 5
      // }
    },
    move: {
      speed: 9,
    },
    color: {
      value: '#FFFFFF',
    }, //'#fff'
    shape: {
      type: 'circle',
    }, // "circle", "edge" or "triangle"
    size: {
      value: 2,
      anim: {
        enable: false,
        speed: 6,
      },
      random: false,
    },
    number: {
      value: 80,
      density: {
        enable: false,
        value_area: 800,
      },
    },
  },
};

export default class ZChinaMap extends Component {
  zEchart = null;

  zQueryDate = null;

  zScroolTimer = null;

  zScroolPauser = false;

  zTempHilight = 0;

  zResdata = [
    { name: '北京', value: Math.round(Math.random() * 1000) },
    { name: '天津', value: Math.round(Math.random() * 1000) },
    { name: '上海', value: Math.round(Math.random() * 1000) },
    { name: '重庆', value: Math.round(Math.random() * 1000) },
    { name: '河北', value: Math.round(Math.random() * 1000) },
    { name: '河南', value: Math.round(Math.random() * 1000) },
    { name: '云南', value: Math.round(Math.random() * 1000) },
    { name: '辽宁', value: Math.round(Math.random() * 1000) },
    { name: '黑龙江', value: Math.round(Math.random() * 1000) },
    { name: '湖南', value: Math.round(Math.random() * 1000) },
    { name: '安徽', value: Math.round(Math.random() * 1000) },
    { name: '山东', value: Math.round(Math.random() * 1000) },
    { name: '新疆', value: Math.round(Math.random() * 1000) },
    { name: '江苏', value: Math.round(Math.random() * 1000) },
    { name: '浙江', value: Math.round(Math.random() * 1000) },
    { name: '江西', value: Math.round(Math.random() * 1000) },
    { name: '湖北', value: Math.round(Math.random() * 1000) },
    { name: '广西', value: Math.round(Math.random() * 1000) },
    { name: '甘肃', value: Math.round(Math.random() * 1000) },
    { name: '山西', value: Math.round(Math.random() * 1000) },
    { name: '内蒙古', value: Math.round(Math.random() * 1000) },
    { name: '陕西', value: Math.round(Math.random() * 1000) },
    { name: '吉林', value: Math.round(Math.random() * 1000) },
    { name: '福建', value: Math.round(Math.random() * 1000) },
    { name: '贵州', value: Math.round(Math.random() * 1000) },
    { name: '广东', value: Math.round(Math.random() * 1000) },
    { name: '青海', value: Math.round(Math.random() * 1000) },
    { name: '西藏', value: Math.round(Math.random() * 1000) },
    { name: '四川', value: Math.round(Math.random() * 1000) },
    { name: '宁夏', value: Math.round(Math.random() * 1000) },
    { name: '海南', value: Math.round(Math.random() * 1000) },
    { name: '台湾', value: Math.round(Math.random() * 1000) },
    { name: '香港', value: Math.round(Math.random() * 1000) },
    { name: '澳门', value: Math.round(Math.random() * 1000) },
  ];

  constructor(props) {
    super(props);
    let time = new Date(now());
    time = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();

    this.state = {
      zOptions: {
        title: {
          text: '王卡订单来源分布',
          subtext: '日期：' + time,
          left: 'center',
          textStyle: {
            fontSize: 25,
            color: '#fff',
          },
          subtextStyle: {
            color: '#fff',
          },
        },
        tooltip: {
          trigger: 'item',
        },
        visualMap: {
          min: 0,
          max: 1000,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true,
          inRange: {
            color: ['#64b8bd', '#006edd'], // 浅蓝
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
                areaColor: 'rgba(255,255,0,0.8)',
                borderWidth: 1,
                label: {
                  show: true
                }
              },
            },
            data: this.zResdata,
          },
        ],
      },
      zAnimation: zAnimationOpts2,
    };

    this.updateMap(time);
  }

  updateMap = time => {
    this.zQueryDate = time;
    console.log(time);
    $.get('http://10.52.200.46:9002/api/order/count_by_day?date=' + time, data => {
      if (data.result == null) {
        console.log(data);
        console.log('使用假数据');
        data.result = this.zResdata;
      }
      let maxvalue = 0;
      data.result.map(item => {
        if (item.value > maxvalue) {
          maxvalue = item.value;
        }
      });

      var opts = {
        // backgroundColor: '#404a59',
        title: {
          text: '王卡订单来源分布',
          subtext: '日期：' + time,
          left: 'center',
          textStyle: {
            fontSize: 25,
            color: '#fff',
          },
          subtextStyle: {
            color: '#fff',
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
            color: ['#64b8bd', '#006edd'], // 浅蓝
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
            itemStyle: {
              normal: {
                borderColor: 'rgba(147, 235, 248, 1)',
                borderWidth: 1,
                areaColor: 'rgba(255,255,255,0.1)',
                shadowColor: 'rgba(128, 217, 248, 1)',
                // shadowColor: 'rgba(255, 255, 255, 1)',
                shadowOffsetX: -1,
                shadowOffsetY: -1,
                shadowBlur: 10,
              },
              emphasis: {
                areaColor: 'rgba(255,255,0,0.8)',
                borderWidth: 1,
                lable: {
                  show: true,
                },
                
              },
            },
            data: data.result,
          },
        ],
      };
      this.setState({
        zOptions: opts,
      });
      var count = 0;
      var dataLength = data.result.length;
      this.zScroolTimer = setInterval(() => {
        if (this.zScroolPauser) {
          return;
        }
        this.zEchart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
        });
        this.zEchart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: count % dataLength,
        });
        this.zEchart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: count % dataLength,
          position: [10, 10],
        });
        count++;
      }, 1000);
      this.zEchart.on('mouseover', params => {
        this.zScroolPauser = true;
        this.zEchart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
        });
        this.zEchart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: params.dataIndex,
        });
        this.zEchart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: params.dataIndex,
          position: [10, 10],
        });
      });
      this.zEchart.on('mouseout', params => {
        this.zScroolPauser = false;
      });
    });
  };

  storeMapDom = element => {
    this.zEChartDom = element;
  };

  saveDatePicker = (e, datestring) => {
    this.zQueryDate = datestring;
  };
  queryButton = e => {
    this.updateMap(this.zQueryDate);
  };

  onChartReady = echart => {
    this.zEchart = echart;
  };

  render() {
    return (
      <Row style={{ height: '100%', padding: '3px', minHeight: '500px' }}>
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
          <Row style={{ height: '90%', backgroundColor: 'black' }}>
            <Col span={24} style={{ height: '100%' }}>
              <Particles
                params={this.state.zAnimation}
                style={{ height: '100%', width: '100%', position: 'absolute' }}
              />
              <ReactEcharts
                onChartReady={this.onChartReady}
                style={{ height: '100%' }}
                option={this.state.zOptions}
              />
              {/* <div ref={this.zEChartDom} style={{ height: '100%' }}></div> */}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
