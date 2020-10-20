import React from 'react'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入饼状图
import  'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import * as ajax from '../../framework/tools/ajax/index';


class EchartsTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num:this.props.count
    }
  }

  componentDidMount() {
    if(this.state.num==0){

    }else if(this.state.num==3){
    //  单网格管线管龄分布

    }

    else{
      ajax.get(
        '/rest/decis/get/risk',
        {
          gridNum: Number(localStorage.getItem('gridNum')),
        },
        res => {
          console.log(res.data.data,'饼图');
          if(res.status==0){
            //  成功
            let bgColor = '#fff';
            let title = '管线健康';
            let color = ['#BCC6EE', '#5466BD', '#FAD885', '#9EA9BD', '#82BEBE', '#FFBB88'];
            let echartData = [{
              name: "事件密集度",
              value: res.data.data.eventExp
            },
              {
                name: "管线健康",
                value: res.data.data.pipeHethRisk
              },
              {
                name: "环境安全",
                value: res.data.data.envirExp
              },
              {
                name: "户内安全",
                value: res.data.data.indoorExp
              },
              {
                name: "建筑物密度",
                value: res.data.data.buildExp
              },
              {
                name: "人口流动",
                value: res.data.data.popuExp
              }
            ];

            let formatNumber = function(num) {
              let reg = /(?=(\B)(\d{3})+$)/g;
              return num.toString().replace(reg, ',');
            }
            let total = echartData.reduce((a, b) => {
              return a + b.value * 1
            }, 0);
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(this.state.num));
            // 绘制图表
            myChart.setOption({
              backgroundColor: bgColor,
              color: color,
              title: [{
                text: '{name|' + title + '}\n{val|' + formatNumber(total) + '}',
                top: 'center',
                left: 'center',
                textStyle: {
                  rich: {
                    name: {
                      fontSize: 16,
                      fontWeight: 'normal',
                      color: '#333',
                      padding: [10, 0]
                    },
                    val: {
                      fontSize: 14,
                      fontWeight: 'normal',
                      color: '#666',
                    }
                  }
                }
              }, {
                text: '',
                top: 20,
                left: 20,
                textStyle: {
                  fontSize: 10,
                  color: '#666666',
                  fontWeight: 400
                }
              }],
              series: [{
                type: 'pie',
                radius: ['45%', '60%'],
                center: ['50%', '50%'],
                data: echartData,
                hoverAnimation: false,
                itemStyle: {
                  normal: {
                    borderColor: bgColor,
                    borderWidth: 2
                  }
                },
                labelLine: {
                  normal: {
                    length: 2,
                    length2: 50,
                    lineStyle: {
                      color: '#e6e6e6'
                    }
                  }
                },
                label: {
                  normal: {
                    formatter: params => {
                      return (
                        '{icon|●}{name|' + params.name + '}{value|' +
                        formatNumber(params.value) + '}'
                      );
                    },
                    padding: [0, -100, 25, -100],
                    rich: {
                      icon: {
                        fontSize: 16
                      },
                      name: {
                        fontSize: 14,
                        padding: [0, 10, 0, 4],
                        color: '#666666'
                      },
                      value: {
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#333333'
                      }
                    }
                  }
                },
              }]
            });
          }else{

          }
        },
      );
    }


  }
  render() {
    return (
      <div id={this.state.num} style={{ width: 410, height: 250 ,margin:"auto"}}></div>
    );
  }
}


export default EchartsTest
