import React from 'react';
import style from './style.less';
// import { LittleBox } from "../show-box/littlebox";
import {Damage} from './damage';
import {Insulation} from "./insulation";
import { ProtectionType} from "./protection-type";
import {Thickness} from "./thickness";


/**
 *
 *
 * @export 左侧目录展示 防腐
 * @class DetailBox
 * @extends {React.Component}
 */
export class DetailEchartsBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (<div className={style.detailBox}>
            <div className={style.item}>
                <Insulation />
            </div>
            <div className={style.item}>
                <Damage />
            </div>
            <div className={style.item}>
                <Thickness />
            </div >
            <div className={style.item}>
                <ProtectionType />
            </div>
        </div>)
    }
}
