import React from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import * as ajax from '../../framework/tools/ajax/index';

let workdayNum=[],holidayNum=[];
class DoubleLine extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      num: this.props.count,
    };
  }

  componentDidMount(){
    if(this.state.num==13){
      ajax.get(
        '/rest/dxc/flow/get/info',
        {
          gridNum:Number(localStorage.getItem('gridNum'))
        },
        res=>{
          console.log(res,'24小时人口流动');
          // console.log(res.data.data.length);
          if(res.status==0){
            // if(res.data.data.length==0){
            //   console.log(123);
            //   //没有数据的时候使用的是1852表格的数据
            //   workdayNum=[2479, 2488,2466,2005,1981,1843,2240,2490,2446];
            //   holidayNum=[ 2451, 2431,2373 , 2234, 2133, 2105, 2308, 2464, 2494];
            // }else{
              for(var i = 0;i <24;i++){
                if(i%3==0){
                  workdayNum.push(res.data.data[i].workdayNum);
                  holidayNum.push(res.data.data[i].holidayNum);
                }else{

                }
              }
              workdayNum.push(res.data.data[23].workdayNum);
              holidayNum.push(res.data.data[23].holidayNum);
            // }
            // 基于准备好的dom，初始化echarts实例
            console.log(workdayNum,'workdayNum')
            var myChart = echarts.init(document.getElementById(this.state.num));
            // 绘制图表
            myChart.setOption({
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                data: ['非工作日', '工作日']
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,//坐标轴两边留白
                data: ['0', '3', '6','9','12','15','18','21','24'],
                axisLabel: { //坐标轴刻度标签的相关设置。
                  interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
                  textStyle: {
                    color: '#1B253A',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12,
                  },
                },
                axisTick:{//坐标轴刻度相关设置。
                  show: false,
                },
                axisLine:{//坐标轴轴线相关设置
                  lineStyle:{
                    color:'#E5E9ED',
                    // opacity:0.2
                  }
                },
                splitLine: { //坐标轴在 grid 区域中的分隔线。
                  show: false,
                  lineStyle: {
                    color: '#E5E9ED',
                    // 	opacity:0.1
                  }
                }
              },
              yAxis: [
                {
                  type: 'value',
                  // max: 2600,
                  // min: 1800,
                  axisLabel: {
                    textStyle: {
                      color: '#a8aab0',
                      fontStyle: 'normal',
                      fontFamily: '微软雅黑',
                      fontSize: 12,
                    }
                  },
                  axisLine:{
                    show: false
                  },
                  axisTick:{
                    show: false
                  },
                  splitLine: {
                    show: true,
                    lineStyle: {
                      color: '#E5E9ED',
                      // 	opacity:0.1
                    }
                  }

                }
              ],
              series: [
                {
                  name: '工作日',
                  type: 'line',
                  itemStyle: {
                    normal: {
                      color:'#6276D5',
                      lineStyle: {
                        color: "#6276D5",
                        width:2
                      },
                      areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                          offset: 0,
                          color: 'rgba(190,198,238,0.5)'
                        }, {
                          offset: 1,
                          color: 'rgba(190,198,238,1)'
                        }]),
                      }
                    }
                  },
                  symbol: 'none',
                  smooth: true,
                  data: workdayNum
                },{
                  name: '非工作日',
                  type: 'line',
                  itemStyle: {
                    normal: {
                      color:'#41BDAE',
                      lineStyle: {
                        color: "#41BDAE",
                        width:2
                      },
                      areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                          offset: 0,
                          color: 'rgba(162, 219, 210,0.5)'
                        }, {
                          offset: 1,
                          color: 'rgba(162, 219, 210,1)'
                        }]),
                      }
                    }
                  },
                  symbol: 'none',
                  smooth: true,
                  data: holidayNum
                },
              ]
            });

          }else{

          }
        }
      )

    }else{

    }
  }

  render() {
    return (
      <div id={this.state.num} style={{ width: 370, height: 280, margin: 'auto' }}></div>
    );
  }

}
export default DoubleLine;
