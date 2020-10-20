import React from 'react';
import style from './style.less';
import {LittleBox} from "./littlebox";

export class ShowBox extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render(){

    return <div className={style.showBox}>
      <div className={style.innerBox}>
        <LittleBox name={'运行距离'} unit={'km'} value={'10'}/>
        <LittleBox name={'异常上报'} unit={'%'} value={'80'}/>
        <LittleBox name={'异常上报'} unit={'个'} value={'85'}/>
        <LittleBox name={'应急事件'} unit={'个'} value={'5'}/>
        <LittleBox name={'必经点'} unit={'k'} value={'6.5'}/>
        <LittleBox name={'重点保障'} unit={'个'} value={'50'}/>
        <LittleBox name={'运行偏离'} unit={'个'} value={'25'}/>
      </div>
      <a>更多信息</a>
    </div>
  }
}
