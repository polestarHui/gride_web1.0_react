import React from 'react';
import * as ajax from '../../framework/tools/ajax/index';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入盒须图
import 'echarts/lib/chart/boxplot';
// 引入提示框和标题组件
import dataTool from 'echarts/extension/dataTool';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';


class Boxplot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: this.props.count,
    };
    // console.log(this.props.title,'title');
  }

  componentDidMount() {
    // console.log(localStorage.getItem('gridNum'),'盒须图');
    //发送请求
    if (this.state.num == 1) {
      if (localStorage.getItem('qufen') == 'xiaoqu') {
        let allNum;
        let allNumArr = [];
        ajax.get(
          '/rest/decis/get/box/plot',
          {
            villageName: localStorage.getItem('gridNum'),
          },
          res => {
            console.log(res, '小区');
            if (res.status == 0) {
              allNum = res.data.data;
              let lowLimit;
              if (allNum.lowLimit < 0) {
                allNumArr.push(0);
                lowLimit = 0;
              } else {
                allNumArr.push(allNum.lowLimit);
                lowLimit = allNum.lowLimit;
              }
              allNumArr.push(allNum.upLimit);
              allNumArr.push(allNum.lowQuartile);
              allNumArr.push(allNum.midQuartile);
              allNumArr.push(allNum.upQuartile);
              allNumArr.push(allNum.value);
              const data = echarts.dataTool.prepareBoxplotData([
                // [90.36, 114.55, 139.33, 73.25704]
                allNumArr,
              ], {
                layout: 'vertical',
              });
              // console.log(allNumArr.length,'hexuzhi');
              // 基于准备好的dom，初始化echarts实例
              var myChart = echarts.init(document.getElementById(this.state.num));
              // 绘制图表
              myChart.setOption({
                title: [
                  {
                    // text: 'Michelson-Morley Experiment',
                    left: 'center',
                  },
                  {
                    // text: 'upper: Q3 + 1.5 * IRQ \nlower: Q1 - 1.5 * IRQ',
                    text: 'value：' + allNum.value.toFixed(2),
                    // borderColor: '#999',
                    // borderWidth: 1,
                    textStyle: {
                      fontSize: 13,
                    },
                    left: '15%',
                    top: '0%',
                  },

                ],
                tooltip: {
                  trigger: 'item',
                  axisPointer: {
                    type: 'shadow',
                  },
                },
                grid: {
                  left: '10%',
                  right: '10%',
                  bottom: '15%',
                },
                yAxis: {
                  type: 'category',
                  data: data.axisData,
                  boundaryGap: true,
                  nameGap: 30,
                  splitArea: {
                    show: false,
                  },
                  axisLabel: {
                    formatter: '',
                  },
                  splitLine: {
                    show: false,
                  },
                  axisLine: {
                    show: false,
                  },
                },
                xAxis: {
                  type: 'value',
                  name: '',
                  splitArea: {
                    show: false,
                  },
                  axisTick: {
                    show: true,
                  },
                  splitLine: {
                    show: false,
                  },
                },
                series: [
                  {
                    name: 'boxplot',
                    type: 'boxplot',
                    data: data.boxData,
                    tooltip: {
                      formatter: function(param) {
                        return [
                          '上边界: ' + allNum.upLimit.toFixed(2),
                          '上四分位数: ' + allNum.upQuartile.toFixed(2),
                          '中位数: ' + allNum.midQuartile.toFixed(2),
                          '下四分位数: ' + allNum.lowQuartile.toFixed(2),
                          '下边界: ' + lowLimit.toFixed(2),
                        ].join('<br/>');
                      },
                    },
                  },
                  {
                    name: '异常值',
                    type: 'scatter',
                    data: data.outliers,
                  },
                ],
              });
            } else {

            }

          },
        );
      } else {
        let allNum;
        let allNumArr = [];
        ajax.get(
          '/rest/decis/get/box/plot',
          {
            gridNum: Number(localStorage.getItem('gridNum')),
          },
          res => {
            console.log(res, '单网格网格监管综合指数分布1234');
            if (res.status == 0) {
              allNum = res.data.data;
              // let lowLimit;
              if (allNum.lowLimit < 0) {
                allNumArr.push(0);
              } else {
                // lowLimit = allNum.lowLimit;
                allNumArr.push(Number(allNum.lowLimit.toFixed(2)));

              }
              allNumArr.push(Number(allNum.upLimit.toFixed(2)));
              allNumArr.push(Number(allNum.lowQuartile.toFixed(2)));
              allNumArr.push(Number(allNum.midQuartile.toFixed(2)));
              allNumArr.push(Number(allNum.upQuartile.toFixed(2)));
              // allNumArr.push(Number(allNum.value.toFixed(2)));
              console.log(allNumArr,'allNumArr');
              const data = echarts.dataTool.prepareBoxplotData([
                // [90.36, 114.55, 139.33, 73.25704]
                allNumArr,
              ], {
                layout: 'vertical',
              });
              // console.log(allNumArr.length,'hexuzhi');
              // 基于准备好的dom，初始化echarts实例
              var myChart = echarts.init(document.getElementById(this.state.num));
              // 绘制图表
              myChart.setOption({
                title: [
                  {
                    left: 'center',
                  },
                  {

                    text: '风险评价：' + allNum.value.toFixed(2),
                    // borderColor: '#999',
                    // borderWidth: 1,
                    textStyle: {
                      fontSize: 13,
                    },
                    left: '15%',
                    top: '0%',
                  },
                ],
                tooltip: {
                  trigger: 'item',
                  axisPointer: {
                    type: 'shadow',
                  },
                },
                grid: {
                  left: '10%',
                  right: '10%',
                  bottom: '15%',
                },
                yAxis: {
                  type: 'category',
                  data: data.axisData,
                  boundaryGap: true,
                  nameGap: 30,
                  splitArea: {
                    show: false,
                  },
                  axisLabel: {
                    formatter: '',
                  },
                  splitLine: {
                    show: false,
                  },
                  axisLine: {
                    show: false,
                  },
                },
                xAxis: {
                  type: 'value',
                  name: '',
                  max:30,
                  splitArea: {
                    show: false,
                  },
                  axisTick: {
                    show: true,
                  },
                  splitLine: {
                    show: false,
                  },
                },
                series: [
                  {
                    name: 'boxplot',
                    type: 'boxplot',
                    data: data.boxData,
                    itemStyle: { //盒须图样式。
                      color: '#596ED2', //boxplot图形的颜色。 默认从全局调色盘 option.color 获取颜色
                      borderColor: '#333333', //boxplot图形的描边颜色。支持的颜色格式同 color，不支持回调函数。
                    },
                    tooltip: {
                      formatter: function(param) {
                        // console.log(param,'param');
                        return [
                          '上边界: ' + param.data[5].toFixed(2),
                          '上四分位数: ' + param.data[4].toFixed(2),
                          '中位数: ' + param.data[3].toFixed(2),
                          '下四分位数: ' + param.data[2].toFixed(2),
                          '下边界: ' + param.data[1].toFixed(2),
                        ].join('<br/>');
                      },
                    },
                  },
                  {
                    name: '当前风险评价值所处于的阶段',
                    type: 'scatter',
                    data: [Number(allNum.value.toFixed(2))],
                    tooltip:{
                      show:false,
                    }
                  },
                ],
              });
            } else {

            }

          },
        );
      }

    } else if (this.state.num == 7) {
      if (localStorage.getItem('qufen') == 'xiaoqu') {
        if(localStorage.getItem('gridNum')=='三里河一区'){
          ajax.get(
            '/rest/decis/get/multi/type/info',
            {
              villageName: localStorage.getItem('gridNum'),
              type: this.props.title,
            },
            res => {
              console.log(res,'多网格监管综合指数分布图123456');
              if (res.status == 0) {
                // console.log(res.data.pipeRisk,'res.pipeRisk');
                let zonghe = [];
                zonghe.push(res.data.scale.avgValue.toFixed(2));
                zonghe.push(res.data.scale.maxValue.toFixed(2));
                zonghe.push(res.data.scale.minValue.toFixed(2));
                if(res.data.scale.lowLimit.toFixed(2)<=0){
                  zonghe.push(0);
                }else{
                  zonghe.push(res.data.scale.lowLimit.toFixed(2));
                }

                zonghe.push(res.data.scale.upLimit.toFixed(2));
                // zonghe.push(res.data.pipeRisk.toFixed(2));
                const data = echarts.dataTool.prepareBoxplotData([
                  // [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960],
                  zonghe
                ], {
                  layout: 'vertical',
                });
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById(this.state.num));
                // 绘制图表
                myChart.setOption({
                  title: [
                    {
                      // text: 'Michelson-Morley Experiment',
                      left: 'center',
                    },
                    {

                      // text: 'upper: Q3 + 1.5 * IRQ \nlower: Q1 - 1.5 * IRQ',
                      text: '最大值：' + res.data.scale.maxValue.toFixed(2) + '\n' + '最小值：' + res.data.scale.minValue.toFixed(2) + '\n' + '平均值：' + res.data.scale.avgValue.toFixed(2),
                      // borderColor: '#999',
                      // borderWidth: 1,
                      textStyle: {
                        fontSize: 13,
                      },
                      left: '15%',
                      top: '0%',
                    },
                  ],
                  tooltip: {
                    trigger: 'item',
                    axisPointer: {
                      type: 'shadow',
                    },
                  },
                  grid: {
                    left: '10%',
                    right: '10%',
                    bottom: '15%',
                  },
                  yAxis: {
                    type: 'category',
                    data: data.axisData,
                    boundaryGap: true,
                    nameGap: 30,
                    splitArea: {
                      show: false,
                    },
                    axisLabel: {
                      formatter: '',
                    },
                    splitLine: {
                      show: false,
                    },
                    axisLine: {
                      show: false,
                    },
                  },
                  xAxis: {
                    type: 'value',
                    name: '',
                    splitArea: {
                      show: false,
                    },
                    axisTick: {
                      show: true,
                    },
                    splitLine: {
                      show: false,
                    },
                  },
                  series: [
                    {
                      name: 'boxplot',
                      type: 'boxplot',
                      data: data.boxData,
                      itemStyle: { //盒须图样式。
                        color: '#596ED2', //boxplot图形的颜色。 默认从全局调色盘 option.color 获取颜色
                        borderColor: '#333333', //boxplot图形的描边颜色。支持的颜色格式同 color，不支持回调函数。
                      },
                      tooltip: {
                        formatter: function(param) {
                          return [
                            '上边界: ' + res.data.scale.upLimit.toFixed(2),
                            '上四分位数: ' + res.data.scale.upQuartile.toFixed(2),
                            '中位数: ' + res.data.scale.midQuartile.toFixed(2),
                            '下四分位数: ' + res.data.scale.lowQuartile.toFixed(2),
                            '下边界: ' + res.data.scale.lowLimit.toFixed(2)
                          ].join('<br/>');
                        },
                      },
                    },
                    // {
                    //   name: '异常值',
                    //   type: 'scatter',
                    //   data: data.outliers
                    // }
                  ],
                });
              } else {

              }
            },
          );
        }else{
          ajax.get(
            '/rest/decis/get/multi/type/info',
            {
              villageName: localStorage.getItem('gridNum'),
              type: this.props.title,
            },
            res => {
              console.log(res,'多网格监管综合指数分布图123456');
              if (res.status == 0) {
                // console.log(res.data.pipeRisk,'res.pipeRisk');
                let zonghe = [];
                zonghe.push(res.data.scale.avgValue.toFixed(2));
                zonghe.push(res.data.scale.maxValue.toFixed(2));
                zonghe.push(res.data.scale.minValue.toFixed(2));
                // if(res.data.scale.lowLimit.toFixed(2)<=0){
                //   zonghe.push(0);
                // }else{
                //   zonghe.push(res.data.scale.lowLimit.toFixed(2));
                // }

                // zonghe.push(res.data.scale.upLimit.toFixed(2));
                // zonghe.push(res.data.pipeRisk.toFixed(2));
                const data = echarts.dataTool.prepareBoxplotData([
                  // [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960],
                  // zonghe
                ], {
                  layout: 'vertical',
                });
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById(this.state.num));
                // 绘制图表
                myChart.setOption({
                  title: [
                    {
                      // text: 'Michelson-Morley Experiment',
                      left: 'center',
                    },
                    {

                      // text: 'upper: Q3 + 1.5 * IRQ \nlower: Q1 - 1.5 * IRQ',
                      text: '最大值：' + res.data.scale.maxValue.toFixed(2) + '\n' + '最小值：' + res.data.scale.minValue.toFixed(2) + '\n' + '平均值：' + res.data.scale.avgValue.toFixed(2),
                      // borderColor: '#999',
                      // borderWidth: 1,
                      textStyle: {
                        fontSize: 13,
                      },
                      left: '15%',
                      top: '0%',
                    },
                  ],
                  tooltip: {
                    trigger: 'item',
                    axisPointer: {
                      type: 'shadow',
                    },
                  },
                  grid: {
                    left: '10%',
                    right: '10%',
                    bottom: '15%',
                  },
                  yAxis: {
                    type: 'category',
                    data: data.axisData,
                    boundaryGap: true,
                    nameGap: 30,
                    splitArea: {
                      show: false,
                    },
                    axisLabel: {
                      formatter: '',
                    },
                    splitLine: {
                      show: false,
                    },
                    axisLine: {
                      show: false,
                    },
                  },
                  xAxis: {
                    type: 'value',
                    name: '',
                    splitArea: {
                      show: false,
                    },
                    axisTick: {
                      show: true,
                    },
                    splitLine: {
                      show: false,
                    },
                  },
                  series: [
                    {
                      name: 'boxplot',
                      type: 'boxplot',
                      data: data.boxData,
                      itemStyle: { //盒须图样式。
                        color: '#596ED2', //boxplot图形的颜色。 默认从全局调色盘 option.color 获取颜色
                        borderColor: '#333333', //boxplot图形的描边颜色。支持的颜色格式同 color，不支持回调函数。
                      },
                      tooltip: {
                        formatter: function(param) {
                          return [
                            // '上边界: ' + res.data.scale.upLimit.toFixed(2),
                            // '上四分位数: ' + res.data.scale.upQuartile.toFixed(2),
                            // '中位数: ' + res.data.scale.midQuartile.toFixed(2),
                            // '下四分位数: ' + res.data.scale.lowQuartile.toFixed(2),
                            // '下边界: ' + res.data.scale.lowLimit.toFixed(2)
                          ].join('<br/>');
                        },
                      },
                    },
                    // {
                    //   name: '异常值',
                    //   type: 'scatter',
                    //   data: data.outliers
                    // }
                  ],
                });
              } else {

              }
            },
          );
        }

      } else {
//  网格监管综合指数分布图
        if (localStorage.getItem('flagArea') == '管理单位') {

          ajax.get(
            '/rest/decis/get/multi/type/info',
            {
              manage: localStorage.getItem('manage'),
              type: this.props.title,
            },
            res => {
              console.log('xiangxiantu',res);
              if (res.status == 0) {
                // console.log(res.data.pipeRisk,'res.pipeRisk');
                let zonghe = [];
                zonghe.push(res.data.scale.upQuartile.toFixed(2));
                if (res.data.scale.lowQuartile.toFixed(2) <= 0) {
                  zonghe.push(0);
                } else {
                  zonghe.push(res.data.scale.lowQuartile.toFixed(2));
                }
                zonghe.push(res.data.scale.midQuartile.toFixed(2));
                if (res.data.scale.lowLimit.toFixed(2) <= 0) {
                  zonghe.push(0);
                } else {
                  zonghe.push(res.data.scale.lowLimit.toFixed(2));
                }
                zonghe.push(res.data.scale.upLimit.toFixed(2));
                zonghe.push(res.data.scale.maxValue.toFixed(2));
                // zonghe.push(res.data.pipeRisk.toFixed(2));

                console.log('盒须图的',zonghe);
                const data = echarts.dataTool.prepareBoxplotData([
                  // [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960],
                  zonghe,
                ], {
                  layout: 'vertical',
                });
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById(this.state.num));
                // 绘制图表
                myChart.setOption({
                  title: [
                    {
                      // text: 'Michelson-Morley Experiment',
                      left: 'center',
                    },
                    {

                      // text: 'upper: Q3 + 1.5 * IRQ \nlower: Q1 - 1.5 * IRQ',
                      text: '最大值：' + res.data.scale.maxValue.toFixed(2) + '\n' + '最小值：' + res.data.scale.minValue.toFixed(2) + '\n' + '平均值：' + res.data.scale.avgValue.toFixed(2),
                      // borderColor: '#999',
                      // borderWidth: 1,
                      textStyle: {
                        fontSize: 13,
                      },
                      left: '15%',
                      top: '0%',
                    },
                  ],
                  tooltip: {
                    trigger: 'item',
                    axisPointer: {
                      type: 'shadow',
                    },
                  },
                  grid: {
                    left: '10%',
                    right: '10%',
                    bottom: '15%',
                  },
                  yAxis: {
                    type: 'category',
                    data: data.axisData,
                    boundaryGap: true,
                    nameGap: 30,
                    splitArea: {
                      show: false,
                    },
                    axisLabel: {
                      formatter: '',
                    },
                    splitLine: {
                      show: false,
                    },
                    axisLine: {
                      show: false,
                    },
                  },
                  xAxis: {
                    type: 'value',
                    name: '',
                    splitArea: {
                      show: false,
                    },
                    axisTick: {
                      show: true,
                    },
                    splitLine: {
                      show: false,
                    },
                  },
                  series: [
                    {
                      name: 'boxplot',
                      type: 'boxplot',
                      data: data.boxData,
                      itemStyle: { //盒须图样式。
                        color: '#596ED2', //boxplot图形的颜色。 默认从全局调色盘 option.color 获取颜色
                        borderColor: '#333333', //boxplot图形的描边颜色。支持的颜色格式同 color，不支持回调函数。
                      },
                      tooltip: {
                        formatter: function(param) {
                          return [
                            '上边界: ' + param.data[5].toFixed(2),
                            '上四分位数: ' + param.data[4].toFixed(2),
                            '中位数: ' + param.data[3].toFixed(2),
                            '下四分位数: ' + param.data[2].toFixed(2),
                            '下边界: ' + param.data[1].toFixed(2),
                          ].join('<br/>');
                        },
                      },
                    },
                    // {
                    //   name: '异常值',
                    //   type: 'scatter',
                    //   data: data.outliers
                    // }
                  ],
                });
              } else {

              }
            },
          );
        } else if (localStorage.getItem('flagArea') == '行政区域') {
          ajax.get(
            '/rest/decis/get/multi/type/info',
            {
              distName: localStorage.getItem('manage'),
              type: this.props.title,
            },
            res => {
              console.log(res, '多网格监管综合指数分布图');
              if (res.status == 0) {
                // console.log(res.data.pipeRisk,'res.pipeRisk');
                let zonghe = [];
                zonghe.push(res.data.scale.upQuartile.toFixed(2));
                if (res.data.scale.lowQuartile.toFixed(2) <= 0) {
                  zonghe.push(0);
                } else {
                  zonghe.push(res.data.scale.lowQuartile.toFixed(2));
                }
                zonghe.push(res.data.scale.midQuartile.toFixed(2));
                if (res.data.scale.lowLimit.toFixed(2) <= 0) {
                  zonghe.push(0);
                } else {
                  zonghe.push(res.data.scale.lowLimit.toFixed(2));
                }
                zonghe.push(res.data.scale.maxValue.toFixed(2));
                zonghe.push(res.data.scale.upLimit.toFixed(2));

                console.log(zonghe);
                const data = echarts.dataTool.prepareBoxplotData([
                  // [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960],
                  zonghe,
                ], {
                  layout: 'vertical',
                });
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById(this.state.num));
                // 绘制图表
                myChart.setOption({
                  title: [
                    {
                      // text: 'Michelson-Morley Experiment',
                      left: 'center',
                    },
                    {

                      // text: 'upper: Q3 + 1.5 * IRQ \nlower: Q1 - 1.5 * IRQ',
                      text: '最大值：' + res.data.scale.maxValue.toFixed(2) + '\n' + '最小值：' + res.data.scale.minValue.toFixed(2) + '\n' + '平均值：' + res.data.scale.avgValue.toFixed(2),
                      // borderColor: '#999',
                      // borderWidth: 1,
                      textStyle: {
                        fontSize: 13,
                      },
                      left: '15%',
                      top: '0%',
                    },
                  ],
                  tooltip: {
                    trigger: 'item',
                    axisPointer: {
                      type: 'shadow',
                    },
                  },
                  grid: {
                    left: '10%',
                    right: '10%',
                    bottom: '15%',
                  },
                  yAxis: {
                    type: 'category',
                    data: data.axisData,
                    boundaryGap: true,
                    nameGap: 30,
                    splitArea: {
                      show: false,
                    },
                    axisLabel: {
                      formatter: '',
                    },
                    splitLine: {
                      show: false,
                    },
                    axisLine: {
                      show: false,
                    },
                  },
                  xAxis: {
                    type: 'value',
                    name: '',
                    splitArea: {
                      show: false,
                    },
                    axisTick: {
                      show: true,
                    },
                    splitLine: {
                      show: false,
                    },
                  },
                  series: [
                    {
                      name: 'boxplot',
                      type: 'boxplot',
                      data: data.boxData,
                      itemStyle: { //盒须图样式。
                        color: '#596ED2', //boxplot图形的颜色。 默认从全局调色盘 option.color 获取颜色
                        borderColor: '#333333', //boxplot图形的描边颜色。支持的颜色格式同 color，不支持回调函数。
                      },
                      tooltip: {
                        formatter: function(param) {
                          return [
                            '上边界: ' + param.data[5].toFixed(2),
                            '上四分位数: ' + param.data[4].toFixed(2),
                            '中位数: ' + param.data[3].toFixed(2),
                            '下四分位数: ' + param.data[2].toFixed(2),
                            '下边界: ' + param.data[1].toFixed(2),
                          ].join('<br/>');
                        },
                      },
                    },
                    // {
                    //   name: '异常值',
                    //   type: 'scatter',
                    //   data: data.outliers
                    // }
                  ],
                });
              } else {

              }
            },
          );
        } else {
          ajax.get(
            '/rest/decis/get/multi/type/info',
            {
              manageArea: localStorage.getItem('manage'),
              type: this.props.title,
            },
            res => {
              console.log(res, '多网格监管综合指数分布图');
              if (res.status == 0) {
                // console.log(res.data.pipeRisk,'res.pipeRisk');
                let zonghe = [];
                zonghe.push(res.data.scale.upQuartile.toFixed(2));
                if (res.data.scale.lowQuartile.toFixed(2) <= 0) {
                  zonghe.push(0);
                } else {
                  zonghe.push(res.data.scale.lowQuartile.toFixed(2));
                }
                zonghe.push(res.data.scale.midQuartile.toFixed(2));
                if (res.data.scale.lowLimit.toFixed(2) <= 0) {
                  zonghe.push(0);
                } else {
                  zonghe.push(res.data.scale.lowLimit.toFixed(2));
                }
                zonghe.push(res.data.scale.maxValue.toFixed(2));
                zonghe.push(res.data.scale.upLimit.toFixed(2));

                console.log(zonghe);
                const data = echarts.dataTool.prepareBoxplotData([
                  // [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960],
                  zonghe,
                ], {
                  layout: 'vertical',
                });
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById(this.state.num));
                // 绘制图表
                myChart.setOption({
                  title: [

                    {
                      // text: 'Michelson-Morley Experiment',
                      left: 'center',
                    },
                    {

                      // text: 'upper: Q3 + 1.5 * IRQ \nlower: Q1 - 1.5 * IRQ',
                      text: '最大值：' + res.data.scale.maxValue.toFixed(2) + '\n' + '最小值：' + res.data.scale.minValue.toFixed(2) + '\n' + '平均值：' + res.data.scale.avgValue.toFixed(2),
                      // borderColor: '#999',
                      // borderWidth: 1,
                      textStyle: {
                        fontSize: 13,
                      },
                      left: '15%',
                      top: '0%',
                    },
                  ],
                  tooltip: {
                    trigger: 'item',
                    axisPointer: {
                      type: 'shadow',
                    },
                  },
                  grid: {
                    left: '10%',
                    right: '10%',
                    bottom: '15%',
                  },
                  yAxis: {
                    type: 'category',
                    data: data.axisData,
                    boundaryGap: true,
                    nameGap: 30,
                    splitArea: {
                      show: false,
                    },
                    axisLabel: {
                      formatter: '',
                    },
                    splitLine: {
                      show: false,
                    },
                    axisLine: {
                      show: false,
                    },
                  },
                  xAxis: {
                    type: 'value',
                    name: '',
                    splitArea: {
                      show: false,
                    },
                    axisTick: {
                      show: true,
                    },
                    splitLine: {
                      show: false,
                    },
                  },
                  series: [
                    {
                      name: 'boxplot',
                      type: 'boxplot',
                      data: data.boxData,
                      itemStyle: { //盒须图样式。
                        color: '#596ED2', //boxplot图形的颜色。 默认从全局调色盘 option.color 获取颜色
                        borderColor: '#333333', //boxplot图形的描边颜色。支持的颜色格式同 color，不支持回调函数。
                      },
                      tooltip: {
                        formatter: function(param) {
                          return [
                            '上边界: ' + param.data[5].toFixed(2),
                            '上四分位数: ' + param.data[4].toFixed(2),
                            '中位数: ' + param.data[3].toFixed(2),
                            '下四分位数: ' + param.data[2].toFixed(2),
                            '下边界: ' + param.data[1].toFixed(2),
                          ].join('<br/>');
                        },
                      },
                    },
                    // {
                    //   name: '异常值',
                    //   type: 'scatter',
                    //   data: data.outliers
                    // }
                  ],
                });
              } else {

              }
            },
          );
        }
      }
    } else {

    }


  }

  render() {
    return (
      <div id={this.state.num} style={{ width: 250, height: 250, margin: 'auto' }}></div>
    );
  }
}


export default Boxplot;
