import React from 'react';
import { Row, Col } from 'antd';
import Util from '../../utils/utils';
import axios from '../../axios';

export default class TimeAndWeahter extends React.Component {
  state = {};

  componentWillMount() {
    this.setState({});

    setInterval(() => {
      let sysTime = Util.formateDate(new Date().getTime());
      this.setState({
        sysTime,
      });
    }, 1000);

    this.getWeatherAPIData();
  }
  getWeatherAPIData() {
    let city = '北京';
    axios
      .jsonp({
        url:
          'http://api.map.baidu.com/telematics/v3/weather?location=' +
          encodeURIComponent(city) +
          '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2',
      })
      .then(res => {
        if (res.status == 'success') {
          let data = res.results[0].weather_data[0];
          this.setState({
            dayPictureUrl: data.dayPictureUrl,
            weather: data.weather,
          });
        }
      });
  }

  render() {
    return (
      <div>
        <span className="date">{this.state.sysTime}</span>
        &nbsp;&nbsp;
        <span className="weather-img">
          <img src={this.state.dayPictureUrl} alt="" />
        </span>
        &nbsp;&nbsp;
        <span className="weather-detail">{this.state.weather}</span>
      </div>
    );
  }
}
