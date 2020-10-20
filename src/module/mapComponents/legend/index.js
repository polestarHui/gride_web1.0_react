import React from 'react';
import style from './style.less';

/**
 *
 *
 * @export 防腐顶部图标展示
 * @class Legends
 * @extends {React.Component}
 */
export class Legends extends React.Component{
  constructor(props) {
    super(props);
    this.state = {}
  }

  render(){
    return <div className={style.legends}>
      <div className={style.item}>
        <i className={"gas gas-ditie1"}/>
        <span>地铁</span>
      </div>
      <div className={style.item}>
        <i className={"gas gas-tielu1"}/>
        <span>铁路</span>
      </div>
      <div className={style.item}>
        <i className={"gas gas-yingjishijian"}/>
        <span>事件点</span>
      </div>
      <div className={style.item}>
        <i className={"gas gas-wailipohuaishijian"}/>
        <span>施工点</span>
      </div>
      <div className={style.item}>
        <i className={"gas gas-fangfucengposundian"}/>
        <span>防腐层破损点</span>
      </div>
      <div className={style.item}>
        <i className={"gas gas-chongdianzhuang"}/>
        <span>充电桩</span>
      </div>
    </div>
  }
}
