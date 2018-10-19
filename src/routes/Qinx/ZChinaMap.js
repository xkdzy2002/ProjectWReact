import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/map/js/china';
import $ from 'jquery';
import { Row, Col, Icon, DatePicker, Button } from 'antd';
import { now, moment } from 'moment';
import './dist/particles'
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
                areaColor: 'rgba(255,255,0,0.8)',
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

  testfunction() {
    var RENDERER = {
      BASE_PARTICLE_COUNT: 20,
      WATCH_INTERVAL: 50,

      init: function () {
        this.setParameters();
        this.reconstructMethods();
        this.setup();
        this.bindEvent();
        this.render();
      },
      setParameters: function () {
        this.$window = $(window);
        this.$container = $('#jsi-particle-container');
        this.$canvas = $('#jsi-particle-container');
        this.context = this.$canvas.appendTo(this.$container).get(0).getContext('2d');
        this.particles = [];
        this.watchIds = [];
        this.gravity = { x: 0, y: 0, on: false, radius: 100, gravity: true };
      },
      setup: function () {
        this.particles.length = 0;
        this.watchIds.length = 0;
        this.width = this.$container.width();
        this.height = this.$container.height();
        this.$canvas.attr({ width: this.width, height: this.height });
        this.distance = Math.sqrt(Math.pow(this.width / 2, 2) + Math.pow(this.height / 2, 2));
        this.createParticles();
      },
      reconstructMethods: function () {
        this.watchWindowSize = this.watchWindowSize.bind(this);
        this.jdugeToStopResize = this.jdugeToStopResize.bind(this);
        this.render = this.render.bind(this);
      },
      createParticles: function () {
        for (var i = 0, count = (this.BASE_PARTICLE_COUNT * this.width / 500 * this.height / 500) | 0; i < count; i++) {
          this.particles.push(new PARTICLE(this));
        }
      },
      watchWindowSize: function () {
        this.clearTimer();
        this.tmpWidth = this.$window.width();
        this.tmpHeight = this.$window.height();
        this.watchIds.push(setTimeout(this.jdugeToStopResize, this.WATCH_INTERVAL));
      },
      clearTimer: function () {
        while (this.watchIds.length > 0) {
          clearTimeout(this.watchIds.pop());
        }
      },
      jdugeToStopResize: function () {
        var width = this.$window.width(),
          height = this.$window.height(),
          stopped = (width == this.tmpWidth && height == this.tmpHeight);

        this.tmpWidth = width;
        this.tmpHeight = height;

        if (stopped) {
          this.setup();
        }
      },
      bindEvent: function () {
        this.$window.on('resize', this.watchWindowSize);
        this.$container.on('mousemove', this.controlForce.bind(this, true));
        this.$container.on('mouseleave', this.controlForce.bind(this, false));
      },
      controlForce: function (on, event) {
        this.gravity.on = on;

        if (!on) {
          return;
        }
        var offset = this.$container.offset();
        this.gravity.x = event.clientX - offset.left + this.$window.scrollLeft();
        this.gravity.y = event.clientY - offset.top + this.$window.scrollTop();
      },
      render: function () {
        requestAnimationFrame(this.render);

        var context = this.context;
        context.save();
        context.fillStyle = 'hsla(0, 0%, 0%, 0.3)';
        context.fillRect(0, 0, this.width, this.height);
        context.globalCompositeOperation = 'lighter';

        for (var i = 0, particles = this.particles, gravity = this.gravity, count = particles.length; i < count; i++) {
          var particle = particles[i];

          for (var j = i + 1; j < count; j++) {
            particle.checkForce(context, particles[j]);
          }
          particle.checkForce(context, gravity);
          particle.render(context);
        }
        context.restore();
      }
    };
    var PARTICLE = function (renderer) {
      this.renderer = renderer;
      this.init();
    };
    PARTICLE.prototype = {
      THRESHOLD: 100,
      SPRING_AMOUNT: 0.001,
      LIMIT_RATE: 0.2,
      GRAVIY_MAGINIFICATION: 10,

      init: function () {
        this.radius = this.getRandomValue(5, 15);
        this.x = this.getRandomValue(-this.renderer.width * this.LIMIT_RATE, this.renderer.width * (1 + this.LIMIT_RATE)) | 0;
        this.y = this.getRandomValue(-this.renderer.width * this.LIMIT_RATE, this.renderer.height * (1 + this.LIMIT_RATE)) | 0;
        this.vx = this.getRandomValue(-3, 3);
        this.vy = this.getRandomValue(-3, 3);
        this.ax = 0;
        this.ay = 0;
        this.gravity = false;
        this.transformShape();
      },
      getRandomValue: function (min, max) {
        return min + (max - min) * Math.random();
      },
      transformShape: function () {
        var velocity = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        this.scale = 1 - velocity / 15;
        this.hue = ((180 + velocity * 10) % 360) | 0;
      },
      checkForce: function (context, particle) {
        if (particle.gravity && !particle.on) {
          return;
        }
        var dx = particle.x - this.x,
          dy = particle.y - this.y,
          distance = Math.sqrt(dx * dx + dy * dy),
          magnification = (particle.gravity ? this.GRAVIY_MAGINIFICATION : 1);

        if (distance > this.THRESHOLD * magnification) {
          return;
        }
        var rate = this.SPRING_AMOUNT / magnification / (this.radius + particle.radius);
        this.ax = dx * rate * particle.radius;
        this.ay = dy * rate * particle.radius;

        if (!particle.gravity) {
          particle.ax = -dx * rate * this.radius;
          particle.ay = -dy * rate * this.radius;
        }
        if (distance > this.THRESHOLD) {
          return;
        }
        context.lineWidth = 3;
        context.strokeStyle = 'hsla(' + this.hue + ', 70%, 30%, ' + (Math.abs(this.THRESHOLD - distance) / this.THRESHOLD) + ')';
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(particle.x, particle.y);
        context.stroke();
      },
      render: function (context) {
        context.save();
        context.fillStyle = 'hsl(' + this.hue + ', 70%, 40%)';
        context.translate(this.x, this.y);
        context.rotate(Math.atan2(this.vy, this.vx) + Math.PI / 2);
        context.scale(this.scale, 1);
        context.beginPath();
        context.arc(0, 0, this.radius, 0, Math.PI * 2, false);
        context.fill();
        context.restore();

        this.x += this.vx;
        this.y += this.vy;
        this.vx += this.ax;
        this.vy += this.ay;

        if (this.x < -this.radius && this.vx < 0 || (this.x > this.renderer.width + this.radius) && this.vx > 0 || this.y < -this.radius && this.vy < 0 || (this.y > this.renderer.height + this.radius) && this.vy > 0) {
          var theta = this.getRandomValue(0, Math.PI * 2),
            sin = Math.sin(theta),
            cos = Math.cos(theta),
            velocity = this.getRandomValue(-3, 3);

          this.x = -(this.renderer.distance + this.radius) * cos + this.renderer.width / 2;
          this.y = -(this.renderer.distance + this.radius) * sin + this.renderer.height / 2;
          this.vx = velocity * cos;
          this.vy = velocity * sin;
        }
        this.transformShape();
      }
    };
    RENDERER.init();

  }

  testfunction2(id)
  {
    particlesJS(id, {
      particles: {
        color: '#fff',
        shape: 'circle', // "circle", "edge" or "triangle"
        opacity: 1,
        size: 2,
        size_random: true,
        nb: 80,
        line_linked: {
          enable_auto: true,
          distance: 100,
          color: '#0000FF',
          opacity: 1,
          width: 1,
          condensed_mode: {
            enable: false,
            rotateX: 600,
            rotateY: 600
          }
        },
        anim: {
          enable: true,
          speed: 1
        }
      },
      interactivity: {
        enable: false,
        mouse: {
          distance: 300
        },
        detect_on: 'canvas', // "canvas" or "window"
        mode: 'grab',
        line_linked: {
          opacity: .3
        },
        events: {
          onclick: {
            enable: false,
            mode: 'push', // "push" or "remove"
            nb: 4
          }
        }
      },
      /* Retina Display Support */
      retina_detect: true
    });
  }

  componentDidMount() {
    setTimeout(() => {
      // console.log($(this.zEChartDom).height);
      this.myEchart = echarts.init(this.zEChartDom);
      let time = new Date(now());
      time = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
      this.updateMap(time);
      window.onresize = () => {

        this.myEchart.resize();

      };
      this.testfunction2('jsi-particle-container');
      // this.testfunction();
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
          <Row style={{ height: '90%', backgroundColor: 'black'  }}>
            <div id="jsi-particle-container" style={{ height: '100%', width: '100%', position: "absolute"}}></div>
            <Col span={24} style={{ height: '100%' }}>
              <div ref={this.storeMapDom} style={{ height: '100%' }} />
            </Col>
          </Row>

        </Col>
      </Row>
    );
  }
}
