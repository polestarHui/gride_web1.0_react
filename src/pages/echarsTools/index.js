import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

/*
* 饼图组件可支持环形切换，
* 包含无数据展示，onresize重绘事件
* 可以自定义option, 支持多种鼠标事件
* 暂时未封装图例，图例等其他功能可通过 options自己定义添加
* deleteOption: ['title', 'toolbox', 'tooltip', 'graphic'] 包含echarts含有的属性
*
* */

/*
 * chartsData 数据格式
 * const chartsData = [
 *  {value: 335, name: '直接访问'},
 *  {value: 310, name: '邮件营销'},
 *  {value: 234, name: '联盟广告'},
 * ]
 * */

const _eventType = ['click', 'dblclick', 'mousedown', 'mousemove', 'mouseup', 'mouseover', 'mouseout', 'globalout', 'contextmenu'];

class PieChart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {}
  }
//  类型检查
  static propTypes = {
    chartsData: PropTypes.array.isRequired, // 图形数据
    idPrefix: PropTypes.oneOfType([
      PropTypes.string.isRequired, // 唯一标识区分多个饼图，
      PropTypes.number.isRequired, // 唯一标识区分多个饼图，
    ]),
    getCharts: PropTypes.func, // 把echarts 对象传出去
    onResize: PropTypes.func, // 全局onResize事件，
    eChartsEvent: PropTypes.func, // 图形点击事件, 返回这各图形的数据以及对应的param，echarts 对象

    title: PropTypes.string, // 标题栏，名字
    bgColor: PropTypes.string, // 背景色
    chartColor: PropTypes.array, // 扇形区域颜色
    radius: PropTypes.array, // 半径内圈半径不可以调小不然暂无数据的时候字放不下
    center: PropTypes.array, // 位置调节
    label: PropTypes.bool, // 是否展示label
    maxShow: PropTypes.number, // 需 >= 0 最多展示几个扇形，不传则默认不处理，建议不要大于5
    options: PropTypes.object, // 修改 更新的想要的配置，直接那eCharts的就可以
    deleteOption: PropTypes.array, // 删除不需要的配置
    eventType: PropTypes.oneOf(_eventType), // 事件类型
  };

  static defaultProps = {
    title: '',
    bgColor: "#fff",
    chartColor: ['#1890ff', '#13c2c2', '#52c41a', '#faad14', '#f5222d', '#722ed1', '#eb2f96', '#faad14'],
    radius: ['0', '65%'],
    center: ['50%', '55%'],
    label: false,
    eventType: 'click',
  };

  componentDidMount() {
    const {
      chartsData, idPrefix, getCharts, onResize, title, bgColor,
      chartColor, radius, center, label, maxShow, deleteOption, options,
      eChartsEvent, eventType
    } = this.props;

    let newChartsData = [];
    if (maxShow && maxShow >= 0 && chartsData.length > maxShow) {
      chartsData.sort((a, b) => {
        return b.value - a.value;
      });

      newChartsData = chartsData.slice(0, maxShow);
      let total = 0;
      chartsData.map((item, index) => {
        if (index > 4) {
          total += item.value
        }
      });
      newChartsData = [...newChartsData, {value: total, name: '其他'}];
    }
    else {
      newChartsData = [...chartsData]
    }

    let myCharts = echarts.init(document.getElementById(`${idPrefix}_pie`));

    if (getCharts && typeof func === 'function') {
      getCharts(myCharts);
    }
    myCharts.clear();

    _eventType.map(item => {
      myCharts.off(item);
    });

    let option = {
      color: newChartsData.length ? chartColor : '#bfbfbf',
      title: {
        text: title,
        x: '23%',
        y: '50%',
      },
    //   toolbox: {
    //     feature: {
    //       saveAsImage: {
    //         type: 'png',
    //         title: '点击下载',
    //       }
    //     },
    //     top: 13,
    //     right: 13
    //   },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series: [
        {
          name: title,
          type: 'pie',
          radius,
          center,
          avoidLabelOverlap: false,
          label: {
            show: label,
          },
          labelLine: {
            normal: {
              show: label
            }
          },
          itemStyle: {
            borderWidth: 2, //设置border的宽度有多大
            borderColor: bgColor,
          },
          hoverAnimation: false,
          hoverOffset: 0,
          data: newChartsData.length ? newChartsData : [{value: 0, name: '暂无数据'}],
        },
      ],
      graphic: newChartsData.length
        ? null
        : [{
          type: 'text',
          left: 'center',
          top: radius[0] === '0' ? 'auto' : center[1],
          bottom: 10,
          cursor: 'auto',
          style: {
            text: '暂无数据',
            textAlign: 'center',
            fill: '#bfbfbf',
            fontSize: 16,
            stroke: '#bfbfbf',
            lineWidth: 0
          }
        }]
    };

    if (deleteOption) {
      deleteOption.map(item => {
        delete option[item]
      });
    } // 删除函数

    if (options) {
      option = {...option, ...options}
    } // 补充的options

    myCharts.setOption(option);

    if (eChartsEvent && typeof eChartsEvent === 'function') {
      myCharts.on(eventType, 'series', params => {
        eChartsEvent(params, chartsData, myCharts);
      });
    }

    window.onresize = () => {
      let target = this;
      if (target.resizeFlag) {
        clearTimeout(target.resizeFlag);
      }
      target.resizeFlag = setTimeout(function () {
        myCharts.resize();
        if (onResize && typeof onResize === 'function') {
          onResize();
        }
        target.resizeFlag = null;
      }, 100);
    }
  }

  render() {
    const {idPrefix} = this.props;
    return (
      <div
        id={`${idPrefix}_pie`}
        style={{width: '300px', height: '200px'}}/>
    )
  }
}

export default PieChart;
