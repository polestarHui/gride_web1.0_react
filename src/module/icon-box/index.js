import React from 'react';
import style from './style.less';
import { Switch } from 'antd';
import {DateBox}  from '../date-box'; 
import {AddressBox} from '../address-box';


/**
 *
 *
 * @export 管线运行run 右下角管线位置模块
 * @class IconBox
 * @extends {React.Component}
 */
export class IconBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        function handleChange(value) {
            console.log(`selected ${value}`);
        }
        return <div className={style.iconBox}>
            <div className={style.iconBoxLine}>
                <p>管道位置</p>
                <Switch size="small" defaultChecked />
            </div>
            <div className={style.iconBoxSelect} >
                <AddressBox />
            </div>
            <div className={style.iconBoxRange}>
              <DateBox />
            </div>
        </div>
    }
}
