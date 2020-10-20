import React from 'react';



/**
 *
 *
 * @export 左侧目录展示 防腐层类型
 * @class ProtectionType
 * @extends {React.Component}
 */
export class ProtectionType  extends React.Component{
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  option = {
    title: {
      text: '防腐破损点',
      top: 4,
      textStyle: {
        color: 'rgba(85, 104, 186, 1)',
        fontSize: 12,
        textAlign: 'left',
        fontWeight: 'normal',
      }
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },

    color:['#5962B9', '#ffbe05','#7ED321','#F5A319'],
    top: 20,
    left: 10,
    right: 10,

    series: [
        {
           name:  '防腐层类型',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center',
                color: 'black',
                fontSize: 12,
            },
            tooltip: {
              textStyle:{
                width: 20,
                height: 20
              }
            },
            width: 70,
            height: 70,
            emphasis: {
                label: {
                    show: true,
                    fontSize: 12,
                }
            },
            // 展示连接线
            labelLine: {
                show: false,
            },
            data: [
                {value: 335, name: '防腐层类型1'},
                {value: 310, name: '防腐层类型2'},
                {value: 234, name: '防腐层类型3'},
            ],
        }
    ]
};

  componentDidMount() {
    console.log(option, '1231')
    let { dom, option } = this;
    this.chart = window.echarts.init(dom);
    this.chart.setOption(option);
  }
  render(){
    return <div style={{width: '200px', height: '160px'}} ref={e => this.dom = e}/>
  }
}


// import React from 'react';



// /**
//  *
//  *
//  * @export 左侧目录展示 防腐层类型
//  * @class ProtectionType
//  * @extends {React.Component}
//  */
// export class ProtectionType  extends React.Component{
//   constructor(props) {
//     super(props);
//     this.state = {}
//   }
  
//   option = {
//     tooltip: {
//         trigger: 'item',
//         formatter: '{a} <br/>{b}: {c} ({d}%)'
//     },

//     color:['#5962B9', '#ffbe05','#7ED321','#F5A319'],
//     top: 20,
//     left: 10,
//     right: 10,

//     series: [
   
//         {
//           name:  '12',
//             type: 'pie',
//             radius: ['50%', '70%'],
//             avoidLabelOverlap: false,
//             label: {
//                 show: true,
//                 position: 'outside',
//                 color: 'red',
//                 padding: [1,2,3,4 ],
//                 fontSize: 12,
//             },
//             legendHoverLink: false,
//             hoverAnimation: false,
//             width: 70,
//             height: 70,
//             emphasis: {
//                 label: {
//                     show: true,
//                     fontSize: 12,
//                 }
//             },
//             // 展示连接线
//             labelLine: {
//                 show: false,
//             },
//             data: [
//                 {value: 335, name: '防腐层类型1'},
//                 {value: 310, name: '防腐层类型2'},
//                 {value: 234, name: '防腐层类型3'},
//             ],
//         }
//     ]
// };

//   componentDidMount() {
//     console.log(option, '1231')
//     let { dom, option } = this;
//     this.chart = window.echarts.init(dom);
//     this.chart.setOption(option);
//   }
//   render(){
//     return <div style={{width: '200px', height: '160px'}} ref={e => this.dom = e}/>
//   }
// }

