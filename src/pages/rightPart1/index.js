import React from 'react'
import style from './style.less'
import * as ajax from '../../framework/tools/ajax/index'
import fork from '../../assets/detail/fork.svg'
import { getItem } from 'umi/src/runtimePlugin';






class Rightpart1 extends React.Component{
  constructor() {
    super();
    this.state={
      allDatas:'',
      safetyDex:'',
      isShow:true,
      rightWidth:425,
      btnRight:385,
      units:'',
      measures:"",
      // 阈值的状态
      yuzhi:false
    }
  }
  //初次渲染页面的请求

  componentDidMount() {

    if(localStorage.getItem('gridNum')){
      //单网格
      //监管综合指数
      if(localStorage.getItem('qufen')=='xiaoqu'){
        ajax.get(
          '/rest/decis/get/multi/info',
          {
            villageName:localStorage.getItem('gridNum')
          },
          res=>{
            console.log(res,'右侧的信息123456789');
            if(res.status==0){
              this.setState({
                allDatas:res.data.data,
              })
            }else{
              console.log('请重试')
            }
          }
        )
        ajax.get(
          '/rest/grid/suggest/get/grid/list',
          {
            keyword:localStorage.getItem('gridNum')
          },
          res=>{
            console.log(res,'多网格监管措施');
            if(res.status==0){
              if(res.data.data.length==0){
                // this.setState({
                //   measures:'暂无'
                // })
              }else{
                this.setState({
                  measures:res.data.data
                })
              }
            }else{
              this.setState({
                measures:'暂无'
              })
            }
          }
        )
      }else{
        ajax.get(
          '/rest/decis/get/multi/info',
          {
            nums:Number(localStorage.getItem('gridNum'))
          },
          res=>{
            console.log(res,'右侧的信息123456789');
            if(res.status==0){
              this.setState({
                allDatas:res.data.data,
                units:res.data.units
              })
            }else{
              console.log('请重试')
            }
          }
        )
      //  单网格的监管措施
        ajax.get(
          '/rest/grid/suggest/get/suggest',
          {
            gridNum:Number(localStorage.getItem('gridNum'))
          },
          res=>{
            console.log(res,'单网格的监管措施');
            if(res.status==0){
              if(res.data.data.length==0){
                // this.setState({
                //   measures:'暂无'
                // })
              }else{
                this.setState({
                  measures:res.data.data
                })
              }

            }else{
              this.setState({
                measures:'暂无'
              })
            }
          }
        )
      }

    }else{
      //多网格
      //监管措施
      ajax.get(
        '/rest/grid/suggest/get/grid/list',
        {
          keyword:localStorage.getItem('manage')
        },
        res=>{
          console.log('localStorage.getItem(\'manage\')',localStorage.getItem('manage'));
          console.log(res,'多网格监管措施');
          if(res.status==0){
            if(res.data.data.length==0){
              // this.setState({
              //   measures:'暂无'
              // })
            }else{
              this.setState({
                measures:res.data.data
              })
            }
            console.log('我要看的数据',this.state.measures)
          }else{
            this.setState({
              measures:'暂无'
            })
          }
        }
      )
      //监管综合指数
      if(localStorage.getItem('flagArea')=='管理单位'){
        ajax.get(
          '/rest/decis/get/multi/info',
          {
            manage:localStorage.getItem('manage')
          },
          res=>{
            if(res.status==0){
              this.setState({
                allDatas:res.data.data
              })
              console.log(res.data,'多网格总格123456')

            }else{

            }
          }
        )
      }else if(localStorage.getItem('flagArea')=='行政区域'){
        ajax.get(
          '/rest/decis/get/multi/info',
          {
            distName:localStorage.getItem('manage')
          },
          res=>{
            if(res.status==0){
              this.setState({
                allDatas:res.data.data
              })
              // console.log(res.data,'多网格总格123456')

            }else{

            }
          }
        )
      }else{
        ajax.get(
          '/rest/decis/get/multi/info',
          {
            manageArea:localStorage.getItem('manage')
          },
          res=>{
            if(res.status==0){
                this.setState({
                  allDatas:res.data.data
                })
              // console.log(res.data,'多网格总格123456')

            }else{

            }
          }

        )
      }

    }


  }

