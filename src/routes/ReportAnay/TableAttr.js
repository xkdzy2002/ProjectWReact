import React, { Component } from 'react';
import { MiniArea } from 'components/Charts';
import NumberInfo from 'components/NumberInfo';
import moment from 'moment';
import numeral from 'numeral';

const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 100) + 10,
  });
}

class TableAttr extends Component {
  render() {
    return (
      <div>
        <NumberInfo subTitle={<span>本周访问</span>} total={numeral(12321).format('0,0')} />
        <MiniArea line height={45} data={visitData} />
      </div>
    );
  }
}

export default TableAttr;
