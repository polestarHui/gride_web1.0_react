import React from 'react'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import * as ajax from '../../framework/tools/ajax/index';

class Bar2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num:this.props.count
    }
    // console.log(this.props.count)
  }
  componentDidMount() {
    if(this.state.num==5){
    //  单网格压力级制分布
      ajax.get(
        '/rest/grid/score/4th/get/press/pipe',
        {
          nums:Number(localStorage.getItem('gridNum'))
        },
        res=>{
          console.log(res,'单网格压力级制分布数据');
          console.log(res.data.data[0].次高压);
          if(res.status==0){
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(this.state.num));
            // 绘制图表
            myChart.setOption({
              tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function (params) {
                  var tar = params[1];
                  return tar.name + ' : ' + tar.value+'条';
                }
              },
              grid: {
                left: '3%',
                right: '0%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                type: 'category',
                splitLine: {show: false},
                data: ['总长度', '次高压', '低压', '中压'],
                axisLabel: {
                  interval:0,//代表显示所有x轴标签显示,
                },
                axisTick:{ //y轴刻度线
                  show:false
                },
                axisLine:{ //y轴
                  show:false
                },
              },
              yAxis: {
                type: 'value',
                name:'单位/条',
                axisTick:{ //y轴刻度线
                  show:false
                },
                axisLine:{ //y轴
                  show:false
                },
              },
              series: [
                {
                  name: '辅助',
                  type: 'bar',
                  stack: '总量',
                  itemStyle: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)',
                    // barBorderRadius:25
                  },
                  emphasis: {
                    itemStyle: {
                      barBorderColor: 'rgba(0,0,0,0)',
                      color: 'rgba(0,0,0,0)',
                    }
                  },
                  data: [0, res.data.data[0].低压+res.data.data[0].中压,res.data.data[0].中压,0],
                  barWidth : 18
                },
                {
                  name: '总长度',
                  type: 'bar',
                  stack: '总量',
                  label: {
                    show: false,
                    position: 'inside'
                  },
                  data: [res.data.data[0].次高压+res.data.data[0].低压+res.data.data[0].中压, res.data.data[0].次高压, res.data.data[0].低压, res.data.data[0].中压],
                  itemStyle: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: '#6A84E6',
                    barBorderRadius:25
                  },
                }
              ]
            });
          }else{
            console.log('请重试')
          }
        }
      )
    }else{

    }

  }
  render() {
    return (
      <div id={this.state.num} style={{ width: 300, height: 250 ,margin:"auto"}}></div>
    );
  }
}


export default Bar2
