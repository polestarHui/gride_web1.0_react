import React from 'react';

/**
 *
 *
 * @export 左侧目录展示 绝缘电阻值
 * @class Insulation
 * @extends {React.Component}
 */
export class Insulation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  option = {
    title: {
      text: '绝缘电阻值',
      padding:  [0, 0, 0,0],  
      top: 12,
      textStyle: {
        color: 'rgba(85, 104, 186, 1)',
        fontSize: 12,
        textAlign: 'left',
        fontWeight: 'normal',
      }
    },
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
      // x轴位置
      position: 'left',
      // name: '衣服',
      data: ["GN482336", "GN157393", "GN23386"],
      // name样式控制
      // nameTextStyle: {
      //   color: 'blue'
      // },
     
      // 是否显示坐标轴轴线
      axisLine: {
        // show: false
        // 坐标轴线样式控制
        show: false,
        lineStyle: {
          color: 'gray'
        }
      },
      // 设置刻度标签
      axisLabel: {
        // color: 'cyan',
        // 这里设置衬衫 也有%
        // formatter: '{value}%' ,

      },
      // 是否显示坐标轴刻度
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
  // 设置柱形图宽度
    barWidth: '50%',
    series: [{
      label: {
        show: true,
        position: 'inside',
        formatter: `{c0}%`
      },
      // name: '销量',
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
    return <div style={{ width: '200px', height: '140px' }} ref={e => this.dom = e} />
  }
}
