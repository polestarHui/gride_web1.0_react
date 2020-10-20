import React from "react";
import style from './style.less';

// const TextStyle = {
//   fontSize: 18,
//   paddingBottom: 0,
// }

export default function geologyProgress () {
    return (
      <div className={style.progressBox}>
            <p >地质下降</p>
            <div className={style.progressBoxMiddle}></div>
            <div className={style.progressBoxBottom}>
                <p>0cm</p>
                <p>1cm</p>
            </div>
      </div>
    )
  };
  

  
  