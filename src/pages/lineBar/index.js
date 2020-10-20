import React from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import * as ajax from '../../framework/tools/ajax/index';

class LineBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      num: this.props.count,
    };
  }

  componentDidMount(){
    if(this.state.num==12){
    ajax.get(
      '/rest/build/area/get/area/num',
      {
        gridNum:Number(localStorage.getItem('gridNum'))
      },
      res=>{
        console.log(res,'各属性建筑物数量及面积的分布');
        if(res.status==0){

          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById(this.state.num));
          // 绘制图表
          myChart.setOption({
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#283b56'
                }
              }
            },
            legend: {
              data:['长度', '交点个数']
            },
            dataZoom: {
              show: false,
              start: 0,
              end: 100
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: true,
                data: ['居住','办公','文教','托教','医疗','其他'],
                axisTick:{       //y轴刻度线
                  "show":false
                },
              },
              {
                type: 'category',
                boundaryGap: true,
                data: ['','','','','',''],
                axisTick:{       //y轴刻度线
                  "show":false
                },
              }
            ],
            yAxis: [
              {
                type: 'value',
                scale: true,
                name: '数量/个',
                // max: 20,
                min: 0,
                boundaryGap: [0.2, 0.2],
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: "#5ACE46",
                  }
                },
                splitLine: {
                  show: false,
                  lineStyle:{
                    //color: ''
                  }
                },
                axisLabel: { /*坐标轴的刻度文字设置*/
                  formatter: '{value}',
                  textStyle: {
                    color: "#5ACE46"
                  }
                }
              },
              {
                type: 'value',
                scale: true,
                name: '面积/㎡',
                // max: 4000,
                min: 0,
                boundaryGap: [0.2, 0.2],
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: "#617CF3",
                  }
                },
                splitLine: {
                  show: true,
                  lineStyle:{
                    color: '#F2F3F3'
                  }
                },
                axisLabel: { /*坐标轴的刻度文字设置*/
                  formatter: '{value}',
                  textStyle: {
                    color: "#617CF3"
                  }
                }
              }
            ],
            series: [
              {
                name: '面积',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: [res.data.data.areaResid.toFixed(2),res.data.data.areaOffic.toFixed(2),res.data.data.areaEduc.toFixed(2),res.data.data.areaNursery.toFixed(2),res.data.data.areaMedical.toFixed(2),res.data.data.areaRests.toFixed(2)],
                itemStyle:{
                  barBorderRadius:[20, 20, 0, 0],
                  color: '#5E77E8'
                },
                barWidth:25
              },
              {
                name: '数量',
                type: 'line',
                data: [res.data.data.numResid,res.data.data.numOffic,res.data.data.numEduc,res.data.data.numNursery,res.data.data.numMedical,res.data.data.numRests],
                itemStyle : {
                  normal : {
                    color:'#65CF52',
                    lineStyle:{
                      color:'#65CF52',
                      type:'dotted',

                    }
                  }
                },
              }
            ]
          });
        }else{

        }
      }
    )


    }else if(this.state.num==10){
      ajax.get(
        '/rest/facility/grid/get/lenth/cross',
        {
          gridNum:Number(localStorage.getItem('gridNum'))
        },
        res=>{
          console.log(res,'电气化数量及交点');
          if(res.status==0){
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(this.state.num));
            // 绘制图表
            myChart.setOption({
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'cross',
                  label: {
                    backgroundColor: '#283b56'
                  }
                }
              },
              legend: {
                data:['长度', '交点个数']
              },
              dataZoom: {
                show: false,
                start: 0,
                end: 100
              },
              xAxis: [
                {
                  type: 'category',
                  boundaryGap: true,
                  data: ['地铁','铁路','无轨电车'],
                  axisTick:{       //y轴刻度线
                    "show":false
                  },
                },
                {
                  type: 'category',
                  boundaryGap: true,
                  data: ['','',''],
                  axisTick:{       //y轴刻度线
                    "show":false
                  },
                }
              ],
              yAxis: [
                {
                  type: 'value',
                  scale: true,
                  name: '交点/个',
                  max: 8,
                  min: 0,
                  boundaryGap: [0.2, 0.2],
                  axisLine: {
                    show: false,
                    lineStyle: {
                      color: "#5ACE46",
                    }
                  },
                  splitLine: {
                    show: false,
                    lineStyle:{
                      //color: ''
                    }
                  },
                  axisLabel: { /*坐标轴的刻度文字设置*/
                    formatter: '{value}',
                    textStyle: {
                      color: "#5ACE46"
                    }
                  }
                },
                {
                  type: 'value',
                  scale: true,
                  name: '长度/m',
                  max: 800,
                  min: 0,
                  boundaryGap: [0.2, 0.2],
                  axisLine: {
                    show: false,
                    lineStyle: {
                      color: "#617CF3",
                    }
                  },
                  splitLine: {
                    show: true,
                    lineStyle:{
                      color: '#F2F3F3'
                    }
                  },
                  axisLabel: { /*坐标轴的刻度文字设置*/
                    formatter: '{value}',
                    textStyle: {
                      color: "#617CF3"
                    }
                  }
                }
              ],
              series: [
                {
                  name: '长度',
                  type: 'bar',
                  xAxisIndex: 1,
                  yAxisIndex: 1,
                  data: [res.data.data.subwayLeng,0,res.data.data.trolleybusLeng],
                  itemStyle:{
                    barBorderRadius:[20, 20, 0, 0],
                    color: '#5E77E8'
                  },
                  barWidth:25
                },
                {
                  name: '交点个数',
                  type: 'line',
                  data: [res.data.data.subwayNum,res.data.data.railwanNum,res.data.data.trolleybusNum],
                  itemStyle : {
                    normal : {
                      color:'#65CF52',
                      lineStyle:{
                        color:'#65CF52',
                        type:'dotted',

                      }
                    }
                  },
                }
              ]
            });
          }else{

          }
        }
      )
    }
    else{

    }
  }

  render() {
    return (
      <div id={this.state.num} style={{ width: 380, height: 280, margin: 'auto' }}></div>
    );
  }

}
export default LineBar;
