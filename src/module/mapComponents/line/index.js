import React from 'react';

let data = [["2000-06-05",116],["2000-06-06",129],["2000-06-07",135],["2000-06-08",86],["2000-06-09",73],["2000-06-10",85],["2000-06-11",73],["2000-06-12",68],["2000-06-13",92],["2000-06-14",130],["2000-06-15",245],["2000-06-16",139],["2000-06-17",115],["2000-06-18",111],["2000-06-19",309],["2000-06-20",206],["2000-06-21",137],["2000-06-22",128],["2000-06-23",85],["2000-06-24",94],["2000-06-25",71],["2000-06-26",106],["2000-06-27",84],["2000-06-28",93],["2000-06-29",85],["2000-06-30",73],["2000-07-01",83],["2000-07-02",125],["2000-07-03",107],["2000-07-04",82],["2000-07-05",44],["2000-07-06",72],["2000-07-07",106],["2000-07-08",107],["2000-07-09",66],["2000-07-10",91],["2000-07-11",92],["2000-07-12",113],["2000-07-13",107],["2000-07-14",131],["2000-07-15",111],["2000-07-16",64],["2000-07-17",69],["2000-07-18",88],["2000-07-19",77],["2000-07-20",83],["2000-07-21",111],["2000-07-22",57],["2000-07-23",55],["2000-07-24",60]];
let dateList = data.map(function (item) {
  return item[0];
});
let valueList = data.map(function (item) {
  return item[1];
});


export class Line extends React.Component{
  constructor(props) {
    super(props);
    this.state = {}
  }

  option = {
    color: ['rgba(85, 104, 186, 1)'],
    title: [{
      left: 'center',
      text: '从xxx到xxx运行速度曲线图',
      textStyle: {
        fontSize: 14,
        color: 'rgba(85, 104, 186, 1)',
        fontWeight: 400
      },
      top: 15
    }],
    tooltip: {
      trigger: 'axis'
    },
    xAxis: [{
      data: dateList,
      name: 'min',
      nameTextStyle: {
        color: 'rgba(85, 104, 186, 1)'
      },
      axisLine: {
        lineStyle: {
          color: '#777'
        }
      }
    }],
    yAxis: [{
      name: 'km/h',
      nameTextStyle: {
        color: 'rgba(85, 104, 186, 1)'
      },
      splitLine: {show: false},
      axisLine: {
        lineStyle: {
          color: '#777'
        }
      }
    }],
    grid: [{
      bottom: 30,
      left: 40,
      right: 40,
      top: 40,
    }],
    series: [{
      type: 'line',
      showSymbol: true,
      data: valueList,
      lineStyle: {
        color: 'rgba(85, 104, 186, .9)',
        width: 1
      },
      markPoint: {
        data: [
          {type: 'max', name: '最大值'},
          {type: 'min', name: '最小值'}
        ]
      },
      markLine: {
        data: [
          {type: 'average', name: '平均值'}
        ]
      }
    }]
  };

  componentDidMount() {
    let { dom, option } = this;
    this.chart = window.echarts.init(dom);
    this.chart.setOption(option);
  }

  render(){
    return <div style={{width: '100%', height: '100%'}} ref={e => this.dom = e}/>
  }
}
