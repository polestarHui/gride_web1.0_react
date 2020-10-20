import React from 'react';
import style from './style.less';
import Gauge from '../gauge';
import EchartsTest from '../pie1';
import Bar from '../bar';
import Bar2 from '../bar2';
import ProportionChar from '../proportionChar/index';
import Boxplot from '../boxplot/index';
import LineBar from '../lineBar';
import DoubleBar from '../doubleBar';
import DoubleLine from '../doubleLine';
import ThreeLine from '../threeLine';



class Leftpart2 extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      isShow:true,
      leftWidth:425
    }
    //console.log(this.props.totalNum,'固定title的数据');
  }
  //左侧是否显示的动画
  isShow(e){
    this.setState({
      isShow:!this.state.isShow
    })
    if(this.state.isShow){
      //  不显示
      this.setState({
        leftWidth:0
      })
    }else{
      //  显示
      this.setState({
        leftWidth:425
      })
    }
  }
  render() {
    let Isxiaoqu;
    if (localStorage.getItem('qufen') == 'xiaoqu') {
      if(localStorage.getItem('gridNum')=='三里河一区'){
        Isxiaoqu = (
          <div>
            <div className={style.oneWrap}>
              <div className={style.title}>{this.props.title}指标分布</div>
              <div>
                <Boxplot title={this.props.title} count="7"/>
              </div>
            </div>
          </div>
        );
      }else{
        Isxiaoqu = (
          null
        );
      }

    } else {
      if(this.props.title=='管线健康'){
        Isxiaoqu = (
          <div>
            <div className={style.oneWrap}>
              <div className={style.title}>管线管龄分布</div>
              <div>
                <ProportionChar count="3"/>
              </div>
            </div>
            <div className={style.oneWrap}>
              <div className={style.title}>管线管径分布</div>
              <div>
                <Bar count="4"/>
              </div>
            </div>
            <div className={style.oneWrap}>
              <div className={style.title}>压力级制分布</div>
              <div>
                <Bar2 count="5"/>
              </div>
            </div>
          </div>
        );
      }else if(this.props.title=='事件密集度'){

      }else if(this.props.title=='管线周边环境'){
        Isxiaoqu = (
          <div>
            <div className={style.oneWrap}>
              <div className={style.title}>电气化设备管线焦点以及长度统计</div>
              <div>
                <LineBar count="10"/>
              </div>
            </div>
          </div>
        )
      }else if(this.props.title=='安全隐患'){
        Isxiaoqu = (
          <div>
            <div className={style.oneWrap}>
              <div className={style.title}>网格一般、重大隐患数量分布</div>
              <div>
                <DoubleBar count="11"/>
              </div>
            </div>
          </div>
        )

      }else if(this.props.title=='自然灾害'){

      }else if(this.props.title=='建筑本体'){

      }else if(this.props.title=='建筑物密集度'){
        Isxiaoqu = (
          <div>
            <div className={style.oneWrap}>
              <div className={style.title}>各属性建筑物数量及面积的分布</div>
              <div>
                <LineBar count="12"/>
              </div>
            </div>
          </div>
        )
      }else if(this.props.title=='市政基础设施'){

      }else if(this.props.title=='人口密集度'){
        Isxiaoqu = (
          <div>
            <div className={style.oneWrap}>
              <div className={style.title}>24小时人口流动</div>
              <div>
                <DoubleLine count="13"/>
              </div>
            </div>
            <div className={style.oneWrap}>
              <div className={style.title}>居住、到访、工作人口流动</div>
              <div>
                <ThreeLine count="14"/>
              </div>
            </div>
          </div>
        )

      }else if(this.props.title=='重点区域'){

      }

    }
    return (
      <div className={style.leftpart2Container} style={{width:this.state.leftWidth}}>
        <div className={style.charsWrap}>
          <div className={style.oneWrap}>
            <div className={style.title}>{this.props.title}指标值</div>

              {this.props.title=='管线健康'?
                <div className={style.detailNum}>
                {(this.props.titleNum/0.2).toFixed(2)}</div>:
                null
              }
            {this.props.title=='事件密集度'?
              <div className={style.detailNum}>
                {(this.props.titleNum/0.3).toFixed(2)}</div>:
              null
            }
            {this.props.title=='管线周边环境'?
              <div className={style.detailNum}>
                {(this.props.titleNum/0.15).toFixed(2)}</div>:
              null
            }
            {this.props.title=='安全隐患'?
              <div className={style.detailNum}>
                {(this.props.titleNum/0.3).toFixed(2)}</div>:
              null
            }
            {this.props.title=='自然灾害'?
              <div className={style.detailNum}>
                {(this.props.titleNum/0.05).toFixed(2)}</div>:
              null
            }
            {this.props.title=='建筑本体'?
              <div className={style.detailNum}>
                {(this.props.titleNum/0.25).toFixed(2)}</div>:
              null
            }
            {this.props.title=='建筑物密集度'?
              <div className={style.detailNum}>
                {(this.props.titleNum/0.25).toFixed(2)}</div>:
              null
            }
            {this.props.title=='市政基础设施'?
              <div className={style.detailNum}>
                {(this.props.titleNum/0.1).toFixed(2)}</div>:
              null
            }
            {this.props.title=='人口密集度'?
              <div className={style.detailNum}>
                {(this.props.titleNum/0.3).toFixed(2)}</div>:
              null
            }
            {this.props.title=='重点区域'?
              <div className={style.detailNum}>
                {(this.props.titleNum/0.1).toFixed(2)}</div>:
              null
            }

          </div>
          {/*公共部分的展示*/}
          <div className={style.oneWrap}>
            <div className={style.title}>{this.props.title}指标占比</div>
            <div>
              <ProportionChar titleNum={this.props.titleNum} title={this.props.title}  totalNum={this.props.totalNum} count="9"/>
            </div>
          </div>
          <div>{Isxiaoqu}</div>

        </div>
        <div className={style.leftTitle} onClick={this.isShow.bind(this)}>图表</div>
      </div>
    );
  }
}

export default Leftpart2;
