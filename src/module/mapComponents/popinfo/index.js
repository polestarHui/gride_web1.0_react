import React from 'react';
import style from './style.less';
import img from './info.png';

export class PopInfo extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      innerData: {

      }
    }
  }

  componentDidMount(){
    let _this = this;
  }

  render(){

    let {innerData} = this.state;

    return <div className={style.popinfo}>
      <div className={style.container}>
        <div>运行人员：{'张三'}</div>
        <div>异常点：{'1个'}</div>
        <div>管线压力：{'中压A'}</div>
        <div>管理单位：{'一分公司·运营三所·一班'}</div>
        <div>运行时间：{'2020-04-01 18:31'}</div>
        <div>运行街道：{'丰台区角门南路到大红门'}</div>
      </div>
      <div className={style.imgs}>
        <img src={img} alt={''}/>
      </div>
      <div className={style.btn}>
        <a>详情>></a>
      </div>
    </div>
  }
}
