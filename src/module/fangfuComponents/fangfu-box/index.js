import React from 'react';
import style from './style.less';
import { DateBox } from '../../date-box';
import { AddressBox } from '../../address-box';


/**
 *
 *
 * @export  防腐层检测地址时间显示模块
 * @class legend
 * @extends {React.Component}
 */
export class Fbox extends React.Component {

    render() {

        return <div className={style.fangfuBox}>
            <div className={style.fangfuLine}>
                <span>防腐层检测</span>
                <i className={"gas gas-ditie1"} />
            </div>
            <div className={style.fangfuAddress}>
                <AddressBox />
            </div>
            <div className={style.fangfuDate}>
                <DateBox />
            </div>
        </div>
    }
}