import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './TipBox.less';

export default class TipBox extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    messages: PropTypes.array,
  };

  render() {
    let { title, messages } = this.props;
    return (
      <div className={styles.zBox}>
        <div className={styles.zTitle}>{title}</div>
        <div className={styles.zSpan} />
        {messages.map((v, i) => {
          return (
            <div key={i} className={styles.zMessage}>
              {v}
            </div>
          );
        })}
      </div>
    );
  }
}
