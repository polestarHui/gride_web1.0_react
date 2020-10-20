import React, { Fragment } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import style from './style.less';

/**
 *
 *
 * @export  页面日期展示
 * @class DateBox
 * @extends {React.Component}
 */
export class DateBox extends React.Component {


    render() {
        const { RangePicker } = DatePicker;
        const dateFormat = 'YYYY/MM/DD';

        // console.log( moment().format('YYYY-MM-DD'), 'time');

        return (<div className={style.dateBox}>
            <RangePicker
                defaultValue={[moment(), moment()]}
                format={dateFormat}
                className="rangeFix"
            />
        </div>)
    }
};
