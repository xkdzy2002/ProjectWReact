import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Card, Tabs, Table, Radio, DatePicker, Tooltip, Menu, Dropdown, } from 'antd';
import numeral from 'numeral';
import { ChartCard, yuan, MiniArea, MiniBar, MiniProgress, Field, Bar, Pie, WaterWave, TimelineChart, } from '../../components/Charts';
import Trend from '../../components/Trend';
import NumberInfo from '../../components/NumberInfo';
import { getTimeDistance } from '../../utils/utils';
import axios from './../../axios';

import styles from './TransferRatio.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const provincename = ["浙江", "山西", "北京", "广东", "重庆", "河南", "福建", "安徽", "江西", "天津"];
const rankingListData = [];
for (let i = 1; i <= 10; i += 1) {
  rankingListData.push({
    title: `${provincename[i]}`,
    total: 323234,
  });
}

const Yuan = ({ children }) => (
  <span
    dangerouslySetInnerHTML={{ __html: yuan(children) }} /* eslint-disable-line react/no-danger */
  />
);

const topColResponsiveProps = {
  xs: 24, sm: 12, md: 12, lg: 12, xl: 6,
  style: { marginBottom: 24 },
};


let chartData = [];
for (let i = 0; i < 20; i += 1) {
  chartData.push({
    x: (new Date().getTime()) + (1000 * 60 * 30 * i),
    y1: Math.floor(Math.random() * 100) + 1000,
    y2: Math.floor(Math.random() * 100) + 10,
  });
}


let CustomTab = ({ data, currentTabKey: currentKey }) => (
  <Row gutter={8} style={{ width: 138, margin: '8px 0' }}>
    <Col span={12}>
      <NumberInfo
        title={data.name}
        subTitle="转化率"
        gap={2}
        total={`${data.cvr * 100}%`}
        theme={currentKey !== data.name && 'light'}
      />
    </Col>
    <Col span={12} style={{ paddingTop: 36 }}>
      <Pie
        animate={false}
        color={currentKey !== data.name && '#BDE4FF'}
        inner={0.55}
        tooltip={false}
        margin={[0, 0, 0, 0]}
        percent={data.cvr * 100}
        height={64}
      />
    </Col>
  </Row>
);

let one; let two; let three;
export default class TransferRatio extends Component {

  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
    offlineData: [],
    offlineChartData: [],
    activeKey: '',
    // 粗暴的解决办法
    one: { name: '', cvr: '', percent: '', total: '' },
    two: { name: '', cvr: '', percent: '', total: '' },
    three: { name: '', cvr: '', percent: '', total: '' },
    four: { name: '', cvr: '', percent: '', total: '' },
    five: { name: '', cvr: '', percent: '', total: '' },
    six: { name: '', cvr: '', percent: '', total: '' },
    seven: { name: '', cvr: '', percent: '', total: '' },
    eight: { name: '', cvr: '', percent: '', total: '' },
    percent: '',
    subTitle: '',
    total: ''
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.setState({
      activeKey: this.state.currentTabKey || (this.state.offlineData[0] && this.state.offlineData[0].name),
      percent: 50,
      subTitle: '浙江',
      total: '50%',
    });

    this.interval1 = setInterval(() => {
      this.order_number_by_timeseries();
    }, 1000);

    this.interval2 = setInterval(() => {
      this.province_with_transferatio();
    }, 3000);
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
    clearInterval(this.interval1);
    clearInterval(this.interval2);
  }

  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };

  order_number_by_timeseries = () => {
    axios.ajax({
      url: '/stat/order_number_by_timeseries',
      data: {
        params: {
          page: 1
        },
      }
    }).then((res) => {
      if (!res.error) {
        chartData = res.result;
      }
    })
  }

  province_with_transferatio = () => {
    axios.ajax({
      url: '/stat/province_with_transferatio',
      data: {
        params: {
          page: 1
        },
      }
    }).then((res) => {

      if (!res.error) {
        res.result.map((item, index) => {
          // item.key = index;
          item.percent = item.cvr * 100;
          item.total = item.cvr * 100 + '%';
        })
        this.setState({
          offlineData: res.result,
          one: res.result[0],
          two: res.result[1],
          three: res.result[2],
          four: res.result[3],
          five: res.result[4],
          six: res.result[5],
          seven: res.result[6],
          eight: res.result[7]
        });

      }
      // console.log("one:",one.name,one.percent,one.total);
      console.log(this.state.one);
      two = this.state.offlineData[1];
      three = this.state.offlineData[2];
    })
  }
  render() {

    return (
      <Fragment>
        <Card
          className={styles.offlineCard}
          bordered={false}
          bodyStyle={{ padding: '0 0 32px 0' }}
          style={{ marginTop: 32 }}
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={3}>
              <div className="gutter-box">
                  <Pie percent={this.state.one.percent} subTitle={this.state.one.name} total={this.state.one.total} height={140} />
              </div>
            </Col>
            <Col className="gutter-row" span={3}>
              <div className="gutter-box">
                  <Pie percent={this.state.two.percent} subTitle={this.state.two.name} total={this.state.two.total} height={140} />
              </div>
            </Col>
            <Col className="gutter-row" span={3}>
              <div className="gutter-box">
                  <Pie percent={this.state.three.percent} subTitle={this.state.three.name} total={this.state.three.total} height={140} />
              </div>
            </Col>
            <Col className="gutter-row" span={3}>
              <div className="gutter-box">
                  <Pie percent={this.state.four.percent} subTitle={this.state.four.name} total={this.state.four.total} height={140} />
              </div>
            </Col>
            <Col className="gutter-row" span={3}>
              <div className="gutter-box">
                  <Pie percent={this.state.five.percent} subTitle={this.state.five.name} total={this.state.five.total} height={140} />
              </div>
            </Col>
            <Col className="gutter-row" span={3}>
              <div className="gutter-box">
                  <Pie percent={this.state.six.percent} subTitle={this.state.six.name} total={this.state.six.total} height={140} />
              </div>
            </Col>
            <Col className="gutter-row" span={3}>
              <div className="gutter-box">
                  <Pie percent={this.state.seven.percent} subTitle={this.state.seven.name} total={this.state.seven.total} height={140} />
              </div>
            </Col>
            <Col className="gutter-row" span={3}>
              <div className="gutter-box">
                  <Pie percent={this.state.eight.percent} subTitle={this.state.eight.name} total={this.state.eight.total} height={140} />
              </div>
            </Col>
          </Row>
          <TimelineChart
            height={400}
            data={chartData}
            titleMap={{ y1: '访问量', y2: '销售量' }}
          />
        </Card>
      </Fragment>
    )
  }
}

