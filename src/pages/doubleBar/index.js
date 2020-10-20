import React from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import * as ajax from '../../framework/tools/ajax/index';

class DoubleBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      num: this.props.count,
    };
  }

  componentDidMount(){
    if(this.state.num==11){
      ajax.get(
        '/rest/event/hazard/count/hazard/type/level',
        {
          gridNum:Number(localStorage.getItem('gridNum'))
        },
        res=>{
          console.log(res,'重大隐患数量分布');
          if(res.status==0){
            if(res.data.data.length==0){
// 基于准备好的dom，初始化echarts实例
              var myChart = echarts.init(document.getElementById(this.state.num));
              // 绘制图表
              myChart.setOption({
                legend: {},
                tooltip: {},
                dataset: {
                  dimensions: ['product', '重大隐患', '一般隐患'],
                  source: [
                    {product: '临近穿越', '重大隐患': 0, '一般隐患': 0,},
                    {product: '违章占压', '重大隐患': 0, '一般隐患': 0, },
                    {product: '近距', '重大隐患': 0, '一般隐患': 0, },
                    {product: '结构性隐患', '重大隐患':0, '一般隐患': 0, },
                  ]
                },
                xAxis: {
                  type: 'category',
                  axisLabel: {
                    interval:0,//代表显示所有x轴标签显示
                  }
                },
                yAxis: {},
                series: [
                  {
                    type: 'bar',
                    barGap:'0',/*多个并排柱子设置柱子之间的间距*/
                    barCategoryGap:'40%',
                    itemStyle : {
                      normal : {
                        color:'#E46572',
                        lineStyle:{
                          color:'#E46572',
                          type:'dotted',

                        }
                      }
                    },
                  },
                  {
                    type: 'bar',
                    barGap:'0',/*多个并排柱子设置柱子之间的间距*/
                    barCategoryGap:'40%',/*多个并排柱子设置柱子之间的间距*/
                    itemStyle : {
                      normal : {
                        color:'#5F78EC',
                        lineStyle:{
                          color:'#E46572',
                          type:'dotted',

                        }
                      }
                    },
                  },

                ]
              });
            }else{
              // 基于准备好的dom，初始化echarts实例
              var myChart = echarts.init(document.getElementById(this.state.num));
              // 绘制图表
              let arrYinhuan=[];
              for(var i=0;i <res.data.data.length;i++){
                // arrYinhuan.push([res.data.data[i].hazardType,res.data.data[i].importantNum,res.data.data[i].commonNum]);
                arrYinhuan.push( {product: res.data.data[i].hazardType, '重大隐患':res.data.data[i].importantNum, '一般隐患': res.data.data[i].commonNum })
              }
              myChart.setOption({
                legend: {},
                tooltip: {},
                dataset: {
                  dimensions: ['product', '重大隐患', '一般隐患'],
                  // source: [
                  //   {product: '临近穿越', '重大隐患': 0, '一般隐患': 0,},
                  //   {product: '违章占压', '重大隐患': 0, '一般隐患': 0, },
                  //   {product: '近距', '重大隐患': 0, '一般隐患': 0, },
                  //   {product: '结构性隐患', '重大隐患':0, '一般隐患': 13, },
                  // ]
                  // source:[
                  //   ['product', '重大隐患', '一般隐患'],
                  //   arrYinhuan
                  //   ]
                  source:arrYinhuan
                },
                xAxis: {
                  type: 'category',
                  axisLabel: {
                    interval:0,//代表显示所有x轴标签显示
                  }
                },
                yAxis: {},
                series: [
                  {
                    type: 'bar',
                    barGap:'0',/*多个并排柱子设置柱子之间的间距*/
                    barCategoryGap:'40%',
                    itemStyle : {
                      normal : {
                        color:'#E46572',
                        lineStyle:{
                          color:'#E46572',
                          type:'dotted',

                        }
                      }
                    },
                  },
                  {
                    type: 'bar',
                    barGap:'0',/*多个并排柱子设置柱子之间的间距*/
                    barCategoryGap:'40%',/*多个并排柱子设置柱子之间的间距*/
                    // width:20,
                    itemStyle : {
                      normal : {
                        color:'#5F78EC',
                        lineStyle:{
                          color:'#E46572',
                          type:'dotted',

                        }
                      }
                    },
                  },

                ]
              });
            }
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
export default DoubleBar;