  //右侧点击动画
  isShow(e){
    this.setState({
      isShow:!this.state.isShow
    })
    if(this.state.isShow){
      this.setState({
        btnRight:16,
        rightWidth:0
      })
    }else{
      this.setState({
        btnRight:385,
        rightWidth:425
      })
    }
  }

  // 取消阈值
  closeYuzhi(){
 this.setState({
      yuzhi:false
    })
  }
  // 打开阈值
  openNum(){
    this.setState({
      yuzhi:true
    })
  }
  render(){
    let ColorNum;
    if(this.state.allDatas.level=='notSafe'){
      ColorNum=( <div className={style.numCount1} title="低风险：[0,5.61)&#10;一般风险：[5.61,8.03)&#10;较大风险：[8.03,12.12)&#10;重大风险：[12.12,30.87]">重大风险<span>{Number(this.state.allDatas.compoExp).toFixed(2)}</span></div>)
    }else if(this.state.allDatas.level=='lessSafe'){
      ColorNum=( <div className={style.numCount2} title="低风险：[0,5.61)&#10;一般风险：[5.61,8.03)&#10;较大风险：[8.03,12.12)&#10;重大风险：[12.12,30.87]">较大风险<span>{Number(this.state.allDatas.compoExp).toFixed(2)}</span></div>)
    }else if(this.state.allDatas.level=='safe'){
      ColorNum=( <div className={style.numCount3} title="低风险：[0,5.61)&#10;一般风险：[5.61,8.03)&#10;较大风险：[8.03,12.12)&#10;重大风险：[12.12,30.87]">一般风险<span>{Number(this.state.allDatas.compoExp).toFixed(2)}</span></div>)
    }else{
      ColorNum=( <div className={style.numCount4} title="低风险：[0,5.61)&#10;一般风险：[5.61,8.03)&#10;较大风险：[8.03,12.12)&#10;重大风险：[12.12,30.87]">低风险<span>{Number(this.state.allDatas.compoExp).toFixed(2)}</span></div>)
    }
    // console.log(this.state.allDatas.level,'多网格总格123456');
    return(
      <div className={style.rightContainer} style={{width:this.state.rightWidth}}>
        {/*内容部分*/}
        <div className={style.contentWrap}>
          {/*  第一部分*/}
          <div className={style.onepart}>
            <div className={style.oneTitle}>风险评价<div onClick={this.openNum.bind(this)} className={style.lookDetails}>查看详情</div></div>
            {ColorNum}
            <div className={style.everyTitle}>
              <div className={style.titlename}>风险可能性：</div>
              <div className={style.contentCode} title="低：[3.2,16.5)&#10;一般：[16.5,24.4)&#10;较大：[24.4,35.2)&#10;重大：[35.2,62.7]">{Number(this.state.allDatas.possib).toFixed(2)}</div>
            </div>
            <div className={style.everyTitle}>
              <div className={style.titlename}>后果严重性：</div>
              <div className={style.contentCode} title="低：[3.2,43.9)&#10;一般：[43.9,47.6)&#10;较大：[47.6,52.9)&#10;重大：[52.9,74.63]">{Number(this.state.allDatas.conseq).toFixed(2)}</div>
            </div>

            {localStorage.getItem('gridNum') ?
              <div>
                {localStorage.getItem('qufen')=='xiaoqu'?
                  <div className={style.everyTitle}>
                    <div className={style.titlename}>小区：</div>
                    <div className={style.contentCode}>{localStorage.getItem('gridNum')}</div>
                  </div>:
                  <div className={style.everyTitle}>
                    <div className={style.titlename}>网格编码：</div>
                    <div className={style.contentCode}>{localStorage.getItem('gridNum')}</div>
                  </div>
                }
              </div>
              :
              <div className={style.everyTitle}>
                {localStorage.getItem('manage')=='城市副中心核心区'?
                  <div className={style.titlename}>示范区：</div>:
                  <div className={style.titlename}>{localStorage.getItem('flagArea')}：</div>
                }

                <div className={style.contentCode}>{localStorage.getItem('manage')}</div>
              </div>
            }
          </div>
          {/*第二部分*/}
          <div className={style.twopart}>
            {localStorage.getItem('gridNum')?
              <div>
                {localStorage.getItem('qufen')=='xiaoqu'?
                  <div className={style.safeAgustWrap}>
                    {this.state.measures&&this.state.measures.map((item,index)=>
                      <div className={style.safeWrap} key={index}>
                        <div className={style.addviceTitle}>建议{index+1}：</div>
                        <div className={style.addviceDe}>{item.content}</div>
                      </div>
                    )}
                  </div>:
                  <div>
                    {this.state.allDatas.level=='vsafe'?
                      <div className={style.safeWrap}>
                        <div className={style.addviceTitle}>建议1：</div>
                        <div className={style.addviceDe}>按生产运行计划执行日常运行工作</div>
                      </div>:
                      <div>
                        {localStorage.getItem('gridNum')==1078?
                          <div className={style.safeAgustWrap}>
                            <div className={style.safeWrap}>
                              <div className={style.addviceTitle}>建议1：</div>
                              <div className={style.addviceDe}>在允许实施的条件下及时修复防腐层破损点，并加装燃气管道腐蚀控制装置</div>
                            </div>
                            <div className={style.safeWrap}>
                              <div className={style.addviceTitle}>建议2：</div>
                              <div className={style.addviceDe}>加密运行频次，由一周两次提高至一周四次，有针对性地加强燃气管道泄漏检测</div>
                            </div>
                            <div className={style.safeWrap}>
                              <div className={style.addviceTitle}>建议3：</div>
                              <div className={style.addviceDe}>与属地政府、街道、社区及商场建立沟通联络机制，政企联合开展周边商户、居民安全宣传教育活</div>
                            </div>
                            <div className={style.safeWrap}>
                              <div className={style.addviceTitle}>建议4：</div>
                              <div className={style.addviceDe}>结合现场环境实际情况重新评估应急处置方案，有针对性地优化应急处置方案，并开展应急演练</div>
                            </div>
                            <div className={style.safeWrap}>
                              <div className={style.addviceTitle}>建议5：</div>
                              <div className={style.addviceDe}>与属地政府、街道、社区及商场建立应急处突联络机制，遇突发情况时能快速组织人员疏散和撤离</div>
                            </div>
                          </div>
                          :
                          <div className={style.safeAgustWrap}>
                            {this.state.measures&&this.state.measures.map((item,index)=>
                              <div className={style.safeWrap} key={index}>
                                <div className={style.addviceTitle}>建议{index+1}：</div>
                                <div className={style.addviceDe}>{item.content}</div>
                              </div>
                            )}
                          </div>
                        }
                      </div>
                    }
                  </div>
                }
              </div>
              :
              <div>
                {localStorage.getItem('flagArea')=='管理单位'?
               null:
                    <div className={style.safeAgustWrap}>

                    {this.state.measures.length&&this.state.measures.map((item,index)=>
                      <div className={style.safeWrap} key={index}>
                        <div className={style.addviceTitle}>建议{index+1}：</div>
                        <div className={style.addviceDe}>{item.content}</div>
                      </div>
                    )}
                  </div>
                }
              </div>
              // <div>多网格</div>
            }

          </div>
        </div>
        {/*  阈值的详情页面*/}
        {this.state.yuzhi?
         <div className={style.yuzhiContainer}> 
         <div className={style.content}>
           <img src={fork} onClick={this.closeYuzhi.bind(this, '关闭')} style={{ width: 12, cursor: "pointer" }} alt="关闭" />
           <div className={style.rangeWrap}>
             <div className={style.title}>
               <div style={{borderRight:'1px solid',width:'65%'}}>所有指标</div>
               <div style={{width:'35%'}}>参考范围</div>
             </div>
             <div className={style.itemWrap}>
               <div className={style.itemTitle} style={{width:'65%'}}>
                 <div style={{width:'50%',borderRight:'1px solid',lineHeight:'111px'}}>
                   <div>风险评价</div>
                 </div>
                 <div style={{width:'50%',borderRight:'1px solid'}}>
                   <div style={{borderBottom:'1px solid',padding: 1}}>低风险</div>
                   <div style={{borderBottom:'1px solid',padding: 1}}>一般风险</div>
                   <div style={{borderBottom:'1px solid',padding: 1}}>较高风险</div>
                   <div style={{padding:1}}>高风险</div>
                 </div>
               </div>
               <div style={{width:'35%'}}>
                 <div style={{borderBottom:'1px solid',padding: 1}}>0~5.61</div>
                 <div style={{borderBottom:'1px solid',padding: 1}}>5.61~8.03</div>
                 <div style={{borderBottom:'1px solid',padding: 1}}>8.03~12.12</div>
                 <div style={{padding:1}}>12.12~30.87</div>
               </div>
             </div>
             <div className={style.itemWrap}>
               <div className={style.itemTitle} style={{width:'65%'}}>
                 <div style={{width:'50%',borderRight:'1px solid',lineHeight:'111px'}}>
                   <div>风险可能性</div>
                 </div>
                 <div style={{width:'50%',borderRight:'1px solid'}}>
                   <div style={{borderBottom:'1px solid',padding: 1}}>低风险</div>
                   <div style={{borderBottom:'1px solid',padding: 1}}>一般风险</div>
                   <div style={{borderBottom:'1px solid',padding: 1}}>较大风险</div>
                   <div style={{padding:1}}>重大风险</div>
                 </div>
               </div>
               <div style={{width:'35%'}}>
                 <div style={{borderBottom:'1px solid',padding: 1}}>3.2~16.5</div>
                 <div style={{borderBottom:'1px solid',padding: 1}}>16.5~22.4</div>
                 <div style={{borderBottom:'1px solid',padding: 1}}>22.4~~35.2</div>
                 <div style={{padding:1}}>35.2~62.7</div>
               </div>
             </div>
             <div className={style.itemWrapT} >
               <div className={style.itemTitle} style={{width:'65%'}}>
                 <div style={{width:'50%',borderRight:'1px solid',lineHeight:'111px'}}>
                   <div>后果严重性</div>
                 </div>
                 <div style={{width:'50%',borderRight:'1px solid'}}>
                   <div style={{borderBottom:'1px solid',padding: 1}}>低风险</div>
                   <div style={{borderBottom:'1px solid',padding: 1}}>一般风险</div>
                   <div style={{borderBottom:'1px solid',padding: 1}}>较大风险</div>
                   <div style={{padding:1}}>重大风险</div>
                 </div>
               </div>
               <div style={{width:'35%'}}>
                 <div style={{borderBottom:'1px solid',padding: 1}}>3.2~43.9</div>
                 <div style={{borderBottom:'1px solid',padding: 1}}>43.9~47.6</div>
                 <div style={{borderBottom:'1px solid',padding: 1}}>47.6~52.9</div>
                 <div style={{padding:1}}>12.12~30.87</div>
               </div>
             </div>
           </div>
         </div>
       </div>
        :
        null
        }
        
      {/* 头部*/}
      <div className={style.rightTitle} onClick={this.isShow.bind(this)} style={{right:this.state.btnRight}}>信息</div>
      </div>
    )
  }
}

export default Rightpart1
