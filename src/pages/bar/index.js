import React from 'react'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import * as ajax from '../../framework/tools/ajax/index';


class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num:this.props.count
    }
    // console.log(this.props.count)
  }
  componentDidMount() {
    if(this.state.num==4){
      //单网格管线管径分布
      ajax.get(
        '/rest/grid/score/4th/get/daim/pipe',
        {
          nums:Number(localStorage.getItem('gridNum'))
        },
        res=>{
          console.log(res,'单网格管线管径分布数据');
          console.log(res.data.data);
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
                  var tar = params[0];
                  return tar.name + ' : ' + tar.value+'条';
                }
              },
              xAxis: {
                type: 'category',
                data: ['DN150', 'DN80', 'DN50', 'DN100', 'DN30', 'DN400', 'DN500','DN200', 'DN300', 'DN600'],
                axisLabel: {
                  interval:0,//代表显示所有x轴标签显示,
                  rotate:45
                }
              },
              yAxis: {
                type: 'value',
                name:'单位/条'
              },
              series: [{
                data: [res.data.data[0].DN150,res.data.data[0].DN80,res.data.data[0].DN50,res.data.data[0].DN100,res.data.data[0].DN30,res.data.data[0].DN400,res.data.data[0].DN500,res.data.data[0].DN200,res.data.data[0].DN300,res.data.data[0].DN600],
                type: 'bar',
                itemStyle:{
                  color:'#596CD0'
                },
                showBackground: false,
                backgroundStyle: {
                  color: 'rgba(220, 220, 220, 0.8)'
                }
              }]
            });
          }else{
            console.log('请重试')
          }
        }
      )

    }else{
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById(this.state.num));
      // 绘制图表
      myChart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }]
      });
    }


  }
  render() {
    return (
      <div id={this.state.num} style={{ width: 280, height: 260 ,margin:"auto"}}></div>
    );
  }
}


export default Bar
