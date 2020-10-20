import React from 'react';
// import style from './style.less';


/**
 *
 *
 * @export 左侧目录展示 防腐层破损点
 * @class Damage
 * @extends {React.Component}
 */
export class Damage  extends React.Component{
  constructor(props) {
    super(props);
    this.state = {}
  }

  option = {
    title: {
      text: '防腐破损点',
      top: 12,
      textStyle: {
        color: 'rgba(85, 104, 186, 1)',
        fontSize: 12,
        textAlign: 'left',
        fontWeight: 'normal',
      }
    },
    barWidth: '60%',
    tooltip: {
      trigger: 'axis',
      formatter: `{b0}<br/>{a0}: {c0}%`
    },
    grid: {
      left: '35%',
      top: '25%',
      height: 100,
    },
    yAxis: [{
      position: 'left',
      // name: '衣服',
      data: ["GN482336", "GN157393", "GN23386"],
      axisLine: {
        show: false,
        lineStyle: {
          color: 'gray'
        }
      },
      axisTick: {
        show: false
      }
    }],
    xAxis: [{
      show: false,
      name: 'y轴',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    }],
    series: [{
      label: {
        show: true,
        position: 'inside',
        formatter: `{c0}%`
      },
      type: 'bar',
      data: [10, 8.4, 5.7],
      itemStyle: {
        color: '#6971C0',
      }
    }]
  };

  componentDidMount() {
    let { dom, option } = this;
    this.chart = window.echarts.init(dom);
    this.chart.setOption(option);
  }

  render() {
    return <div style={{ width: '200px', height: '160px' }} ref={e => this.dom = e} />
  }
}
