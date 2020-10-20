import React from 'react'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入盒须图
import  'echarts/lib/chart/gauge';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';


class Gauge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num:this.props.count
    }
    // console.log(this.props.count)
  }
  componentDidMount() {

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(this.state.num));
    // 绘制图表
    myChart.setOption({
      tooltip: {
        formatter: '{a}:{c}%'
      },
      toolbox: {
        feature: {
          restore: {},
          saveAsImage: {}
        }
      },
      series: [
        {
          name: '管线健康指标',
          type: 'gauge',
          detail: {formatter: '80'},
          data: [{value: 90, name: ''}]
        }
      ]
    });
  }
  render() {
    return (
      <div id={this.state.num} style={{ width: 300, height: 300 ,margin:"auto"}}></div>
    );
  }
}


export default Gauge
