import React from 'react';
import style from './style.less';

export class LittleBox extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render(){

    let {unit, name, value, color} = this.props;

    return <div className={style.littleBox}>
      <div className={style.value} style={{color}}>{value}<span>{unit}</span></div>
      <div className={style.name}>{name}</div>
    </div>
  }
}
