import React from 'react';
import style from './style.less';
import {LittleBox} from "../show-box/littlebox";


/**
 *
 *
 * @export 左侧目录展示 管道信息
 * @class DetailBox
 * @extends {React.Component}
 */
export class DetailBox extends React.Component{
  constructor(props) {
    super(props);
    this.state = {}
  }

  render(){
    return <div className={style.detailBox}>
      <div className={style.title}>基本信息</div>
      <div className={style.lineBox}><span>管线编码</span>: <span>GN813483</span></div>
      <div className={style.lineBox}><span>风险级别</span>: <span>较高风险</span></div>
      <div className={style.lineBox}><span>压力级制</span>: <span>中压A</span></div>
      <div className={style.lineBox}><span>管线位置</span>: <span>丰台区大红门西路</span></div>
      <div className={style.lineBox}><span>管理单位</span>: <span>一分公司运营五所第二班组</span></div>
      <div className={style.title}>基本数据</div>
      <div className={style.lineBox}><span>管线长度</span>: <span>25 km</span></div>
      <div className={style.lineBox}><span>铁路轨道</span>: <span>1.5 km</span></div>
      <div className={style.lineBox}><span>地铁轨道</span>: <span>8.6 km</span></div>
      <div className={style.lineBox}><span>无轨电车</span>: <span>0 km</span></div>
      <div className={style.lineBox}><span>充电桩</span>: <span>1 个</span></div>
      <div className={style.title}>重要数据</div>
      <div className={style.innerBox}>
        <LittleBox name={'防腐层破损点'} unit={'个'} value={'1'} color={'red'}/>
        <LittleBox name={'防腐层厚度'} unit={'cm'} value={'6.5'}/>
        <LittleBox name={'绝缘电阻值'} unit={'%'} value={'10'}/>
        <LittleBox name={'运行异常点'} unit={'个'} value={'7'}/>
        <LittleBox name={'土壤电阻率'} unit={'km'} value={'6.5'}/>
        <LittleBox name={'泄漏点'} unit={'个'} value={'1'} color={'red'}/>
        <LittleBox name={'阴极保护单位'} unit={'个'} value={'1'}/>
        <LittleBox name={'施工点'} unit={'个'} value={'1'}/>
        <LittleBox name={'应急事件'} unit={'个'} value={'1'} color={'red'}/>
        <LittleBox name={'地质沉降'} unit={'cm'} value={'0.12'}/>
      </div>
    </div>
  }
}
