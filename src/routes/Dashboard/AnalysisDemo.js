import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {Row,Col,Icon,Card,Tabs,Table,Radio,DatePicker,Tooltip,Menu,Dropdown,} from 'antd';
import numeral from 'numeral';
import { ChartCard, yuan, MiniArea, MiniBar,MiniProgress,Field,Bar,Pie,TimelineChart,} from '../../components/Charts';
import Trend from '../../components/Trend';
import NumberInfo from '../../components/NumberInfo';
import { getTimeDistance } from '../../utils/utils';
import axios from './../../axios';

import styles from './AnalysisDemo.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const rankingListData = [];
const provincename = ["浙江","山西","北京","广东","重庆","河南","福建","安徽","江西","天津"];
for (let i = 0; i <= 9; i += 1) {
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
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};


export default class  AnalysisDemo extends Component{

  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
    orderByDay:'',
    orderByMonth:'',
    salesExtra:'',
    loading:false,
  };
  interval1 = null;
  interval2 = null;

  componentDidMount() {
    const { dispatch } = this.props;
    this.setState({
        salesExtra:(
        <div className={styles.salesExtraWrap}>
          <div className={styles.salesExtra}>
            <a className={this.isActive('today')} onClick={() => this.selectDate('today')}>
              今日
            </a>
            <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
              本周
            </a>
            <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
              本月
            </a>
            <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
              全年
            </a>
          </div>
          <RangePicker
            value={this.state.rangePickerValue}

            style={{ width: 256 }}
          />
        </div>
      )
    }

    );

    this.interval1 = setInterval(()=>{
      this.order_number_by_day();
    },1000);

    this.interval2 = setInterval(()=>{
      this.order_number_by_month();
    },3000);
  }

   isActive(type) {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
  }

  selectDate = type => {
    this.setState({
      rangePickerValue: getTimeDistance(type),
  });

  };
  componentWillUnmount(){
    this.setState = (state,callback)=>{
    return;
    };
    clearInterval(this.interval1);
    clearInterval(this.interval2);
  }
  order_number_by_day = ()=>{
        axios.ajax({
            url:'/stat/order_number_by_day',
            data:{
                params:{
                    page:1
                },
                //isShowLoading:false
            }
        }).then((res) =>{
            if(!res.error){
                res.result.map((item,index)=>{
                    item.key = index;
                })
                this.setState({
                    orderByDay:res.result
                });
            }
        })
    }

    order_number_by_month = ()=>{
        axios.ajax({
            url:'/stat/order_number_by_month',
            data:{
                params:{
                    page:1
                },
            }
        }).then((res) =>{
            // json对象数组，用于存放转化完成后的json对象
            let JsonArray = [];
            if(!res.error){
                // 对数据集中的每个数据进行遍历操作
                res.result.map((item,index)=>{
                    // 将每个item项目{month: "XXXX", count: XXX}转换成{x:"[1-12]月",y:[]}的格式
                    // 表格需要按此格式设置数据项才能正常显示
                    // console.log(item);
                    // 解构赋值
                    let {month,count} = item;
                    // 按照格式要求制作新的json临时对象
                    // 2018-01
                    let jsontemp = {x: index + 1 + '月',y:count};
                    // 验证结果
                    // console.log(jsontemp);
                    // 加入到对象数组
                    JsonArray.push(jsontemp);
                })
                // console.log(JsonArray);
                this.setState({
                    // 设置图表需要使用的Jason对象数组
                    orderByMonth:JsonArray
                });
            }
        })
    }
  render(){
      return(
          <Fragment>
            <Row gutter={24}>
              <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title="总销售额"
                loading={false}
                action={
                  <Tooltip title="指标说明">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={() => <Yuan>126560</Yuan>}
                footer={<Field label="日均销售额" value={`￥${numeral(12423).format('0,0')}`} />}
                contentHeight={46}
              >
                <Trend flag="up" style={{ marginRight: 16 }}>
                  周同比
                  <span className={styles.trendText}>12%</span>
                </Trend>
                <Trend flag="down">
                  日环比
                  <span className={styles.trendText}>11%</span>
                </Trend>
              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title="访问量"
                loading={false}
                action={
                  <Tooltip title="指标说明">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={numeral(8846).format('0,0')}
                footer={<Field label="日访问量" value={numeral(1234).format('0,0')} />}
                contentHeight={46}
              >
                <MiniArea color="#975FE4" data={this.state.orderByDay}/>
              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title="支付笔数"
                loading={false}
                action={
                  <Tooltip title="指标说明">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={numeral(6560).format('0,0')}
                footer={<Field label="转化率" value="60%" />}
                contentHeight={46}
              >
                <MiniBar data={this.state.orderByDay}/>
              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title="运营活动效果"
                loading={false}
                action={
                  <Tooltip title="指标说明">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total="78%"
                footer={
                  <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    <Trend flag="up" style={{ marginRight: 16 }}>
                      周同比
                      <span className={styles.trendText}>12%</span>
                    </Trend>
                    <Trend flag="down">
                      日环比
                      <span className={styles.trendText}>11%</span>
                    </Trend>
                  </div>
                }
                contentHeight={46}
              >
                <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />
              </ChartCard>
            </Col>
          </Row>

          <Card loading={this.state.loading} bordered={false} bodyStyle={{ padding: 0 }}>
          <div className={styles.salesCard}>
            <Tabs tabBarExtraContent={this.state.salesExtra} size="large" tabBarStyle={{ marginBottom: 24 }}>
              <TabPane tab="销售额" key="sales">
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar height={295} title="销售额趋势" data={this.state.orderByMonth} />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>省分销售量排名Top10</h4>
                      <ul className={styles.rankingList}>
                        {rankingListData.map((item, i) => (
                          <li key={item.title}>
                            <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                            <span>{item.title}</span>
                            <span>{numeral(item.total).format('0,0')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="访问量" key="views">
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar height={292} title="访问量趋势" data={this.state.orderByMonth} />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>省分访问量排名Top10</h4>
                      <ul className={styles.rankingList}>
                        {rankingListData.map((item, i) => (
                          <li key={item.title}>
                            <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                            <span>{item.title}</span>
                            <span>{numeral(item.total).format('0,0')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Card>

          {/*<Card
            className={styles.offlineCard}
            bordered={false}
            bodyStyle={{ padding: '0 0 32px 0' }}
            style={{ marginTop: 32 }}
          >
          <Tabs onChange={this.handleTabChange}>
            {offlineData.map(shop => (
              <TabPane tab={<CustomTab data={shop} currentTabKey={activeKey} />} key={shop.name}>
                <div style={{ padding: '0 24px' }}>
                  <TimelineChart
                    height={400}
                    titleMap={{ y1: '客流量', y2: '支付笔数' }}
                  />
                </div>
              </TabPane>
            ))}
          </Tabs>
          </Card>*/}

        </Fragment>
      )
    }
}
