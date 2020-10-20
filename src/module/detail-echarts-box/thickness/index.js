import React from 'react';

/**
 *
 *
 * @export 左侧目录展示 防腐层厚度
 * @class Thickness
 * @extends {React.Component}
 */
export class Thickness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  option = {
    grid: {
      top: '20%',
      containLabel: true,
      height: 100,
    },
    // 标题
    title: [{
      text: '防腐层厚度',
      top: -4,
      textStyle: {
        fontSize: 12,
        color: '#5568ba',        // 主标题文字颜色
        fontWeight: 500
      },
    }],
    barWidth: '50%',
    xAxis: [{
      type: 'category',
      data: ['G2623', 'Ge12', 'kl124'],
      axisLine: {
        lineStyle: {
          type: 'solid',
          color: 'gray',
        },
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: 'gray',
        },
      },
      axiLabel: {
      },
    }],
    // hover 效果展示
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    yAxis: [{
      data: [0, 2, 4, 6, 8],
      axisTick: {
        show: false
      }
    }],
    series: [{
      data: [2, 4, 6],
      type: 'bar',
      itemStyle: {
        color: '#5962B9',
      }
    }],
  };

  componentDidMount() {
    let { dom, option } = this;
    this.chart = window.echarts.init(dom);
    this.chart.setOption(option);
  }

  render() {
    return <div style={{ width: '210px', height: '160px' }} ref={e => this.dom = e} />
  }
}
