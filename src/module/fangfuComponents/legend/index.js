import React from 'react';
import style from './style.less';


/**
 *
 *
 * @export  顶部图标展示r防腐层检测
 * @class legend
 * @extends {React.Component}
 */
export class Legends extends React.Component {

  render() {
    return <div className={style.legends}>
      <div className={style.item}>
        <i className={"gas gas-ditie1"} />
        <span>防腐层类型1</span>
      </div>
      <div className={style.item}>
        <i className={"gas gas-ditie1"} />
        <span>防腐层类型2</span>
      </div>
      <div className={style.item}>
        <i className={"gas gas-ditie1"} />
        <span>防腐层类型3</span>
      </div>
    </div>
  }
}
