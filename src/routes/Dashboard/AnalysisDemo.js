import React, { Component, Fragment } from 'react';
import {Row,Col,Icon,Card,Tabs,Table,Radio,DatePicker,Tooltip,Menu,Dropdown,} from 'antd';
import numeral from 'numeral';
import { ChartCard, yuan, MiniArea, MiniBar,MiniProgress,Field,Bar,Pie,TimelineChart,} from '../../components/Charts';
import Trend from '../../components/Trend';
import NumberInfo from '../../components/NumberInfo';
import { getTimeDistance } from '../../utils/utils';

import styles from './AnalysisDemo.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
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

// @connect(({ chart, loading }) => ({
//   chart,
//   loading: loading.effects['chart/fetch'],
// }))

export default class  AnalysisDemo extends Component{

  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
  };

  componentDidMount() {
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'chart/fetch',
    // });
  }

  render(){
      return(
          <Fragment>
            <Row gutter={24}>
              <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title="总销售额"
                // loading={}
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

                action={
                  <Tooltip title="指标说明">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={numeral(8846).format('0,0')}
                footer={<Field label="日访问量" value={numeral(1234).format('0,0')} />}
                contentHeight={46}
              >
                <MiniArea color="#975FE4" />
              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title="支付笔数"

                action={
                  <Tooltip title="指标说明">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={numeral(6560).format('0,0')}
                footer={<Field label="转化率" value="60%" />}
                contentHeight={46}
              >
                <MiniBar  />
              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title="运营活动效果"

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

            <Card bordered={false} bodyStyle={{ padding: 0 }}>
            <div className={styles.salesCard}>
              <Tabs size="large" tabBarStyle={{ marginBottom: 24 }}>
                <TabPane tab="销售额" key="sales">
                  <Row>
                    <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                      <div className={styles.salesBar}>
                        <Bar height={295} title="销售额趋势" />
                      </div>
                    </Col>
                    <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                      <div className={styles.salesRank}>
                        <h4 className={styles.rankingTitle}>门店销售额排名</h4>
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
                        <Bar height={292} title="访问量趋势" />
                      </div>
                    </Col>
                    <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                      <div className={styles.salesRank}>
                        <h4 className={styles.rankingTitle}>门店访问量排名</h4>
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
