import React from 'react';
import style from './style.less';
import * as ajax from '../../framework/tools/ajax/index';
import { get } from '../../framework/tools/ajax/index';
import { getItem } from 'umi/src/runtimePlugin';
import router from 'umi/router';
import fork from '../../assets/detail/fork.svg'
//获取数组的最大最小值
Array.prototype.max = function() {
  return Math.max.apply({}, this);
};
Array.prototype.min = function() {
  return Math.min.apply({}, this);
};

class Rightpart2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pipeTyle: '',
      yaerlength: '',
      maxYear: '',
      minYear: '',
      allDatas: '',
      isShow: true,
      rightWidth: 425,
      btnRight: 385,
      units: '',
      measures:"",
      pipelength:'',
      buildSelf:'',
      buildDesity:'',
      peopleNum:'',
      goverment:'',
      piprSurround:'',
      isSafe:'',
      importPart:"",
      natural:"",
      eventDen:"",
      protectNum:'',
      pointNum:'',
       // 阈值的状态
      yuzhi:false
    };
  }

  componentDidMount() {
    //监管综合指数
    if (localStorage.getItem('gridNum')) {
      if (localStorage.getItem('qufen') == 'xiaoqu') {
        ajax.get(
          '/rest/decis/get/multi/info',
          {
            villageName: localStorage.getItem('gridNum'),
          },
          res => {
            console.log(res, '多网格综合各项风险指数');
            if (res.status == 0) {
              this.setState({
                allDatas: res.data.data,
              });

            } else {

            }
          },
        );
        ajax.get(
          '/rest/grid/suggest/get/grid/list',
          {
            keyword:localStorage.getItem('gridNum')
          },
          res=>{
            console.log(res,'多网格监管措施');
            if(res.status==0){
              if(res.data.data.length==0){
                this.setState({
                  measures:'暂无'
                })
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
      } else {
        if(this.props.title=='管线健康'){
//请求管线属性（单网格有的，多网格没有）
          ajax.get(
            '/rest/pipe/pro/get/pipe/info',
            {
              num: Number(localStorage.getItem('gridNum')),
            },
            res => {
              console.log(res, '管线属性的信息');
              if (res.status == 0) {
                this.setState({
                  pipelength:res.data.length.toFixed(2),
                  pipeTyle: res.data,
                  // yaerlength: res.data.yearList,
                  // maxYear: res.data.yearList.max(),
                  // minYear: res.data.yearList.min(),
                });
              } else {

              }
            },
          );
          //管龄
          ajax.get(
            '/rest/grid/score/4th/get/age/pipe',
            {
              nums: Number(localStorage.getItem('gridNum')),
            },
            res=>{
              this.setState({
                maxYear: res.data.data[0],
              })
              console.log(res.data.data[0],'nums');
            }
          )
        //  获取阴保和破损点的数量
          ajax.get(
            '/rest/corros/cathod/prot/get/points',
            {
              num: Number(localStorage.getItem('gridNum')),
            },
            res=>{
              this.setState({
                protectNum:res.data.data.length
              })
            }
          )
          ajax.get(
            '/rest/coat/get/point',
            {
              num: Number(localStorage.getItem('gridNum')),
            },
            res=>{
              this.setState({
                pointNum:res.data.data.length
              })
            }
          )
        }else if(this.props.title=='事件密集度'){
          ajax.get(
            '/rest/event/etch/element/info',
            {
              num: Number(localStorage.getItem('gridNum')),
            },
            res=>{
              console.log('事件密集度',res);
              this.setState({
                eventDen:res.data
              })
            }
          )

        }else if(this.props.title=='管线周边环境'){
          ajax.get(
            '/rest/facility/element/info',
            {
              num: Number(localStorage.getItem('gridNum')),
            },
            res=>{
              console.log('管线周边环境',res);
              this.setState({
                piprSurround:res.data
              })
            }
          )

        }else if(this.props.title=='安全隐患'){
          ajax.get(
            '/rest/event/hazard/element/info',
            {
              num:Number(localStorage.getItem('gridNum')),
            },
            res=>{
              console.log('安全隐患',res);
              this.setState({
                isSafe:res.data.data
              })
            }
          )

        }else if(this.props.title=='自然灾害'){
          ajax.get(
            '/rest/natural/hazard/element/info',
            {
              num:Number(localStorage.getItem('gridNum')),
            },
            res=>{
              console.log('自然灾害',res);
              this.setState({
                natural:res.data.data
              })
            }

          )

        }else if(this.props.title=='建筑本体'){
          ajax.get(
            '/rest/cell/element/info',
            {
              num:Number(localStorage.getItem('gridNum')),
            },
            res=>{
              console.log(res,'建筑本体');
              this.setState({
                buildSelf:res.data
              })

            }
          )
        }else if(this.props.title=='建筑物密集度'){
          ajax.get(
            '/rest/build/area/element/info',
            {
              num:Number(localStorage.getItem('gridNum')),
            },
            res=>{
              console.log(res,'建筑物密集度');
              this.setState({
                buildDesity:res.data.data
              })
            }
          )

        }else if(this.props.title=='市政基础设施'){
          ajax.get(
            '/rest/base/infra/element/info',
            {
              num:Number(localStorage.getItem('gridNum')),
            },
            res=>{
              console.log(res,'市政基础设施');
              this.setState({
                goverment:res.data.data
              })
            }
          )

        }else if(this.props.title=='人口密集度'){
          ajax.get(
            '/rest/dxc/flow/element/info',
            {
              num:Number(localStorage.getItem('gridNum')),
            },
            res=>{
              console.log(res,'人口密度');
              this.setState({
                peopleNum:res.data
              })
            }
          )

        }else if(this.props.title=='重点区域'){
          ajax.get(
            '/rest/build/key/element/info',
            {
              num:Number(localStorage.getItem('gridNum')),
            },
            res=>{
              console.log('重点区域',res);
              this.setState({
                importPart:res.data.data
              })
            }
          )
        }

        //  单网格
        ajax.get(
          '/rest/decis/get/multi/info',
          {
            nums: Number(localStorage.getItem('gridNum')),
          },
          res => {
            console.log(res, '右侧的信息2');
            if (res.status == 0) {
              this.setState({
                allDatas: res.data.data,
                units: res.data.units,
              });
            } else {
              console.log('请重试');
            }
          },
        );
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
                this.setState({
                  measures:'暂无'
                })
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
    } else {
      //  多网格
      //多网格监管措施
      ajax.get(
        '/rest/grid/suggest/get/grid/list',
        {
          keyword:localStorage.getItem('manage')
        },
        res=>{
          console.log(res,'多网格监管措施');
          if(res.status==0){
            if(res.data.data.length==0){
              this.setState({
                measures:'暂无'
              })
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
      if (localStorage.getItem('flagArea') == '管理单位') {
        ajax.get(
          '/rest/decis/get/multi/info',
          {
            manage: localStorage.getItem('manage'),
          },
          res => {
            console.log(res, '多网格综合各项风险指数');
            if (res.status == 0) {
              this.setState({
                allDatas: res.data.data,
              });

            } else {

            }
          },
        );
      } else if (localStorage.getItem('flagArea') == '行政区域') {
        ajax.get(
          '/rest/decis/get/multi/info',
          {
            distName: localStorage.getItem('manage'),
          },
          res => {
            console.log(res, '多网格综合各项风险指数');
            if (res.status == 0) {
              this.setState({
                allDatas: res.data.data,
              });

            } else {

            }
          },
        );
      } else {
        ajax.get(
          '/rest/decis/get/multi/info',
          {
            manageArea: localStorage.getItem('manage'),
          },
          res => {
            console.log(res, '多网格综合各项风险指数');
            if (res.status == 0) {
              this.setState({
                allDatas: res.data.data,
              });

            } else {

            }
          },
        );
      }

    }


  }


  //右侧点击动画
  isShow(e) {
    this.setState({
      isShow: !this.state.isShow,
    });
    if (this.state.isShow) {
      this.setState({
        btnRight: 16,
        rightWidth: 0,
      });
    } else {
      this.setState({
        btnRight: 385,
        rightWidth: 425,
      });
    }
  }

  //返回上一个页面
  returnBack() {
    router.goBack();
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


  render() {
    let IsXiaoqu, ColorNum;
    if (localStorage.getItem('qufen') == 'xiaoqu') {
      if(localStorage.getItem('gridNum')=='三里河一区'){
        if(this.props.title=='管线健康'){
          IsXiaoqu = (
            <div>
              <div className={style.twoTitle}>管线健康指标数据</div>
              <div className={style.safeAgustWrap}>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>管线长度：</div>
                  <div className={style.addviceDe}>2096.49m</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>管龄：</div>
                  <div>
                    <div className={style.addviceDe}>
                      1980年之前：542条
                    </div>
                    <div className={style.addviceDe}>
                      1980年~1990年：181条
                    </div>
                    <div className={style.addviceDe}>
                      1990年~2000年：401条
                    </div>
                    <div className={style.addviceDe}>
                      2000年~2010年：10条
                    </div>
                    <div className={style.addviceDe}>
                      2010年~2020年：0条
                    </div>
                  </div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>压力级制：</div>
                  <div className={style.addviceDe}>低压、中压 </div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>管径：</div>
                  <div className={style.addviceDe}>200mm,
                    DN50,
                    DN150,
                    DN300,
                    DN100,
                    DN80,
                    DN160,
                    DN65,
                    DN500</div>
                </div>
              </div>
            </div>
          );
        }else if(this.props.title=='事件密集度'){
          IsXiaoqu = (
            <div>
              <div className={style.twoTitle}>事件密集度指标数据</div>
              <div className={style.safeAgustWrap}>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>泄漏事件：</div>
                  <div className={style.addviceDe}>4</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>外管线第三方破坏事件：</div>
                  <div className={style.addviceDe}>0</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>设备设施故障类事件：</div>
                  <div className={style.addviceDe}>0</div>
                </div>
              </div>
            </div>
          );
        }else if(this.props.title=='管线周边环境'){
          IsXiaoqu = (
            <div>
              <div className={style.twoTitle}>管线周边环境安全指标数据</div>
              <div className={style.safeAgustWrap}>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>土壤电阻率：</div>
                  <div className={style.addviceDe}>0Ω·m</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>充电桩数量：</div>
                  <div className={style.addviceDe}>0</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>地铁与管线交点：</div>
                  <div className={style.addviceDe}>0</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>铁路与管线交点：</div>
                  <div className={style.addviceDe}>0</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>无轨电车与管线交点：</div>
                  <div className={style.addviceDe}>4</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>地铁长度：</div>
                  <div className={style.addviceDe}>0.00m</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>铁路长度：</div>
                  <div className={style.addviceDe}>642.11m</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>无轨电车长度：</div>
                  <div className={style.addviceDe}>642.11m</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>第三方施工：</div>
                  <div className={style.addviceDe}>0</div>
                </div>
              </div>
            </div>
          );

        }else if(this.props.title=='安全隐患'){
          IsXiaoqu = (
            <div>
              <div className={style.twoTitle}>安全隐患指标数据</div>
              <div className={style.safeAgustWrap}>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>一般隐患：</div>
                  <div className={style.addviceDe}>6</div>
                </div>

              </div>
            </div>
          );
        }else if(this.props.title=='自然灾害'){
          IsXiaoqu  = (
            <div>
              <div className={style.twoTitle}>自然灾害指标数据</div>
              <div className={style.safeAgustWrap}>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>地质沉降等级：</div>
                  <div className={style.addviceDe}>弱</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>地震带等级：</div>
                  <div className={style.addviceDe}>否</div>
                </div>
              </div>
            </div>
          );
        }else if(this.props.title=='建筑本体'){
          IsXiaoqu  = (
            <div>
              <div className={style.twoTitle}>建筑物本体指标数据</div>
              <div className={style.safeAgustWrap}>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>建筑物楼龄：</div>
                  <div className={style.addviceDe}>1977年、1979年、1980年、1983年、1986年、1989年、1996年、1999年、1992年、1958年、1959年、1998年、1973年</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>建筑物类型：</div>
                  <div className={style.addviceDe}>板楼&nbsp;板塔结合</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>建筑物结构：</div>
                  <div className={style.addviceDe} >混合结构&nbsp;砖混结构&nbsp;钢混结构&nbsp;</div>
                </div>
              </div>
            </div>
          );
        }else if(this.props.title=='建筑物密集度'){
          IsXiaoqu  = (
            <div>
              <div className={style.twoTitle}>建筑物密集度指标数据</div>
              <div className={style.safeAgustWrap}>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>居住建筑面积：</div>
                  <div className={style.addviceDe}>51455.77㎡</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>办公建筑面积：</div>
                  <div className={style.addviceDe}>10146.55㎡</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>文教建筑面积：</div>
                  <div className={style.addviceDe}>3725.34㎡</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>托教建筑面积：</div>
                  <div className={style.addviceDe}>1101.85㎡</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>医疗建筑面积：</div>
                  <div className={style.addviceDe}>0.00㎡</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>其他建筑面积：</div>
                  <div className={style.addviceDe}>36667.05㎡</div>
                </div>
              </div>
            </div>
          );
        }else if(this.props.title=='市政基础设施'){
          IsXiaoqu  = (
            <div>
              <div className={style.twoTitle}>市政基础设施指标数据</div>
              <div className={style.safeAgustWrap}>
                <div className={style.safeWrap}>
                  暂无
                </div>
              </div>
            </div>
          );
        }else if(this.props.title=='人口密集度'){
          IsXiaoqu  = (
            <div>
              <div className={style.twoTitle}>人口密集度指标数据</div>
              <div className={style.safeAgustWrap}>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>工作日0时人口数量：</div>
                  <div className={style.addviceDe}>4151</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>工作日12时人口数量：</div>
                  <div className={style.addviceDe}>11973</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>非工作日0时人口数量：</div>
                  <div className={style.addviceDe}>3646</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>非工作日12时人口数量：</div>
                  <div className={style.addviceDe}>3869</div>
                </div>
              </div>
            </div>
          );
        }else if(this.props.title=='重点区域'){
          IsXiaoqu  = (
            <div>
              <div className={style.twoTitle}>重点区域</div>
              <div className={style.safeAgustWrap}>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>暂无</div>
                </div>

              </div>
            </div>
          );
        }
      }else{
      //鸿运花园小区
        if(this.props.title=='管线健康'){
          IsXiaoqu = (
            <div>
              <div className={style.twoTitle}>管线健康指标数据</div>
              <div className={style.safeAgustWrap}>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>管线长度：</div>
                  <div className={style.addviceDe}>2037.42m</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>管龄：</div>
                  <div>
                    <div className={style.addviceDe}>
                      1980年之前：2条
                    </div>
                    <div className={style.addviceDe}>
                      1980年~1990年：105条
                    </div>
                    <div className={style.addviceDe}>
                      1990年~2000年：466条
                    </div>
                    <div className={style.addviceDe}>
                      2000年~2010年：2条
                    </div>
                    <div className={style.addviceDe}>
                      2010年~2020年：0条
                    </div>
                  </div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>压力级制：</div>
                  <div className={style.addviceDe}>低压、中压 </div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>管径：</div>
                  <div className={style.addviceDe}>80mm,
                    DN50,
                    DN150,
                    DN100,
                    DN160,
                    DN200,
                    DN500,
                    DN400</div>
                </div>
              </div>
            </div>
          );
        }else if(this.props.title=='事件密集度'){
          IsXiaoqu = (
            <div>
              <div className={style.twoTitle}>事件密集度指标数据</div>
              <div className={style.safeAgustWrap}>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>泄漏事件：</div>
                  <div className={style.addviceDe}>4</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>外管线第三方破坏事件：</div>
                  <div className={style.addviceDe}>0</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>设备设施故障类事件：</div>
                  <div className={style.addviceDe}>0</div>
                </div>
              </div>
            </div>
          );
        }else if(this.props.title=='管线周边环境'){
          IsXiaoqu = (
            <div>
              <div className={style.twoTitle}>管线周边环境安全指标数据</div>
              <div className={style.safeAgustWrap}>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>土壤电阻率：</div>
                  <div className={style.addviceDe}>70Ω·m</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>充电桩数量：</div>
                  <div className={style.addviceDe}>4</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>地铁与管线交点：</div>
                  <div className={style.addviceDe}>1</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>铁路与管线交点：</div>
                  <div className={style.addviceDe}>0</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>无轨电车与管线交点：</div>
                  <div className={style.addviceDe}>3</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>地铁长度：</div>
                  <div className={style.addviceDe}>300.21m</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>铁路长度：</div>
                  <div className={style.addviceDe}>300.21m</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>无轨电车长度：</div>
                  <div className={style.addviceDe}>300.21m</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>第三方施工：</div>
                  <div className={style.addviceDe}>0</div>
                </div>
              </div>
            </div>
          );

        }else if(this.props.title=='安全隐患'){
          IsXiaoqu = (
            <div>
              <div className={style.twoTitle}>安全隐患指标数据</div>
              <div className={style.safeAgustWrap}>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>一般隐患：</div>
                  <div className={style.addviceDe}>2</div>
                </div>

              </div>
            </div>
          );
        }else if(this.props.title=='自然灾害'){
          IsXiaoqu  = (
            <div>
              <div className={style.twoTitle}>自然灾害指标数据</div>
              <div className={style.safeAgustWrap}>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>地质沉降等级：</div>
                  <div className={style.addviceDe}>弱</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>地震带等级：</div>
                  <div className={style.addviceDe}>否</div>
                </div>
              </div>
            </div>
          );
        }else if(this.props.title=='建筑本体'){
          IsXiaoqu  = (
            <div>
              <div className={style.twoTitle}>建筑物本体指标数据</div>
              <div className={style.safeAgustWrap}>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>建筑物楼龄：</div>
                  <div className={style.addviceDe}>1970年、1980年、1991年、1996年</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>建筑物类型：</div>
                  <div className={style.addviceDe}>板楼</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>建筑物结构：</div>
                  <div className={style.addviceDe} >混合结构&nbsp;砖混结构&nbsp;</div>
                </div>
              </div>
            </div>
          );
        }else if(this.props.title=='建筑物密集度'){
          IsXiaoqu  = (
            <div>
              <div className={style.twoTitle}>建筑物密集度指标数据</div>
              <div className={style.safeAgustWrap}>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>居住建筑面积：</div>
                  <div className={style.addviceDe}>18890.16㎡</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>办公建筑面积：</div>
                  <div className={style.addviceDe}>2554.22㎡</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>文教建筑面积：</div>
                  <div className={style.addviceDe}>0.00㎡</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>托教建筑面积：</div>
                  <div className={style.addviceDe}>0.00㎡</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>医疗建筑面积：</div>
                  <div className={style.addviceDe}>0.00㎡</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>其他建筑面积：</div>
                  <div className={style.addviceDe}>32164.26㎡</div>
                </div>
              </div>
            </div>
          );
        }else if(this.props.title=='市政基础设施'){
          IsXiaoqu  = (
            <div>
              <div className={style.twoTitle}>市政基础设施指标数据</div>
              <div className={style.safeAgustWrap}>
                <div className={style.safeWrap}>
                  暂无
                </div>
              </div>
            </div>
          );
        }else if(this.props.title=='人口密集度'){
          IsXiaoqu  = (
            <div>
              <div className={style.twoTitle}>人口密集度指标数据</div>
              <div className={style.safeAgustWrap}>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>工作日0时人口数量：</div>
                  <div className={style.addviceDe}>675</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>工作日12时人口数量：</div>
                  <div className={style.addviceDe}>1413</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>非工作日0时人口数量：</div>
                  <div className={style.addviceDe}>576</div>
                </div>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>非工作日12时人口数量：</div>
                  <div className={style.addviceDe}>575</div>
                </div>
              </div>
            </div>
          );
        }else if(this.props.title=='重点区域'){
          IsXiaoqu  = (
            <div>
              <div className={style.twoTitle}>重点区域</div>
              <div className={style.safeAgustWrap}>
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>暂无</div>
                </div>

              </div>
            </div>
          );
        }
      }
    } else {
      if(this.props.title=='管线健康'){
        IsXiaoqu = (
          <div>
            <div className={style.twoTitle}>管线健康指标数据</div>
            <div className={style.safeAgustWrap}>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>管线长度：</div>
                <div className={style.addviceDe}>{this.state.pipelength}m</div>
              </div>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>管龄：</div>
                <div>
                  <div className={style.addviceDe}>
                    1980年之前：{this.state.maxYear.s1980Before}条
                  </div>
                  <div className={style.addviceDe}>
                    1980年~1990年：{this.state.maxYear.s1990}条
                  </div>
                  <div className={style.addviceDe}>
                    1990年~2000年：{this.state.maxYear.s2000}条
                  </div>
                  <div className={style.addviceDe}>
                    2000年~2010年：{this.state.maxYear.s2010}条
                  </div>
                  <div className={style.addviceDe}>
                    2010年~2020年：{this.state.maxYear.s2020}条
                  </div>
                </div>
                </div>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>压力级制：</div>
                <div
                  className={style.addviceDe}> {this.state.pipeTyle.pressureds && this.state.pipeTyle.pressureds.map((item, index) =>
                  <span key={index}>{item}</span>,
                )} </div>
              </div>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>管径：</div>
                <div
                  className={style.addviceDe}>{this.state.pipeTyle.pipeDiameters && this.state.pipeTyle.pipeDiameters.map((item, index) =>
                  <span key={index}>DN{item}</span>,
                )} </div>
              </div>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>有效阴保数量：</div>
                <div className={style.addviceDe}> {this.state. protectNum} </div>
              </div>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>防腐层破损点数量：</div>
                <div className={style.addviceDe}> {this.state.pointNum} </div>
              </div>


            </div>
          </div>
        );
      }else if(this.props.title=='事件密集度'){
        IsXiaoqu = (
          <div>
            <div className={style.twoTitle}>事件密集度指标数据</div>
            <div className={style.safeAgustWrap}>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>泄漏事件：</div>
                <div className={style.addviceDe}>{this.state.eventDen.etchNum}</div>
              </div>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>外管线第三方破坏事件：</div>
                <div className={style.addviceDe}>{this.state.eventDen.externalNum}</div>
              </div>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>设备设施故障类事件：</div>
                <div className={style.addviceDe}>{this.state.eventDen.faultNum}</div>
              </div>
            </div>
          </div>
        );
      }else if(this.props.title=='管线周边环境'){
        IsXiaoqu = (
          <div>
            <div className={style.twoTitle}>管线周边环境安全指标数据</div>
            <div className={style.safeAgustWrap}>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>土壤电阻率：</div>
                <div className={style.addviceDe}>{this.state.piprSurround.resistivity}Ω·m</div>
              </div>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>充电桩数量：</div>
                <div className={style.addviceDe}>{this.state.piprSurround.chargingPileNum}</div>
              </div>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>地铁与管线交点：</div>
                <div className={style.addviceDe}>{this.state.piprSurround.subwayCorros}</div>
              </div>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>铁路与管线交点：</div>
                <div className={style.addviceDe}>{this.state.piprSurround.railwayCorros}</div>
              </div>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>无轨电车与管线交点：</div>
                <div className={style.addviceDe}>{this.state.piprSurround.trolleyBusCorros}</div>
              </div>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>地铁长度：</div>
                <div className={style.addviceDe}>{Number(this.state.piprSurround.length.subwayLeng).toFixed(2)}m</div>
              </div>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>铁路长度：</div>
                <div className={style.addviceDe}>{Number(this.state.piprSurround.length.railwayLeng).toFixed(2)}m</div>
              </div>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>无轨电车长度：</div>
                <div className={style.addviceDe}>{Number(this.state.piprSurround.length.trolleybusLeng).toFixed(2)}m</div>
              </div>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>第三方施工：</div>
                <div className={style.addviceDe}>{this.state.piprSurround.roadworkNum}</div>
              </div>
            </div>
          </div>
        );

      }else if(this.props.title=='安全隐患'){
        IsXiaoqu = (
          <div>
            <div className={style.twoTitle}>安全隐患指标数据</div>
            <div className={style.safeAgustWrap}>
              {this.state.isSafe&&this.state.isSafe.length==0?
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>暂无</div>
                </div>:
                <div>
                  {this.state.isSafe&&this.state.isSafe.map((item,index)=>
                    <div className={style.safeWrap} key={index}>
                      <div className={style.addviceTitle}>{item.level}：</div>
                      <div className={style.addviceDe}>{item.nums}</div>
                    </div>
                  )}
                </div>
              }

            </div>
          </div>
        );
      }else if(this.props.title=='自然灾害'){
        IsXiaoqu  = (
          <div>
            <div className={style.twoTitle}>自然灾害指标数据</div>
            <div className={style.safeAgustWrap}>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>地质沉降等级：</div>
                <div className={style.addviceDe}>{this.state.natural.level}</div>
              </div>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>地震带等级：</div>
                {this.state.natural.seismicZone?
                  <div className={style.addviceDe}>是</div>:
                  <div className={style.addviceDe}>否</div>
                }

              </div>
            </div>
          </div>
        );
      }else if(this.props.title=='建筑本体'){
        IsXiaoqu  = (
          <div>
            <div className={style.twoTitle}>建筑物本体指标数据</div>
            <div className={style.safeAgustWrap}>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>建筑物楼龄：</div>
                {this.state.buildSelf&&this.state.buildSelf.yeatList.length==0?
                  <div className={style.addviceDe}>暂无</div>
                  :
                  <div>
                    {this.state.buildSelf&&this.state.buildSelf.yeatList.map((item,index)=>
                      <div className={style.addviceDe} key={index}>{item}年</div>
                    )}
                  </div>
                }

              </div>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>建筑物类型：</div>
                {this.state.buildSelf&&this.state.buildSelf.typeList.length==0?
                  <div className={style.addviceDe}>暂无</div>
                  :
                  <div>
                    {this.state.buildSelf&&this.state.buildSelf.typeList.map((item,index)=>
                      <div className={style.addviceDe} key={index}>{item}&nbsp;</div>
                    )}
                  </div>
                }
              </div>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>建筑物结构：</div>
                {this.state.buildSelf&&this.state.buildSelf.structureList.length==0?
                  <div className={style.addviceDe}>暂无</div>
                  :
                  <div>
                    {this.state.buildSelf&&this.state.buildSelf.structureList.map((item,index)=>
                      <div className={style.addviceDe} key={index}>{item}&nbsp;</div>
                    )}
                  </div>
                }
              </div>
            </div>
          </div>
        );
      }else if(this.props.title=='建筑物密集度'){
        IsXiaoqu  = (
          <div>
            <div className={style.twoTitle}>建筑物密集度指标数据</div>
            <div className={style.safeAgustWrap}>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>居住建筑面积：</div>
                <div className={style.addviceDe}>{Number(this.state.buildDesity.areaResid).toFixed(2)}㎡</div>
              </div>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>办公建筑面积：</div>
                <div className={style.addviceDe}>{Number(this.state.buildDesity.areaOffic).toFixed(2)}㎡</div>
              </div>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>文教建筑面积：</div>
                <div className={style.addviceDe}>{Number(this.state.buildDesity.areaEduc).toFixed(2)}㎡</div>
              </div>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>托教建筑面积：</div>
                <div className={style.addviceDe}>{Number(this.state.buildDesity.areaNursery).toFixed(2)}㎡</div>
              </div>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>医疗建筑面积：</div>
                <div className={style.addviceDe}>{Number(this.state.buildDesity.areaMedical).toFixed(2)}㎡</div>
              </div>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>其他建筑面积：</div>
                <div className={style.addviceDe}>{Number(this.state.buildDesity.areaRests).toFixed(2)}㎡</div>
              </div>
            </div>
          </div>
        );
      }else if(this.props.title=='市政基础设施'){
        IsXiaoqu  = (
          <div>
            <div className={style.twoTitle}>市政基础设施指标数据</div>
            <div className={style.safeAgustWrap}>
              {this.state.goverment&&this.state.goverment.length==0?
                <div className={style.safeWrap}>
                  暂无
                </div>:
                <div>
                  {this.state.goverment&&this.state.goverment.map((item,index)=>
                    <div className={style.safeWrap} key={index}>
                      <div className={style.addviceTitle}>{item.type}：</div>
                      <div className={style.addviceDe}>{item.num}</div>
                    </div>
                  )}
                </div>

              }




            </div>
          </div>
        );
      }else if(this.props.title=='人口密集度'){
        IsXiaoqu  = (
          <div>
            <div className={style.twoTitle}>人口密集度指标数据</div>
            <div className={style.safeAgustWrap}>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>工作日0时人口数量：</div>
                <div className={style.addviceDe}>{this.state.peopleNum.workday0}</div>
              </div>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>工作日12时人口数量：</div>
                <div className={style.addviceDe}>{this.state.peopleNum.workday12}</div>
              </div>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>非工作日0时人口数量：</div>
                <div className={style.addviceDe}>{this.state.peopleNum.holiday0}</div>
              </div>
              <div className={style.safeWrap}>
                <div className={style.addviceTitle}>非工作日12时人口数量：</div>
                <div className={style.addviceDe}>{this.state.peopleNum.holiday12}</div>
              </div>
            </div>
          </div>
        );
      }else if(this.props.title=='重点区域'){
        IsXiaoqu  = (
          <div>
            <div className={style.twoTitle}>重点区域</div>
            <div className={style.safeAgustWrap}>
              {this.state.importPart&&this.state.importPart==0?
                <div className={style.safeWrap}>
                  <div className={style.addviceTitle}>暂无</div>
                </div>:
                <div>
                  {this.state.importPart&&this.state.importPart.map((item,index)=>
                    <div className={style.safeWrap} key={index}>
                      <div className={style.addviceTitle}>{item}</div>
                    </div>
                  )}
                </div>
              }

            </div>
          </div>
        );
      }

    }
    //监管综合指数颜色的判断
    if (this.state.allDatas.level == 'notSafe') {
      ColorNum = (<div title="低风险：[0,5.61)&#10;一般风险：[5.61,8.03)&#10;较大风险：[8.03,12.12)&#10;重大风险：[12.12,30.87]" onClick={this.returnBack.bind(this)}
                       className={style.numCount1}>重大风险<span>{Number(this.state.allDatas.compoExp).toFixed(2)}</span>
      </div>);
    } else if (this.state.allDatas.level == 'lessSafe') {
      ColorNum = (<div title="低风险：[0,5.61)&#10;一般风险：[5.61,8.03)&#10;较大风险：[8.03,12.12)&#10;重大风险：[12.12,30.87]" onClick={this.returnBack.bind(this)}
                       className={style.numCount2}>较大风险<span>{Number(this.state.allDatas.compoExp).toFixed(2)}</span>
      </div>);
    } else if (this.state.allDatas.level == 'safe') {
      ColorNum = (<div title="低风险：[0,5.61)&#10;一般风险：[5.61,8.03)&#10;较大风险：[8.03,12.12)&#10;重大风险：[12.12,30.87]" onClick={this.returnBack.bind(this)}
                       className={style.numCount3}>一般风险<span>{Number(this.state.allDatas.compoExp).toFixed(2)}</span>
      </div>);
    } else {
      ColorNum = (<div title="低风险：[0,5.61)&#10;一般风险：[5.61,8.03)&#10;较大风险：[8.03,12.12)&#10;重大风险：[12.12,30.87]" onClick={this.returnBack.bind(this)}
                       className={style.numCount4}>低风险<span>{Number(this.state.allDatas.compoExp).toFixed(2)}</span>
      </div>);
    }
    return (
      <div className={style.rightPart2} style={{ width: this.state.rightWidth }}>
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
                <div className={style.titlename}>{localStorage.getItem('flagArea')}：</div>
                <div className={style.contentCode}>{localStorage.getItem('manage')}</div>
              </div>
            }
          </div>
          {/*{IsXiaoqu}*/}
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
                  null
                  // <div>
                  //   {this.state.allDatas.level=='vsafe'?
                  //     <div className={style.safeWrap}>
                  //       <div className={style.addviceTitle}>建议1：</div>
                  //       <div className={style.addviceDe}>按生产运行计划执行日常运行工作</div>
                  //     </div>:
                  //     <div className={style.safeAgustWrap}>
                  //
                  //       {this.state.measures&&this.state.measures.map((item,index)=>
                  //         <div className={style.safeWrap} key={index}>
                  //           <div className={style.addviceTitle}>建议{index+1}：</div>
                  //           <div className={style.addviceDe}>{item.content}</div>
                  //         </div>
                  //       )}
                  //     </div>
                  //   }
                  // </div>
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
            {localStorage.getItem('gridNum') ?
              <div> {IsXiaoqu}</div> :
              null
            }
            {/*{(localStorage.getItem('manage'))?*/}
            {/*  <div>*/}
            {/*    <div className={style.twoTitle}>安全监管措施</div>*/}
            {/*    {this.state.measures=='暂无'?*/}
            {/*      <div>暂无</div>:*/}
            {/*      <div className={style.safeAgustWrap}>*/}
            {/*        {this.state.measures&&this.state.measures.map((item,index)=>*/}
            {/*          <div className={style.safeWrap} key={index}>*/}
            {/*            <div className={style.addviceTitle}>建议{index+1}：</div>*/}
            {/*            <div className={style.addviceDe}>{item.content}</div>*/}
            {/*          </div>*/}
            {/*        )}*/}
            {/*      </div>*/}
            {/*    }*/}
            {/*  </div>:*/}
            {/*  null*/}
            {/*}*/}

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
        
        <div className={style.rightTitle} onClick={this.isShow.bind(this)} style={{ right: this.state.btnRight }}>信息
        </div>
      </div>
    );
  }
}

export default Rightpart2;
