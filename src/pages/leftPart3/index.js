import React from 'react';
import style from './style.less';
import { Tabs } from 'antd';
import Paixu1 from '../../assets/map/paixu1.svg';
import Paixu2 from '../../assets/map/paixu2.svg';
import Boxplot from '../boxplot';
import ProportionChar from '../proportionChar/index';
import * as ajax from '../../framework/tools/ajax';
import router from 'umi/router';

const { TabPane } = Tabs;


function callback(key) {
  console.log(key);
}


class Leftpart3 extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      isShow:true,
      leftWidth:425,
      current:'1',
      rankContent:'',
      orderFiled:true,
      noFiled:true,
    }
    // console.log(this.props.allDetailsMsg,'leftpart3');
    console.log(this.props.allDataMsg,'allDataMsg');
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
  //下一页
  getPageMsg(){
    this.componentWillMount();
  }
  //上一页
  lastPageMsg(){
    window.location.reload();
  }

  //点击网格编号
  clickGrid(gridNum,e){
    // console.log('gridNum',gridNum,e);
    this.props.clickGrid.clickGrid(gridNum);
  }
  componentWillMount(){
  //  多网格管理单位的分页
    if(localStorage.getItem('flagArea')=='管理单位'){
      if(localStorage.getItem('zhibaio')=='zhibiao'){
        if(localStorage.getItem('orderFiled')){
          this.setState({
            orderFiled:!this.state.orderFiled
          })
          if(!this.state.orderFiled){
            ajax.get(
              '/rest/grid/get/list',
              {
                field:this.props.allDataMsg.title,
                manage:localStorage.getItem('manage'),
                pageSize:20,
                current:1,
                order:'desc'
              },
              res=>{
                console.log(res,'123456789');
                localStorage.removeItem('orderFiled');
                this.setState({
                  rankContent:res,
                  current:Number(res.pagination.current)+1
                })
              }
            )
          }else{
            ajax.get(
              '/rest/grid/get/list',
              {
                field:this.props.allDataMsg.title,
                manage:localStorage.getItem('manage'),
                pageSize:20,
                current:1,
                // order:'desc'
              },
              res=>{
                console.log(res,'123456789');
                localStorage.removeItem('orderFiled');
                this.setState({
                  rankContent:res,
                  current:Number(res.pagination.current)+1
                })
              }
            )
          }
        }else{
          if(this.state.orderFiled){
            ajax.get(
              '/rest/grid/get/list',
              {
                field:this.props.allDataMsg.title,
                manage:localStorage.getItem('manage'),
                pageSize:20,
                current:this.state.current,
                order:'desc'
              },
              res=>{
                console.log(res,'123456789');
                this.setState({
                  rankContent:res,
                  current:Number(res.pagination.current)+1
                })
              }
            )
          }else{
            ajax.get(
              '/rest/grid/get/list',
              {
                field:this.props.allDataMsg.title,
                manage:localStorage.getItem('manage'),
                pageSize:20,
                current:this.state.current,
                // order:'desc'
              },
              res=>{
                console.log(res,'123456789');
                this.setState({
                  rankContent:res,
                  current:Number(res.pagination.current)+1
                })
              }
            )
          }
        }
      }else{
        if(localStorage.getItem('noFiled')){
          this.setState({
            noFiled:!this.state.noFiled
          })
          if(!this.state.noFiled){
            ajax.get(
              '/rest/grid/get/list',
              {
                // field:this.props.allDataMsg.title,
                manage:localStorage.getItem('manage'),
                pageSize:20,
                current:1,
                order:'desc'
              },
              res=>{
                // console.log(res,'123456789');
                localStorage.removeItem('noFiled');
                this.setState({
                  rankContent:res,
                  current:Number(res.pagination.current)+1
                })
              }
            )
          }else{
            ajax.get(
              '/rest/grid/get/list',
              {
                // field:this.props.allDataMsg.title,
                manage:localStorage.getItem('manage'),
                pageSize:20,
                current:1,
                // order:'desc'
              },
              res=>{
                // console.log(res,'123456789');
                localStorage.removeItem('noFiled');
                this.setState({
                  rankContent:res,
                  current:Number(res.pagination.current)+1
                })
              }
            )
          }
        }else{
          if(this.state.noFiled){
            ajax.get(
              '/rest/grid/get/list',
              {
                // field:this.props.allDataMsg.title,
                manage:localStorage.getItem('manage'),
                pageSize:20,
                current:this.state.current,
                order:'desc'
              },
              res=>{
                // console.log(res,'123456789');
                this.setState({
                  rankContent:res,
                  current:Number(res.pagination.current)+1
                })
              }
            )
          }else{
            ajax.get(
              '/rest/grid/get/list',
              {
                // field:this.props.allDataMsg.title,
                manage:localStorage.getItem('manage'),
                pageSize:20,
                current:this.state.current,
                // order:'desc'
              },
              res=>{
                // console.log(res,'123456789');
                this.setState({
                  rankContent:res,
                  current:Number(res.pagination.current)+1
                })
              }
            )
          }
        }
      }



    }else if(localStorage.getItem('flagArea')=='行政区域'){
      // distName
      if(localStorage.getItem('zhibaio')=='zhibiao'){
        if(localStorage.getItem('orderFiled')){
          this.setState({
            orderFiled:!this.state.orderFiled
          })
          if(!this.state.orderFiled){
            ajax.get(
              '/rest/grid/get/list',
              {
                field:this.props.allDataMsg.title,
                distName:localStorage.getItem('manage'),
                pageSize:20,
                current:1,
                order:'desc'
              },
              res=>{
                console.log(res,'123456789');
                localStorage.removeItem('orderFiled');
                this.setState({
                  rankContent:res,
                  current:Number(res.pagination.current)+1
                })
              }
            )
          }else{
            ajax.get(
              '/rest/grid/get/list',
              {
                field:this.props.allDataMsg.title,
                distName:localStorage.getItem('manage'),
                pageSize:20,
                current:1,
                // order:'desc'
              },
              res=>{
                console.log(res,'123456789');
                localStorage.removeItem('orderFiled');
                this.setState({
                  rankContent:res,
                  current:Number(res.pagination.current)+1
                })
              }
            )
          }
        }else{
          if(this.state.orderFiled){
            ajax.get(
              '/rest/grid/get/list',
              {
                field:this.props.allDataMsg.title,
                distName:localStorage.getItem('manage'),
                pageSize:20,
                current:this.state.current,
                order:'desc'
              },
              res=>{
                console.log(res,'123456789');
                this.setState({
                  rankContent:res,
                  current:Number(res.pagination.current)+1
                })
              }
            )
          }else{
            ajax.get(
              '/rest/grid/get/list',
              {
                field:this.props.allDataMsg.title,
                distName:localStorage.getItem('manage'),
                pageSize:20,
                current:this.state.current,
                // order:'desc'
              },
              res=>{
                console.log(res,'123456789');
                this.setState({
                  rankContent:res,
                  current:Number(res.pagination.current)+1
                })
              }
            )
          }
        }
      }else{
        if(localStorage.getItem('noFiled')){
          this.setState({
            noFiled:!this.state.noFiled
          })
          if(!this.state.noFiled){
            ajax.get(
              '/rest/grid/get/list',
              {
                // field:this.props.allDataMsg.title,
                distName:localStorage.getItem('manage'),
                pageSize:20,
                current:1,
                order:'desc'
              },
              res=>{
                // console.log(res,'123456789');
                localStorage.removeItem('noFiled');
                this.setState({
                  rankContent:res,
                  current:Number(res.pagination.current)+1
                })
              }
            )
          }else{
            ajax.get(
              '/rest/grid/get/list',
              {
                // field:this.props.allDataMsg.title,
                distName:localStorage.getItem('manage'),
                pageSize:20,
                current:1,
                // order:'desc'
              },
              res=>{
                // console.log(res,'123456789');
                localStorage.removeItem('noFiled');
                this.setState({
                  rankContent:res,
                  current:Number(res.pagination.current)+1
                })
              }
            )
          }
        }else{
          if(this.state.noFiled){
            ajax.get(
              '/rest/grid/get/list',
              {
                // field:this.props.allDataMsg.title,
                distName:localStorage.getItem('manage'),
                pageSize:20,
                current:this.state.current,
                order:'desc'
              },
              res=>{
                // console.log(res,'123456789');
                this.setState({
                  rankContent:res,
                  current:Number(res.pagination.current)+1
                })
              }
            )
          }else{
            ajax.get(
              '/rest/grid/get/list',
              {
                // field:this.props.allDataMsg.title,
                distName:localStorage.getItem('manage'),
                pageSize:20,
                current:this.state.current,
                // order:'desc'
              },
              res=>{
                // console.log(res,'123456789');
                this.setState({
                  rankContent:res,
                  current:Number(res.pagination.current)+1
                })
              }
            )
          }
        }
      }
    }else{
      // console.log(this.props.allDataMsg.title,'this.props.allDataMsg.title')
      // manageArea
      if(localStorage.getItem('zhibaio')=='zhibiao'){
        if(localStorage.getItem('orderFiled')){
          this.setState({
            orderFiled:!this.state.orderFiled
          })
          if(!this.state.orderFiled){
            ajax.get(
              '/rest/grid/get/list',
              {
                field:this.props.allDataMsg.title,
                manageArea:localStorage.getItem('manage'),
                pageSize:20,
                current:1,
                order:'desc'
              },
              res=>{
                console.log(res,'1');
                localStorage.removeItem('orderFiled');
                this.setState({
                  rankContent:res,
                  current:Number(res.pagination.current)+1
                })
              }
            )
          }else{
            ajax.get(
              '/rest/grid/get/list',
              {
                field:this.props.allDataMsg.title,
                manageArea:localStorage.getItem('manage'),
                pageSize:20,
                current:1,
                // order:'desc'
              },
              res=>{
                console.log(res,'2');
                localStorage.removeItem('orderFiled');
                this.setState({
                  rankContent:res,
                  current:Number(res.pagination.current)+1
                })
              }
            )
          }
        } else{
          if(this.state.orderFiled){
            ajax.get(
              '/rest/grid/get/list',
              {
                field:this.props.allDataMsg.title,
                manageArea:localStorage.getItem('manage'),
                pageSize:20,
                current:this.state.current,
                order:'desc'
              },
              res=>{
                console.log(res,'3');
                this.setState({
                  rankContent:res,
                  current:Number(res.pagination.current)+1
                })
              }
            )
          }else{
            ajax.get(
              '/rest/grid/get/list',
              {
                field:this.props.allDataMsg.title,
                manageArea:localStorage.getItem('manage'),
                pageSize:20,
                current:this.state.current,
                // order:'desc'
              },
              res=>{
                console.log(res,'4');
                this.setState({
                  rankContent:res,
                  current:Number(res.pagination.current)+1
                })
              }
            )
          }
        }
      }else{
        if(localStorage.getItem('noFiled')){
          this.setState({
            noFiled:!this.state.noFiled
          })
          if(!this.state.noFiled){
            ajax.get(
              '/rest/grid/get/list',
              {
                // field:this.props.allDataMsg.title,
                manageArea:localStorage.getItem('manage'),
                pageSize:20,
                current:1,
                order:'desc'
              },
              res=>{
               console.log(res,'5')
                localStorage.removeItem('noFiled');
                this.setState({
                  rankContent:res,
                  current:Number(res.pagination.current)+1
                })
              }
            )
          }else{
            ajax.get(
              '/rest/grid/get/list',
              {
                // field:this.props.allDataMsg.title,
                manageArea:localStorage.getItem('manage'),
                pageSize:20,
                current:1,
                // order:'desc'
              },
              res=>{
                console.log(res,'6')
                localStorage.removeItem('noFiled');
                this.setState({
                  rankContent:res,
                  current:Number(res.pagination.current)+1
                })
              }
            )
          }
        }else{
          if(this.state.noFiled){
            ajax.get(
              '/rest/grid/get/list',
              {
                // field:this.props.allDataMsg.title,
                manageArea:localStorage.getItem('manage'),
                pageSize:20,
                current:this.state.current,
                order:'desc'
              },
              res=>{
                console.log(res,'7')
                this.setState({
                  rankContent:res,
                  current:Number(res.pagination.current)+1
                })
              }
            )
          }else{
            ajax.get(
              '/rest/grid/get/list',
              {
                // field:this.props.allDataMsg.title,
                manageArea:localStorage.getItem('manage'),
                pageSize:20,
                current:this.state.current,
                // order:'desc'
              },
              res=>{
                console.log(res,'8')
                this.setState({
                  rankContent:res,
                  current:Number(res.pagination.current)+1
                })
              }
            )
          }
        }
      }
    }
  }

  //指标排序
  orderFiled(){
    localStorage.setItem('orderFiled','orderFiled');
    //区分指标与指数
    localStorage.setItem('zhibaio','zhibiao')
    this.componentWillMount();
  }

  //指数排序
  noFiled(){

    localStorage.setItem('noFiled','noFiled');
    //区分指标与指数
    localStorage.setItem('zhibaio','zhishu');
    this.componentWillMount();
  }
  render() {
    return (
      <div className={style.part3Container} style={{width:this.state.leftWidth}}>
        <Tabs onChange={callback} type="card">
          <TabPane tab={this.props.allDataMsg.title+"指标"} key="1">
            <div>
              <div className={style.detailWrap}>
                <div className={style.sumtitle}>风险监控指标值</div>
                <div className={style.everyNum}>
                  {/*  每一项数字*/}
                  <div className={style.everyNumWrap}>
                    {this.props.allDataMsg.title=='管线健康'?
                      <div className={style.numberBiaoSelect}>{((Number(this.props.allDetailsMsg.pipeHethRisk))/0.2).toFixed(2)}</div>:
                      <div className={style.numberBiao}>{((Number(this.props.allDetailsMsg.pipeHethRisk))/0.2).toFixed(2)}</div>
                    }
                    <div className={style.numberTitle}>管线健康</div>
                  </div>
                  <div className={style.everyNumWrap} >
                    {this.props.allDataMsg.title=='事件密集度'?
                      <div className={style.numberBiaoSelect}>{(Number(this.props.allDetailsMsg.eventExp)/0.3).toFixed(2)}</div>:
                      <div className={style.numberBiao}>{(Number(this.props.allDetailsMsg.eventExp)/0.3).toFixed(2)}</div>
                    }
                    <div className={style.numberTitle}>事件密集度</div>
                  </div>
                  {/*  每一项数字*/}
                  <div className={style.everyNumWrap}>
                    {this.props.allDataMsg.title=='管线周边环境'?
                      <div className={style.numberBiaoSelect}>{(Number(this.props.allDetailsMsg.envirExp)/0.15).toFixed(2)}</div>:
                      <div className={style.numberBiao}>{(Number(this.props.allDetailsMsg.envirExp)/0.15).toFixed(2)}</div>
                    }
                    <div className={style.numberTitle}>管线周边环境</div>
                  </div>
                  {/*  每一项数字*/}
                  <div className={style.everyNumWrap}>
                    {this.props.allDataMsg.title=='安全隐患'?
                      <div className={style.numberBiaoSelect}>{(Number(this.props.allDetailsMsg.hiddenExp)/0.3).toFixed(2)}</div>:
                      <div className={style.numberBiao}>{(Number(this.props.allDetailsMsg.hiddenExp)/0.3).toFixed(2)}</div>
                    }
                    <div className={style.numberTitle}>安全隐患</div>
                  </div>
                  {/*  每一项数字*/}
                  <div className={style.everyNumWrap}>
                    {this.props.allDataMsg.title=='自然灾害'?
                    <div className={style.numberBiaoSelect}>{(Number(this.props.allDetailsMsg.naturalExp)/0.05).toFixed(2)}</div>:
                      <div className={style.numberBiao}>{(Number(this.props.allDetailsMsg.naturalExp)/0.05).toFixed(2)}</div>
                    }
                    <div className={style.numberTitle}>自然灾害</div>
                  </div>
                  {/*  每一项数字*/}
                  <div className={style.everyNumWrap}>
                    {this.props.allDataMsg.title=='建筑本体'?
                      <div className={style.numberBiaoSelect}>{(Number(this.props.allDetailsMsg.buildSelfExp)/0.25).toFixed(2)}</div>:
                      <div className={style.numberBiao}>{(Number(this.props.allDetailsMsg.buildSelfExp)/0.25).toFixed(2)}</div>
                    }
                    <div className={style.numberTitle}>建筑本体</div>
                  </div>
                  {/*  每一项数字*/}
                  <div className={style.everyNumWrap}>
                    {this.props.allDataMsg.title=='建筑物密集度'?
                      <div className={style.numberBiaoSelect}>{(Number(this.props.allDetailsMsg.buildExp)/0.25).toFixed(2)}</div>:
                      <div className={style.numberBiao}>{(Number(this.props.allDetailsMsg.buildExp)/0.25).toFixed(2)}</div>
                    }
                    <div className={style.numberTitle}>建筑物密集度</div>
                  </div>
                  {/*  每一项数字*/}
                  <div className={style.everyNumWrap}>
                    {this.props.allDataMsg.title=='市政基础设施'?
                      <div className={style.numberBiaoSelect}>{(Number(this.props.allDetailsMsg.municipalExp)/0.1).toFixed(2)}</div>:
                      <div className={style.numberBiao}>{(Number(this.props.allDetailsMsg.municipalExp)/0.1).toFixed(2)}</div>
                    }
                    <div className={style.numberTitle}>市政基础设施</div>
                  </div>
                  {/*  每一项数字*/}
                  <div className={style.everyNumWrap}>
                    {this.props.allDataMsg.title=='人口密集度'?
                      <div className={style.numberBiaoSelect}>{(Number(this.props.allDetailsMsg.popuExp)/0.3).toFixed(2)}</div>:
                      <div className={style.numberBiao}>{(Number(this.props.allDetailsMsg.popuExp)/0.3).toFixed(2)}</div>
                    }
                    <div className={style.numberTitle}>人口密集度</div>
                  </div>
                  {/*  每一项数字*/}
                  <div className={style.everyNumWrap}>
                    {this.props.allDataMsg.title=='重点区域'?
                      <div className={style.numberBiaoSelect}>{(Number(this.props.allDetailsMsg.keyAreaExp)/0.1).toFixed(2)}</div>:
                      <div className={style.numberBiao}>{(Number(this.props.allDetailsMsg.keyAreaExp)/0.1).toFixed(2)}</div>
                    }
                    <div className={style.numberTitle}>重点区域</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.oneWrap}>
              <div className={style.title}>{this.props.allDataMsg.title}指标占比</div>
              <div>
                <ProportionChar titleNum={this.props.allDataMsg.titleNum} title={this.props.allDataMsg.title}  totalNum={this.props.allDataMsg.totalNum} count="13"/>
              </div>
            </div>
            <div className={style.oneWrap}>
              <div className={style.title} >{this.props.allDataMsg.title}指标分布箱线图</div>
              <div>
                <Boxplot title={this.props.allDataMsg.title} count="7"/>
              </div>
            </div>
          </TabPane>
          <TabPane tab={this.props.allDataMsg.title+"排名"} key="2">
            {/*标题*/}
            <div className={style.itemTitle}>
              <div className={style.title}>排名</div>
              <div className={style.title}>网格编码
              </div>
              <div onClick={this.orderFiled.bind(this)} className={style.title}>指标
                {this.state.orderFiled?
                  <span><img src={Paixu1} alt="排序"/></span>:
                  <span><img src={Paixu2} alt="排序"/></span>
                }
              </div>
              <div onClick={this.noFiled.bind(this)} className={style.title}>风险评价
                {this.state.noFiled?
                  <span><img src={Paixu1} alt="排序"/></span>:
                  <span><img src={Paixu2} alt="排序"/></span>
                }
              </div>
            </div>
            {/*  内容*/}
            <div className={style.detailsContent}>
              {this.state.rankContent&&this.state.rankContent.data.map((item,index)=>
                <div className={style.everyContent} key={index} onClick={this.clickGrid.bind(this,item.gridNum)}>
                  {this.state.rankContent.pagination.current==1?
                    <div className={style.item}>{index+1}</div>:
                    <div className={style.item}>{index+1+(Number(this.state.rankContent.pagination.current)-1)*20}</div>
                  }
                  <div className={style.item}  >{item.gridNum}</div>

                  {this.props.allDataMsg.title=='管线健康'?
                    <div className={style.item}>{((Number(item.pipeHethRisk))/0.2).toFixed(2)}</div>:
                   null
                  }
                  {this.props.allDataMsg.title=='事件密集度'?
                    <div className={style.item}>{(Number(item.eventExp)/0.3).toFixed(2)}</div>:
                    null
                  }
                  {this.props.allDataMsg.title=='管线周边环境'?
                    <div className={style.item}>{(Number(item.envirExp)/0.15).toFixed(2)}</div>:
                    null
                  }
                  {this.props.allDataMsg.title=='安全隐患'?
                    <div className={style.item}>{(Number(item.hiddenExp)/0.3).toFixed(2)}</div>:
                    null
                  }
                  {this.props.allDataMsg.title=='自然灾害'?
                    <div className={style.item}>{(Number(item.naturalExp)/0.05).toFixed(2)}</div>:
                    null
                  }
                  {this.props.allDataMsg.title=='建筑本体'?
                    <div className={style.item}>{(Number(item.buildSelfExp)/0.25).toFixed(2)}</div>:
                    null
                  }
                  {this.props.allDataMsg.title=='建筑物密集度'?
                    <div className={style.item}>{(Number(item.buildExp)/0.25).toFixed(2)}</div>:
                    null
                  }
                  {this.props.allDataMsg.title=='市政基础设施'?
                    <div className={style.item}>{(Number(item.municipalExp)/0.1).toFixed(2)}</div>:
                    null
                  }
                  {this.props.allDataMsg.title=='人口密集度'?
                    <div className={style.item}>{(Number(item.popuExp)/0.3).toFixed(2)}</div>:
                    null
                  }
                  {this.props.allDataMsg.title=='重点区域'?
                    <div className={style.item}>{(Number(item.keyAreaExp)/0.1).toFixed(2)}</div>:
                    null
                  }

                  {item.level=='notSafe'?
                    <div className={style.itemGrade1}>{Number(item.compoExp).toFixed(2)}</div>:
                    null
                  }
                  {item.level=='lessSafe'?
                    <div className={style.itemGrade2}>{Number(item.compoExp).toFixed(2)}</div>:
                    null
                  }
                  {item.level=='safe'?
                    <div className={style.itemGrade3}>{Number(item.compoExp).toFixed(2)}</div>:
                    null
                  }
                  {item.level=='vsafe'?
                    <div className={style.itemGrade4}>{Number(item.compoExp).toFixed(2)}</div>:
                    null
                  }
                  {/*<div className={style.item}>{item.compoExp}</div>*/}
                </div>
              )}
            </div>
            {/*  底部分页*/}
            <div className={style.paging}>
              {/*<div className={style.nextPage} onClick={this.lastPageMsg.bind(this)}>上一页</div>*/}
              {this.state.rankContent.pagination?<div>第{this.state.rankContent.pagination.current}页 共{Math.ceil(this.state.rankContent.pagination.total/this.state.rankContent.pagination.pageSize)}页</div>:null}
              <div className={style.nextPage} onClick={this.getPageMsg.bind(this)}>下一页</div>
            </div>
          </TabPane>
        </Tabs>
        <div className={style.leftTitle} onClick={this.isShow.bind(this)}>图表</div>
      </div>
    );
  }
}

export default Leftpart3;
