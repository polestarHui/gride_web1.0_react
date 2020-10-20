import React from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入饼状图
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import * as ajax from '../../framework/tools/ajax/index';
import WaterTap from '../../assets/map/water.png'



class ProportionChar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: this.props.count,
    };
  }

  componentDidMount() {
    if(this.state.num==0){
      if(localStorage.getItem('qufen')=='grid'){
        ajax.get(
          '/rest/decis/get/risk',
          {
            gridNum: Number(localStorage.getItem('gridNum')),
          },
          res => {
            console.log(res.data.data,'饼图');
            if(res.status==0){
              //  渲染数据
              // 基于准备好的dom，初始化echarts实例
              var myChart = echarts.init(document.getElementById(this.state.num));
              // 绘制图表
              myChart.setOption({
                // tooltip: {
                //   trigger: 'item',
                //   formatter: '{b}:{d}%',
                // },
                color:['#5868B7','#80D5A9','#61708F','#EDBE46','#D76C59','#6790F1','#8C63B4','#F09C57','#499292','#F6C9E1'],
                legend: {
                  orient: 'vertical',
                  left: 10,
                  data: ['管线健康', '事件密集度', '管线周边环境', '安全隐患', '自然灾害', '建筑本体', '建筑物密集度', '市政基础设施', '人口密集度', '重点区域'],
                },
                series: [
                  {
                    // name: '',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                      show: false,
                      position: 'center',
                    },
                    emphasis: {
                      label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold',
                      },
                    },
                    labelLine: {
                      show: false,
                    },
                    data: [
                      { value: Number(res.data.data.pipeHethRisk).toFixed(2), name: '管线健康' },
                      { value: Number(res.data.data.eventExp).toFixed(2), name: '事件密集度' },
                      { value: Number(res.data.data.envirExp).toFixed(2), name: '管线周边环境' },
                      { value: Number(res.data.data.hiddenExp).toFixed(2), name: '安全隐患' },
                      { value: Number(res.data.data.naturalExp).toFixed(2), name: '自然灾害' },
                      { value: Number(res.data.data.buildSelfExp).toFixed(2), name: '建筑本体' },
                      { value: Number(res.data.data.buildExp).toFixed(2), name: '建筑物密集度' },
                      { value: Number(res.data.data.municipalExp).toFixed(2), name: '市政基础设施' },
                      { value: Number(res.data.data.popuExp).toFixed(2), name: '人口密集度' },
                      { value: Number(res.data.data.keyAreaExp).toFixed(2), name: '重点区域' },
                    ],
                    itemStyle:{
                      emphasis: {
                        label: {
                          show: true,
                          fontSize: '18',
                          fontWeight: 'bold',
                          formatter: '{b}\n{d}%'
                        },
                      },
                    }
                  },
                ],
              });
            }else{

            }
          },
        );
      }else{
        ajax.get(
          '/rest/decis/get/multi/info',
          {
            villageName: localStorage.getItem('gridNum'),
          },
          res => {
            console.log(res.data.data,'饼图');
            if(res.status==0){
              //  渲染数据
              // 基于准备好的dom，初始化echarts实例
              var myChart = echarts.init(document.getElementById(this.state.num));
              // 绘制图表
              myChart.setOption({
                // tooltip: {
                //   trigger: 'item',
                //   formatter: '{b}:{d}%',
                // },
                color:['#5868B7','#80D5A9','#61708F','#EDBE46','#D76C59','#6790F1','#8C63B4','#F09C57','#499292','#F6C9E1'],
                legend: {
                  orient: 'vertical',
                  left: 10,
                  data: ['管线健康', '事件密集度', '管线周边环境', '安全隐患', '自然灾害', '建筑本体', '建筑物密集度', '市政基础设施', '人口密集度', '重点区域'],
                },
                series: [
                  {
                    // name: '',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                      show: false,
                      position: 'center',
                    },
                    emphasis: {
                      label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold',
                      },
                    },
                    labelLine: {
                      show: false,
                    },
                    data: [
                      { value: Number(res.data.data.pipeHethRisk).toFixed(2), name: '管线健康' },
                      { value: Number(res.data.data.eventExp).toFixed(2), name: '事件密集度' },
                      { value: Number(res.data.data.envirExp).toFixed(2), name: '管线周边环境' },
                      { value: Number(res.data.data.hiddenExp).toFixed(2), name: '安全隐患' },
                      { value: Number(res.data.data.naturalExp).toFixed(2), name: '自然灾害' },
                      { value: Number(res.data.data.buildSelfExp).toFixed(2), name: '建筑本体' },
                      { value: Number(res.data.data.buildExp).toFixed(2), name: '建筑物密集度' },
                      { value: Number(res.data.data.municipalExp).toFixed(2), name: '市政基础设施' },
                      { value: Number(res.data.data.popuExp).toFixed(2), name: '人口密集度' },
                      { value: Number(res.data.data.keyAreaExp).toFixed(2), name: '重点区域' },
                    ],
                    itemStyle:{
                      emphasis: {
                        label: {
                          show: true,
                          fontSize: '18',
                          fontWeight: 'bold',
                          formatter: '{b}\n{d}%'
                        },
                      },
                    }
                  },
                ],
              });
            }else{

            }
          },
        );
      }


    } else if ((this.state.num == 6) || (this.state.num == 8)) {
      if(localStorage.getItem('qufen')=='xiaoqu'){
        ajax.get(
          '/rest/decis/get/multi/info',
          {
            villageName: localStorage.getItem('gridNum'),
          },
          res => {
            console.log(res,'片区多网格10指标占比图');
            if (res.status == 0) {
              //  渲染数据
              // 基于准备好的dom，初始化echarts实例
              var myChart = echarts.init(document.getElementById(this.state.num));
              // 绘制图表
              myChart.setOption({
                // tooltip: {
                //   trigger: 'item',
                //   formatter: '{b}:{d}%',
                // },
                color:['#5868B7','#80D5A9','#61708F','#EDBE46','#D76C59','#6790F1','#8C63B4','#F09C57','#499292','#F6C9E1'],
                legend: {
                  orient: 'vertical',
                  left: 10,
                  data: ['管线健康', '事件密集度', '管线周边环境', '安全隐患', '自然灾害', '建筑本体', '建筑物密集度', '市政基础设施', '人口密集度', '重点区域'],
                },
                series: [
                  {
                    // name: '',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                      show: false,
                      position: 'center',
                    },
                    emphasis: {
                      label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold',
                      },
                    },
                    labelLine: {
                      show: false,
                    },
                    data: [
                      { value: Number(res.data.data.pipeHethRisk).toFixed(2), name: '管线健康' },
                      { value: Number(res.data.data.eventExp).toFixed(2), name: '事件密集度' },
                      { value: Number(res.data.data.envirExp).toFixed(2), name: '管线周边环境' },
                      { value: Number(res.data.data.hiddenExp).toFixed(2), name: '安全隐患' },
                      { value: Number(res.data.data.naturalExp).toFixed(2), name: '自然灾害' },
                      { value: Number(res.data.data.buildSelfExp).toFixed(2), name: '建筑本体' },
                      { value: Number(res.data.data.buildExp).toFixed(2), name: '建筑物密集度' },
                      { value: Number(res.data.data.municipalExp).toFixed(2), name: '市政基础设施' },
                      { value: Number(res.data.data.popuExp).toFixed(2), name: '人口密集度' },
                      { value: Number(res.data.data.keyAreaExp).toFixed(2), name: '重点区域' },
                    ],
                    itemStyle:{
                      emphasis: {
                        label: {
                          show: true,
                          fontSize: '18',
                          fontWeight: 'bold',
                          formatter: '{b}\n{d}%'
                        },
                      },
                    }
                  },
                ],
              });
            } else {

            }
          },
        );
      }else{
        let flagArea = localStorage.getItem('flagArea');
        if (flagArea == '管理单位') {
        //  多网格10指标占比图
          ajax.get(
            '/rest/decis/get/multi/info',
            {
              manage: localStorage.getItem('manage'),
            },
            res => {
              console.log(res,'管理单位多网格10指标占比图');
              if (res.status == 0) {
                //  渲染数据
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById(this.state.num));
                // 绘制图表
                myChart.setOption({
                  // tooltip: {
                  //   trigger: 'item',
                  //   formatter: '{b}:{d}%',
                  // },
                  color:['#5868B7','#80D5A9','#61708F','#EDBE46','#D76C59','#6790F1','#8C63B4','#F09C57','#499292','#F6C9E1'],
                  legend: {
                    orient: 'vertical',
                    left: 10,
                    data: ['管线健康', '事件密集度', '管线周边环境', '安全隐患', '自然灾害', '建筑本体', '建筑物密集度', '市政基础设施', '人口密集度', '重点区域'],
                  },
                  series: [
                    {
                      // name: '',
                      type: 'pie',
                      radius: ['50%', '70%'],
                      avoidLabelOverlap: false,
                      label: {
                        show: false,
                        position: 'center',
                      },
                      emphasis: {
                        label: {
                          show: true,
                          fontSize: '18',
                          fontWeight: 'bold',
                        },
                      },
                      labelLine: {
                        show: false,
                      },
                      data: [
                        { value: Number(res.data.data.pipeHethRisk).toFixed(2), name: '管线健康' },
                        { value: Number(res.data.data.eventExp).toFixed(2), name: '事件密集度' },
                        { value: Number(res.data.data.envirExp).toFixed(2), name: '管线周边环境' },
                        { value: Number(res.data.data.hiddenExp).toFixed(2), name: '安全隐患' },
                        { value: Number(res.data.data.naturalExp).toFixed(2), name: '自然灾害' },
                        { value: Number(res.data.data.buildSelfExp).toFixed(2), name: '建筑本体' },
                        { value: Number(res.data.data.buildExp).toFixed(2), name: '建筑物密集度' },
                        { value: Number(res.data.data.municipalExp).toFixed(2), name: '市政基础设施' },
                        { value: Number(res.data.data.popuExp).toFixed(2), name: '人口密集度' },
                        { value: Number(res.data.data.keyAreaExp).toFixed(2), name: '重点区域' },
                      ],
                      itemStyle:{
                        emphasis: {
                          label: {
                            show: true,
                            fontSize: '18',
                            fontWeight: 'bold',
                            formatter: '{b}\n{d}%'
                          },
                        },
                      }
                    },
                  ],
                });
              } else {

              }
            },
          );
        } else if (flagArea == '行政区域') {
  //  多网格10指标占比图
          ajax.get(
            '/rest/decis/get/multi/info',
            {
              distName: localStorage.getItem('manage'),
            },
            res => {
              console.log(res,'行政区域多网格10指标占比图');
              if (res.status == 0) {
                //  渲染数据
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById(this.state.num));
                // 绘制图表
                myChart.setOption({
                  // tooltip: {
                  //   trigger: 'item',
                  //   formatter: '{b}:{d}%',
                  // },
                  color:['#5868B7','#80D5A9','#61708F','#EDBE46','#D76C59','#6790F1','#8C63B4','#F09C57','#499292','#F6C9E1'],
                  legend: {
                    orient: 'vertical',
                    left: 10,
                    data: ['管线健康', '事件密集度', '管线周边环境', '安全隐患', '自然灾害', '建筑本体', '建筑物密集度', '市政基础设施', '人口密集度', '重点区域'],
                  },
                  series: [
                    {
                      // name: '',
                      type: 'pie',
                      radius: ['50%', '70%'],
                      avoidLabelOverlap: false,
                      label: {
                        show: false,
                        position: 'center',
                      },
                      emphasis: {
                        label: {
                          show: true,
                          fontSize: '18',
                          fontWeight: 'bold',
                        },
                      },
                      labelLine: {
                        show: false,
                      },
                      data: [
                        { value: Number(res.data.data.pipeHethRisk).toFixed(2), name: '管线健康' },
                        { value: Number(res.data.data.eventExp).toFixed(2), name: '事件密集度' },
                        { value: Number(res.data.data.envirExp).toFixed(2), name: '管线周边环境' },
                        { value: Number(res.data.data.hiddenExp).toFixed(2), name: '安全隐患' },
                        { value: Number(res.data.data.naturalExp).toFixed(2), name: '自然灾害' },
                        { value: Number(res.data.data.buildSelfExp).toFixed(2), name: '建筑本体' },
                        { value: Number(res.data.data.buildExp).toFixed(2), name: '建筑物密集度' },
                        { value: Number(res.data.data.municipalExp).toFixed(2), name: '市政基础设施' },
                        { value: Number(res.data.data.popuExp).toFixed(2), name: '人口密集度' },
                        { value: Number(res.data.data.keyAreaExp).toFixed(2), name: '重点区域' },
                      ],
                      itemStyle:{
                        emphasis: {
                          label: {
                            show: true,
                            fontSize: '18',
                            fontWeight: 'bold',
                            formatter: '{b}\n{d}%'
                          },
                        },
                      }
                    },
                  ],
                });
              } else {

              }
            },
          );
        } else {
  //  多网格10指标占比图
          ajax.get(
            '/rest/decis/get/multi/info',
            {
              manageArea: localStorage.getItem('manage'),
            },
            res => {
              console.log(res,'片区多网格10指标占比图');
              if (res.status == 0) {
                //  渲染数据
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById(this.state.num));
                // 绘制图表
                myChart.setOption({
                  // tooltip: {
                  //   trigger: 'item',
                  //   formatter: '{b}:{d}%',
                  // },
                  color:['#5868B7','#80D5A9','#61708F','#EDBE46','#D76C59','#6790F1','#8C63B4','#F09C57','#499292','#F6C9E1'],
                  legend: {
                    orient: 'vertical',
                    left: 10,
                    data: ['管线健康', '事件密集度', '管线周边环境', '安全隐患', '自然灾害', '建筑本体', '建筑物密集度', '市政基础设施', '人口密集度', '重点区域'],
                  },
                  series: [
                    {
                      // name: '',
                      type: 'pie',
                      radius: ['50%', '70%'],
                      avoidLabelOverlap: false,
                      label: {
                        show: false,
                        position: 'center',
                      },
                      emphasis: {
                        label: {
                          show: true,
                          fontSize: '18',
                          fontWeight: 'bold',
                        },
                      },
                      labelLine: {
                        show: false,
                      },
                      data: [
                        { value: Number(res.data.data.pipeHethRisk).toFixed(2), name: '管线健康' },
                        { value: Number(res.data.data.eventExp).toFixed(2), name: '事件密集度' },
                        { value: Number(res.data.data.envirExp).toFixed(2), name: '管线周边环境' },
                        { value: Number(res.data.data.hiddenExp).toFixed(2), name: '安全隐患' },
                        { value: Number(res.data.data.naturalExp).toFixed(2), name: '自然灾害' },
                        { value: Number(res.data.data.buildSelfExp).toFixed(2), name: '建筑本体' },
                        { value: Number(res.data.data.buildExp).toFixed(2), name: '建筑物密集度' },
                        { value: Number(res.data.data.municipalExp).toFixed(2), name: '市政基础设施' },
                        { value: Number(res.data.data.popuExp).toFixed(2), name: '人口密集度' },
                        { value: Number(res.data.data.keyAreaExp).toFixed(2), name: '重点区域' },
                      ],
                      itemStyle:{
                        emphasis: {
                          label: {
                            show: true,
                            fontSize: '18',
                            fontWeight: 'bold',
                            formatter: '{b}\n{d}%'
                          },
                        },
                      }
                    },
                  ],
                });
              } else {

              }
            },
          );
        }
      }
    } else if (this.state.num == 1) {
      //判断是否为小区
      if(localStorage.getItem('qufen')=='xiaoqu'){
        ajax.get(
          '/rest/decis/get/multi/info',
          {
            villageName: localStorage.getItem('gridNum'),
          },
          res => {
            console.log(res.data.levelScale, '多网格10个综合指标');
            if (res.status == 0) {
              // 基于准备好的dom，初始化echarts实例
              var myChart = echarts.init(document.getElementById(this.state.num));
              // 绘制图表
              myChart.setOption({
                // tooltip: {
                //   trigger: 'item',
                //   formatter: '{b}: {c} ({d}%)',
                // },
                color:['#E65B47','#EF923D','#EEC73C','#518AF2'],
                legend: {
                  orient: 'vertical',
                  left: 10,
                  data: ['重大风险', '较大风险', '一般风险', '低风险'],
                },
                series: [
                  {
                    // name: '',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                      show: false,
                      position: 'center',
                    },
                    emphasis: {
                      label: {
                        show: true,
                        fontSize: '30',
                        fontWeight: 'bold',
                      },
                    },
                    labelLine: {
                      show: false,
                    },
                    data: [
                      { value: res.data.levelScale.notSafe, name: '重大风险' },
                      { value: res.data.levelScale.lessSafe, name: '较大风险' },
                      { value: res.data.levelScale.safe, name: '一般风险' },
                      { value: res.data.levelScale.vsafe, name: '低风险' },
                    ],
                    itemStyle:{
                      emphasis: {
                        label: {
                          show: true,
                          fontSize: '18',
                          fontWeight: 'bold',
                          formatter: '{b}\n{d}%'
                        },
                      },
                    }
                  },
                ],
              });
            } else {

            }
          },
        );
      }else{
        let flagArea = localStorage.getItem('flagArea');
        if (flagArea == '管理单位') {
          //  多网格10个综合指标占比图
          ajax.get(
            '/rest/decis/get/multi/info',
            {
              manage: localStorage.getItem('manage'),
            },
            res => {
              console.log(res.data.levelScale, '多网格10个综合指标');
              if (res.status == 0) {
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById(this.state.num));
                // 绘制图表
                myChart.setOption({
                  // tooltip: {
                  //   trigger: 'item',
                  //   formatter: '{b}: {c} ({d}%)',
                  // },
                  color:['#E65B47','#EF923D','#EEC73C','#518AF2'],
                  legend: {
                    orient: 'vertical',
                    left: 10,
                    data: ['重大风险', '较大风险', '一般风险', '低风险'],
                  },
                  series: [
                    {
                      // name: '',
                      type: 'pie',
                      radius: ['50%', '70%'],
                      avoidLabelOverlap: false,
                      label: {
                        show: false,
                        position: 'center',
                      },
                      emphasis: {
                        label: {
                          show: true,
                          fontSize: '30',
                          fontWeight: 'bold',
                        },
                      },
                      labelLine: {
                        show: false,
                      },
                      data: [
                        { value: res.data.levelScale.notSafe, name: '重大风险' },
                        { value: res.data.levelScale.lessSafe, name: '较大风险' },
                        { value: res.data.levelScale.safe, name: '一般风险' },
                        { value: res.data.levelScale.vsafe, name: '低风险' },
                      ],
                      itemStyle:{
                        emphasis: {
                          label: {
                            show: true,
                            fontSize: '18',
                            fontWeight: 'bold',
                            formatter: '{b}\n{d}%'
                          },
                        },
                      }
                    },
                  ],
                });
              } else {

              }
            },
          );
        } else if (flagArea == '行政区域') {
          //  多网格10个综合指标占比图
          ajax.get(
            '/rest/decis/get/multi/info',
            {
              distName: localStorage.getItem('manage'),
            },
            res => {
              console.log(res.data.levelScale, '多网格10个综合指标');
              if (res.status == 0) {
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById(this.state.num));
                // 绘制图表
                myChart.setOption({
                  // tooltip: {
                  //   trigger: 'item',
                  //   formatter: '{b}: {c} ({d}%)',
                  // },
                  color:['#E65B47','#EF923D','#EEC73C','#518AF2'],
                  legend: {
                    orient: 'vertical',
                    left: 10,
                    data: ['重大风险', '较大风险', '一般风险', '低风险'],
                  },
                  series: [
                    {
                      // name: '',
                      type: 'pie',
                      radius: ['50%', '70%'],
                      avoidLabelOverlap: false,
                      label: {
                        show: false,
                        position: 'center',
                      },
                      emphasis: {
                        label: {
                          show: true,
                          fontSize: '30',
                          fontWeight: 'bold',
                        },
                      },
                      labelLine: {
                        show: false,
                      },
                      data: [
                        { value: res.data.levelScale.notSafe, name: '重大风险' },
                        { value: res.data.levelScale.lessSafe, name: '较大风险' },
                        { value: res.data.levelScale.safe, name: '一般风险' },
                        { value: res.data.levelScale.vsafe, name: '低风险' },
                      ],
                      itemStyle:{
                        emphasis: {
                          label: {
                            show: true,
                            fontSize: '18',
                            fontWeight: 'bold',
                            formatter: '{b}\n{d}%'
                          },
                        },
                      }
                    },
                  ],
                });
              } else {

              }
            },
          );
        }
        else {
          //  多网格10个综合指标占比图
          ajax.get(
            '/rest/decis/get/multi/info',
            {
              manageArea: localStorage.getItem('manage'),
            },
            res => {
              console.log(res.data.levelScale, '多网格10个综合指标');
              if (res.status == 0) {
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById(this.state.num));
                // 绘制图表
                myChart.setOption({
                  // tooltip: {
                  //   trigger: 'item',
                  //   formatter: '{b}: {c} ({d}%)',
                  //   // ormatter: '{a} <br/>{b}: {c} ({d}%)',
                  // },
                  color:['#E65B47','#EF923D','#EEC73C','#518AF2'],
                  legend: {
                    orient: 'vertical',
                    left: 10,
                    data: ['重大风险', '较大风险', '一般风险', '低风险'],
                  },
                  series: [
                    {
                      // name: '',
                      type: 'pie',
                      radius: ['50%', '70%'],
                      avoidLabelOverlap: false,
                      label: {
                        show: false,
                        position: 'center',
                      },
                      emphasis: {
                        label: {
                          show: true,
                          fontSize: '30',
                          fontWeight: 'bold',
                        },
                      },
                      labelLine: {
                        show: false,
                      },
                      data: [
                        { value: res.data.levelScale.notSafe, name: '重大风险' },
                        { value: res.data.levelScale.lessSafe, name: '较大风险' },
                        { value: res.data.levelScale.safe, name: '一般风险' },
                        { value: res.data.levelScale.vsafe, name: '低风险' },
                      ],
                      itemStyle:{
                        emphasis: {
                          label: {
                            show: true,
                            fontSize: '18',
                            fontWeight: 'bold',
                            formatter: '{b}\n{d}%'
                          },
                        },
                      }
                    },
                  ],
                });
              } else {

              }
            },
          );
        }
      }


    }else if(this.state.num==3){
      //  单网格管线管龄分布
      ajax.get(
        '/rest/grid/score/4th/get/age/pipe',
        {
          nums:Number(localStorage.getItem('gridNum'))
        },
        res=>{
          console.log(res.data.data,'管线管龄数据');
          if(res.status==0){
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(this.state.num));
            // 绘制图表
            myChart.setOption({
              // tooltip: {
              //   trigger: 'item',
              //   formatter: '{b}:{c}条({d}%)',
              // },
              graphic:{       //图形中间图片
                elements: [{
                  type: 'image',
                  style: {
                    image: WaterTap,//你的图片地址
                    width: 110,
                    height: 85
                  },
                  left: 'center',
                  top: 'center'
                }]
              },
              color:["#CFE8A7","#6079ED", "#09DAA6","#EFBE29","#E46572"],
              legend: {
                orient: 'vertical',
                left: 0,
                data: [ '1980年之前','1980~1990', '1990~2000', '2000~2010','2010~2020'],
              },
              series: [
                {
                  // name: '',
                  type: 'pie',
                  radius: ['60%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                    show: false,
                    position: 'center',
                  },
                  emphasis: {
                    label: {
                      show: false,
                      fontSize: '16',
                      fontWeight: 'bold',
                    },
                  },
                  labelLine: {
                    show: false,
                  },
                  data: [
                    { value: res.data.data[0].s1980Before, name: '1980年之前' },
                    { value:res.data.data[0].s1990, name: '1980~1990' },
                    { value: res.data.data[0].s2000, name: '1990~2000' },
                    { value: res.data.data[0].s2010, name: '2000~2010' },
                    { value: res.data.data[0].s2020, name: '2010~2020' },
                  ],
                  itemStyle:{
                    emphasis: {
                      label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold',
                        formatter: '{b}\n{c}条({d}%)',
                        position:'center',
                        // offset:100
                      },
                    },
                  }
                },
              ],
            });
          }else{
            console.log('请重试')
          }
        }
      )
    }else if(this.state.num==9){
// 基于准备好的dom，初始化echarts实例
//       console.log(this.props,'zonghe ');
      var myChart = echarts.init(document.getElementById(this.state.num));
      // 绘制图表
      myChart.setOption({
        // tooltip: {
        //   trigger: 'item',
        //   formatter: '{b}: {d}%',
        // },
        legend: {
          orient: 'vertical',
          left: 10,
          top:15,
          data: [this.props.title, '其他'],
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['50%', '70%'],
            // roseType: 'radius',
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: Number(this.props.titleNum), name: this.props.title,itemStyle: { color: '#5E78ED' } },
              { value: Number(this.props.totalNum)-Number(this.props.titleNum), name: '其他',itemStyle: { color: '#CAD1EE' } },
            ],
            itemStyle:{
              emphasis: {
                label: {
                  show: true,
                  fontSize: '18',
                  fontWeight: 'bold',
                  formatter: '{b}\n{d}%'
                },
              },
            }
          },
        ],
      });
    }else if(this.state.num==13){
            console.log(this.props,'zonghe ');
      var myChart = echarts.init(document.getElementById(this.state.num));
      // 绘制图表
      myChart.setOption({
        // tooltip: {
        //   trigger: 'item',
        //   formatter: '{b}:{d}%',
        // },
        legend: {
          orient: 'vertical',
          left: 10,
          top:15,
          data: [this.props.title, '其他'],
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['50%', '70%'],
            // roseType: 'radius',
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: Number(this.props.titleNum), name: this.props.title,itemStyle: { color: '#5E78ED' } },
              { value: Number(this.props.totalNum)-Number(this.props.titleNum), name: '其他',itemStyle: { color: '#CAD1EE' } },
            ],
            itemStyle:{
              emphasis: {
                label: {
                  show: true,
                  fontSize: '18',
                  fontWeight: 'bold',
                  formatter: '{b}\n{d}%'
                },
              },
            }
          },
        ],
      });
    }

    else {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById(this.state.num));
      // 绘制图表
      myChart.setOption({
        // tooltip: {
        //   trigger: 'item',
        //   formatter: '{a} <br/>{b}: {c} ({d}%)',
        // },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' },
            ],
          },
        ],
      });
    }

  }

  render() {
    return (
      <div id={this.state.num} style={{ width: 410, height: 250, margin: 'auto' }}></div>
    );
  }
}

export default ProportionChar;
