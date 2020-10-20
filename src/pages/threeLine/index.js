import React from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import * as ajax from '../../framework/tools/ajax/index';

let resideNum=[],visitNum=[],workNum=[];
class ThreeLine extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      num: this.props.count,
    };
  }
  componentDidMount(){
    if(this.state.num==14){
      ajax.get(
        '/rest/dxc/activity/get/info',
          {
            gridNum:Number(localStorage.getItem('gridNum'))
          },
        res=>{
          console.log(res,'人口活动数量统计');
          if(res.status==0){
            // if(res.data.data.length==0){
            //   console.log('区别');
            //   //没有数据的时候使用的是1852的数据
            //   resideNum=[2479, 2488,2466,2005,1981,1843,2240,2490,2446];
            //   visitNum=[480, 375, 490, 1034, 2180, 3007, 3418,2303,773];
            //   workNum= [438, 435, 480, 778, 850, 847, 783,692,601];
            // }else{
                for(var i=0;i <24;i++){
                  if(i%3==0){
                    resideNum.push(res.data.data[i].resideNum);
                    visitNum.push(res.data.data[i].visitNum);
                    workNum.push(res.data.data[i].workNum);
                  }else{

                  }
                // }
              resideNum.push(res.data.data[23].resideNum);
              visitNum.push(res.data.data[23].visitNum);
              workNum.push(res.data.data[23].workNum);
            }
            // console.log(resideNum,'resideNum');

            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(this.state.num));
            // 绘制图表
            myChart.setOption({
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                data: ['居住人口', '到访人口', '工作人口']
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['0', '3', '6', '9', '12', '15', '18','21','24'],
                axisTick:{       //y轴刻度线
                  "show":false
                },
              },
              yAxis: {
                type: 'value',
                // max:4000,
                axisLine:{       //y轴
                  "show":false
                },
                axisTick:{       //y轴刻度线
                  "show":false
                },
              },
              series: [
                {
                  name: '居住人口',
                  type: 'line',
                  symbol: 'none',
                  smooth: true,
                  data:resideNum,
                  itemStyle : {
                    normal : {
                      color:'#F3C42E',
                      lineStyle:{
                        color:'#F3C42E',
                        width:2
                      }
                    }
                  },
                },
                {
                  name: '到访人口',
                  type: 'line',
                  symbol: 'none',
                  smooth: true,
                  data: visitNum,
                  // #6077DE
                  itemStyle : {
                    normal : {
                      color:'#6077DE',
                      lineStyle:{
                        color:'#6077DE',
                        width:2
                      }
                    }
                  },
                },
                {
                  name: '工作人口',
                  type: 'line',
                  symbol: 'none',
                  smooth: true,
                  data: workNum,
                  // #2ED7A9
                  itemStyle : {
                    normal : {
                      color:'#2ED7A9',
                      lineStyle:{
                        color:'#2ED7A9',
                        width:2
                      }
                    }
                  },
                },


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
      <div id={this.state.num} style={{ width: 360, height: 280, margin: 'auto' }}></div>
    );
  }
}
export default ThreeLine
