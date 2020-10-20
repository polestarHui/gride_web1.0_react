import React from 'react';
import style from './style.less';
//引入饼图
import EchartsTest from '../pie1/index';
import ProportionChar from '../proportionChar/index'
//盒须图
import Boxplot from '../boxplot/index';
import router from 'umi/router';
import * as ajax from '../../framework/tools/ajax/index';
import { Tabs } from 'antd';
import Paixu1 from '../../assets/map/paixu1.svg';
import Paixu2 from '../../assets/map/paixu2.svg';


const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

let flag=0,firstClick=0;

//左半部分
class Leftpart1 extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      nineZhi:'',
      isShow:true,
      leftWidth:425,
      rankContent:'',
      current:'1',
      paixu:false
    }
    // console.log(this.props.allGrid,'要渲染的网格数值')
  }
  //进入详情页面
  goDetails(title,titleNum,e) {
    // 判断单网格多网格
    if (window.location.href.includes('showDetails')) {
      //  表示多网格
      localStorage.setItem('zhibaio','zhibiao');
      const totalNum=(Number(this.state.nineZhi.pipeHethRisk)+Number(this.state.nineZhi.eventExp)+Number(this.state.nineZhi.envirExp)+Number(this.state.nineZhi.hiddenExp)+Number(this.state.nineZhi.naturalExp)+Number(this.state.nineZhi.buildSelfExp)+Number(this.state.nineZhi.buildExp)+Number(this.state.nineZhi.municipalExp)+Number(this.state.nineZhi.popuExp)+Number(this.state.nineZhi.keyAreaExp)).toFixed(2);
      // console.log(totalNum,'totalNum');
      router.push({ pathname:'/moreGridDetails',state:{allDetailsMsg : this.state.nineZhi ,title:title,titleNum:titleNum,totalNum:totalNum} })
      // console.log(this.state.nineZhi);
    } else {
      //  表示单网格
      // console.log(title,titleNum,e);
      const totalNum=(Number(this.state.nineZhi.pipeHethRisk)+Number(this.state.nineZhi.eventExp)+Number(this.state.nineZhi.envirExp)+Number(this.state.nineZhi.hiddenExp)+Number(this.state.nineZhi.naturalExp)+Number(this.state.nineZhi.buildSelfExp)+Number(this.state.nineZhi.buildExp)+Number(this.state.nineZhi.municipalExp)+Number(this.state.nineZhi.popuExp)+Number(this.state.nineZhi.keyAreaExp)).toFixed(2);
      // console.log(totalNum,'totalNum');
      router.push({pathname:'/signalGridDetails/',state:{title:title,titleNum:titleNum,totalNum:totalNum}});
    }
  }

  //点击动画效果
  notShow(e){
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
    // console.log(this.state.isShow,this.state.leftWidth);
  }

  //获取下一页的数据
  getPageMsg(e){
   this.componentDidMount();
  }


  componentDidMount() {
    if(flag==0){
      if(localStorage.getItem('gridNum')==undefined){
        //  表示多网格
        if(localStorage.getItem('flagArea')=='管理单位'){
          //多网格各项指数
          ajax.get(
            '/rest/decis/get/multi/info',
            {
              manage:localStorage.getItem('manage')
            },
            res=>{
              // console.log(res,'多网格综合各项风险指数管理单位');
              if(res.status==0){
                this.setState({
                  nineZhi:res.data.data
                })

              }else{

              }
            }
          )
          //  多网格排名
          //  判断点击的是下一页还是正序倒叙
          if(localStorage.getItem('order')){
            // console.log("正序还是倒序呢");
            //  点击的排序
            this.setState({
              paixu:!this.state.paixu
            })
            if(!this.state.paixu){
              ajax.get(
                '/rest/grid/get/list',
                {
                  manage:localStorage.getItem('manage'),
                  pageSize:20,
                  current:'1'
                },
                res=>{
                  console.log('正序');
                  localStorage.removeItem('order');
                  // console.log(res,'排名排名');
                  this.setState({
                    rankContent:res,
                    current:Number(res.pagination.current)+1
                  })
                  // console.log(this.state.current);
                  // console.log(this.state.rankContent,'rankContent')
                }
              )
            }else{
              ajax.get(
                '/rest/grid/get/list',
                {
                  manage:localStorage.getItem('manage'),
                  pageSize:20,
                  current:'1',
                  order:'desc'

                },
                res=>{
                  localStorage.removeItem('order');
                  console.log('daoxu');
                  // console.log(res,'排名排名');
                  this.setState({
                    rankContent:res,
                    current:Number(res.pagination.current)+1
                  })
                  // console.log(this.state.current);
                  // console.log(222);
                  // console.log(this.state.rankContent,'rankContent')
                }
              )
            }
          }else{
            console.log(this.state.current,'点击了下一页123456');
            console.log(firstClick,'firstClick');
            if(firstClick==1){
              console.log('这里走了吗');
              // console.log(Number(this.state.current)+1)
              this.setState({
                current:this.state.current+2
              },() =>{
                console.log(this.state.current,'输出结果'); //此时的this.state.initSwitch为true
                //  点击的下一页
                //  判断正序还是倒叙
                if(this.state.paixu){
                  ajax.get(
                    '/rest/grid/get/list',
                    {
                      manage:localStorage.getItem('manage'),
                      pageSize:20,
                      current:this.state.current
                    },
                    res=>{
                      console.log('正序');
                      // console.log(res,'排名排名');
                      this.setState({
                        rankContent:res,
                        current:Number(res.pagination.current)+1
                      })
                      // console.log(this.state.current);
                      // console.log(this.state.rankContent,'rankContent')
                    }
                  )
                }else{
                  ajax.get(
                    '/rest/grid/get/list',
                    {
                      manage:localStorage.getItem('manage'),
                      pageSize:20,
                      current:this.state.current,
                      order:'desc'

                    },
                    res=>{
                      console.log('倒叙');
                      // console.log(res,'排名排名');
                      this.setState({
                        rankContent:res,
                        current:Number(res.pagination.current)+1
                      })
                      console.log(this.state.current,'下一页');
                      // console.log(222);
                      // console.log(this.state.rankContent,'rankContent')
                    }
                  )
                }
              });
              // this.setState({
              //   current:2
              // })
              // console.log(this.state.current,'走过判断之后')
              firstClick=0;
            }else{
              this.setState({
                current:this.state.current
              })
              //  点击的下一页
              //  判断正序还是倒叙
              if(this.state.paixu){
                ajax.get(
                  '/rest/grid/get/list',
                  {
                    manage:localStorage.getItem('manage'),
                    pageSize:20,
                    current:this.state.current
                  },
                  res=>{
                    console.log('正序');
                    // console.log(res,'排名排名');
                    this.setState({
                      rankContent:res,
                      current:Number(res.pagination.current)+1
                    })
                    // console.log(this.state.current);
                    // console.log(this.state.rankContent,'rankContent')
                  }
                )
              }else{
                ajax.get(
                  '/rest/grid/get/list',
                  {
                    manage:localStorage.getItem('manage'),
                    pageSize:20,
                    current:this.state.current,
                    order:'desc'

                  },
                  res=>{
                    console.log('倒叙');
                    // console.log(res,'排名排名');
                    this.setState({
                      rankContent:res,
                      current:Number(res.pagination.current)+1
                    })
                    console.log(this.state.current,'下一页');
                    // console.log(222);
                    // console.log(this.state.rankContent,'rankContent')
                  }
                )
              }
            }
          }


        }else if(localStorage.getItem('flagArea')=='行政区域'){
          ajax.get(
            '/rest/decis/get/multi/info',
            {
              distName:localStorage.getItem('manage')
            },
            res=>{
              console.log(res,'多网格综合各项风险指数行政区域');
              if(res.status==0){
                this.setState({
                  nineZhi:res.data.data
                })

              }else{

              }
            }
          )
          //  多网格排名
          //  判断点击的是下一页还是正序倒叙
          if(localStorage.getItem('order')){
            console.log("正序还是倒序呢");
            //  点击的排序
            this.setState({
              paixu:!this.state.paixu
            })
            if(!this.state.paixu){
              ajax.get(
                '/rest/grid/get/list',
                {
                  distName:localStorage.getItem('manage'),
                  pageSize:20,
                  current:'1'
                },
                res=>{
                  console.log('正序');
                  localStorage.removeItem(

                    'order');
                  // console.log(res,'排名排名');
                  this.setState({
                    rankContent:res,
                    current:Number(res.pagination.current)+1
                  })
                  // console.log(this.state.current);
                  // console.log(this.state.rankContent,'rankContent')
                }
              )
            }else{
              ajax.get(
                '/rest/grid/get/list',
                {
                  distName:localStorage.getItem('manage'),
                  pageSize:20,
                  current:'1',
                  order:'desc'

                },
                res=>{
                  localStorage.removeItem('order');
                  console.log('daoxu');
                  // console.log(res,'排名排名');
                  this.setState({
                    rankContent:res,
                    current:Number(res.pagination.current)+1
                  })
                  // console.log(this.state.current);
                  // console.log(222);
                  // console.log(this.state.rankContent,'rankContent')
                }
              )
            }
          }else{
            console.log('点击了下一页');
            if(firstClick==1){
              this.setState({
                current: this.state.current+2
              },() =>{
                // console.log(this.state.current); //此时的this.state.initSwitch为true
                //  点击的下一页
                //  判断正序还是倒叙
                if(this.state.paixu){
                  ajax.get(
                    '/rest/grid/get/list',
                    {
                      distName:localStorage.getItem('manage'),
                      pageSize:20,
                      current:this.state.current
                    },
                    res=>{
                      console.log('正序');
                      // console.log(res,'排名排名');
                      this.setState({
                        rankContent:res,
                        current:Number(res.pagination.current)+1
                      })
                      // console.log(this.state.current);
                      // console.log(this.state.rankContent,'rankContent')
                    }
                  )
                }else{
                  ajax.get(
                    '/rest/grid/get/list',
                    {
                      distName:localStorage.getItem('manage'),
                      pageSize:20,
                      current:this.state.current,
                      order:'desc'

                    },
                    res=>{
                      console.log('倒叙');
                      // console.log(res,'排名排名');
                      this.setState({
                        rankContent:res,
                        current:Number(res.pagination.current)+1
                      })
                      // console.log(this.state.current);
                      // console.log(222);
                      // console.log(this.state.rankContent,'rankContent')
                    }
                  )
                }
              });
              firstClick=0;
            }else{
                this.setState({
                  current: this.state.current
                })
              //  点击的下一页
              //  判断正序还是倒叙
              if(this.state.paixu){
                ajax.get(
                  '/rest/grid/get/list',
                  {
                    distName:localStorage.getItem('manage'),
                    pageSize:20,
                    current:this.state.current
                  },
                  res=>{
                    console.log('正序');
                    // console.log(res,'排名排名');
                    this.setState({
                      rankContent:res,
                      current:Number(res.pagination.current)+1
                    })
                    // console.log(this.state.current);
                    // console.log(this.state.rankContent,'rankContent')
                  }
                )
              }else{
                ajax.get(
                  '/rest/grid/get/list',
                  {
                    distName:localStorage.getItem('manage'),
                    pageSize:20,
                    current:this.state.current,
                    order:'desc'

                  },
                  res=>{
                    console.log('倒叙');
                    // console.log(res,'排名排名');
                    this.setState({
                      rankContent:res,
                      current:Number(res.pagination.current)+1
                    })
                    // console.log(this.state.current);
                    // console.log(222);
                    // console.log(this.state.rankContent,'rankContent')
                  }
                )
              }
            }
          }
        }else{
          ajax.get(
            '/rest/decis/get/multi/info',
            {
              manageArea:localStorage.getItem('manage')
            },
            res=>{
              console.log(res,'多网格综合各项风险指数片区');
              if(res.status==0){
                this.setState({
                  nineZhi:res.data.data
                })
              }else{

              }
            }
          )
          //  多网格排名
          //  判断点击的是下一页还是正序倒叙
          if(localStorage.getItem('order')){
            console.log("正序还是倒序呢");
            //  点击的排序
            this.setState({
              paixu:!this.state.paixu
            })
            if(!this.state.paixu){
              ajax.get(
                '/rest/grid/get/list',
                {
                  manageArea:localStorage.getItem('manage'),
                  pageSize:20,
                  current:'1'
                },
                res=>{
                  console.log('正序');
                  localStorage.removeItem('order');
                  // console.log(res,'排名排名');
                  this.setState({
                    rankContent:res,
                    current:Number(res.pagination.current)+1
                  })
                  // console.log(this.state.current);
                  // console.log(this.state.rankContent,'rankContent')
                }
              )
            }else{
              ajax.get(
                '/rest/grid/get/list',
                {
                  manageArea:localStorage.getItem('manage'),
                  pageSize:20,
                  current:'1',
                  order:'desc'

                },
                res=>{
                  localStorage.removeItem('order');
                  console.log('daoxu');
                  // console.log(res,'排名排名');
                  this.setState({
                    rankContent:res,
                    current:Number(res.pagination.current)+1
                  })
                  // console.log(this.state.current);
                  // console.log(222);
                  // console.log(this.state.rankContent,'rankContent')
                }
              )
            }
          }else{
            console.log('点击了下一页');
            if(firstClick==1){
              this.setState({
                current: this.state.current+2
              },() =>{
                // console.log(this.state.current); //此时的this.state.initSwitch为true
//  点击的下一页
                //  判断正序还是倒叙
                if(this.state.paixu){
                  ajax.get(
                    '/rest/grid/get/list',
                    {
                      manageArea:localStorage.getItem('manage'),
                      pageSize:20,
                      current:this.state.current
                    },
                    res=>{
                      console.log('正序');
                      // console.log(res,'排名排名');
                      this.setState({
                        rankContent:res,
                        current:Number(res.pagination.current)+1
                      })
                      // console.log(this.state.current);
                      // console.log(this.state.rankContent,'rankContent')
                    }
                  )
                }else{
                  ajax.get(
                    '/rest/grid/get/list',
                    {
                      manageArea:localStorage.getItem('manage'),
                      pageSize:20,
                      current:this.state.current,
                      order:'desc'

                    },
                    res=>{
                      console.log('倒叙');
                      // console.log(res,'排名排名');
                      this.setState({
                        rankContent:res,
                        current:Number(res.pagination.current)+1
                      })
                      // console.log(this.state.current);
                      // console.log(222);
                      // console.log(this.state.rankContent,'rankContent')
                    }
                  )
                }
              });
              firstClick=0;
            }else{
              this.setState({
                current: this.state.current
              })
              //  点击的下一页
              //  判断正序还是倒叙
              if(this.state.paixu){
                ajax.get(
                  '/rest/grid/get/list',
                  {
                    manageArea:localStorage.getItem('manage'),
                    pageSize:20,
                    current:this.state.current
                  },
                  res=>{
                    console.log('正序');
                    // console.log(res,'排名排名');
                    this.setState({
                      rankContent:res,
                      current:Number(res.pagination.current)+1
                    })
                    // console.log(this.state.current);
                    // console.log(this.state.rankContent,'rankContent')
                  }
                )
              }else{
                ajax.get(
                  '/rest/grid/get/list',
                  {
                    manageArea:localStorage.getItem('manage'),
                    pageSize:20,
                    current:this.state.current,
                    order:'desc'

                  },
                  res=>{
                    console.log('倒叙');
                    // console.log(res,'排名排名');
                    this.setState({
                      rankContent:res,
                      current:Number(res.pagination.current)+1
                    })
                    // console.log(this.state.current);
                    // console.log(222);
                    // console.log(this.state.rankContent,'rankContent')
                  }
                )
              }
            }
          }
        }

      }else{
        //  表示单网格
        //单网格 请求风险监控指标值
        if(localStorage.getItem('qufen')=='grid'){
          ajax.get(
            '/rest/decis/get/risk',
            {
              gridNum: Number(localStorage.getItem('gridNum')),

            },
            res => {
              if(res.status==0){
                this.setState({
                  nineZhi:res.data.data
                })

              }else{

              }
            },
          );
        }else{
          ajax.get(
            '/rest/decis/get/multi/info',
            {
              villageName: localStorage.getItem('gridNum'),

            },
            res => {
              console.log(res,'gridNum');
              // console.log(this);
              if(res.status==0){
                this.setState({
                  nineZhi:res.data.data
                })

              }else{

              }
            },
          );
        }

      }




    }else {
      if(localStorage.getItem('gridNum')==undefined){
        //  表示多网格
        console.log(this.state.paixu,'paixuaxhh');
        if(localStorage.getItem('flagArea')=='管理单位'){
          //多网格各项指数
          ajax.get(
            '/rest/decis/get/multi/info',
            {
              manage:localStorage.getItem('manage')
            },
            res=>{
              // console.log(res,'多网格综合各项风险指数管理单位');
              if(res.status==0){
                this.setState({
                  nineZhi:res.data.data
                })

              }else{

              }
            }
          )
          //  多网格排名
          //  判断点击的是下一页还是正序倒叙
          if(localStorage.getItem('order')){
            console.log("正序还是倒序呢");
            //  点击的排序
            this.setState({
              paixu:!this.state.paixu
            })
            if(!this.state.paixu){
              ajax.get(
                '/rest/grid/get/list',
                {
                  manage:localStorage.getItem('manage'),
                  pageSize:20,
                  current:'1'
                },
                res=>{
                  console.log('正序');
                  localStorage.removeItem('order');
                  // console.log(res,'排名排名');
                  this.setState({
                    rankContent:res,
                    current:Number(res.pagination.current)+1
                  })
                  // console.log(this.state.current);
                  // console.log(this.state.rankContent,'rankContent')
                }
              )
            }else{
              ajax.get(
                '/rest/grid/get/list',
                {
                  manage:localStorage.getItem('manage'),
                  pageSize:20,
                  current:'1',
                  order:'desc'

                },
                res=>{
                  localStorage.removeItem('order');
                  console.log('daoxu');
                  // console.log(res,'排名排名');
                  this.setState({
                    rankContent:res,
                    current:Number(res.pagination.current)+1
                  })
                  // console.log(this.state.current);
                  // console.log(222);
                  // console.log(this.state.rankContent,'rankContent')
                }
              )
            }
          }else{
            let pageNum;
            if(firstClick==0){
              pageNum=this.state.current-2;
              firstClick=1;
            }else{
              pageNum=this.state.current;
            }
            //  点击的下一页
            //  判断正序还是倒叙
            if(this.state.paixu){
              ajax.get(
                '/rest/grid/get/list',
                {
                  manage:localStorage.getItem('manage'),
                  pageSize:20,
                  current:pageNum
                },
                res=>{
                  console.log('正序');
                  // console.log(res,'排名排名');
                  this.setState({
                    rankContent:res,
                    current:Number(res.pagination.current)-1
                  })
                  console.log(this.state.current,'上一页');
                  // console.log(this.state.rankContent,'rankContent')
                }
              )
            }else{

              ajax.get(
                '/rest/grid/get/list',
                {
                  manage:localStorage.getItem('manage'),
                  pageSize:20,
                  current:pageNum,
                  order:'desc'

                },
                res=>{
                  console.log('倒叙');
                  // console.log(res,'排名排名');
                  this.setState({
                    rankContent:res,
                    current:Number(res.pagination.current)-1
                  })
                  // console.log(this.state.current);
                  // console.log(222);
                  // console.log(this.state.rankContent,'rankContent')
                }
              )
            }
          }


        }else if(localStorage.getItem('flagArea')=='行政区域'){
          ajax.get(
            '/rest/decis/get/multi/info',
            {
              distName:localStorage.getItem('manage')
            },
            res=>{
              console.log(res,'多网格综合各项风险指数行政区域');
              if(res.status==0){
                this.setState({
                  nineZhi:res.data.data
                })

              }else{

              }
            }
          )
          //  多网格排名
          //  判断点击的是下一页还是正序倒叙
          if(localStorage.getItem('order')){
            console.log("正序还是倒序呢");
            //  点击的排序
            this.setState({
              paixu:!this.state.paixu
            })
            if(!this.state.paixu){
              ajax.get(
                '/rest/grid/get/list',
                {
                  distName:localStorage.getItem('manage'),
                  pageSize:20,
                  current:'1'
                },
                res=>{
                  console.log('正序');
                  localStorage.removeItem('order');
                  // console.log(res,'排名排名');
                  this.setState({
                    rankContent:res,
                    current:Number(res.pagination.current)+1
                  })
                  // console.log(this.state.current);
                  // console.log(this.state.rankContent,'rankContent')
                }
              )
            }else{
              ajax.get(
                '/rest/grid/get/list',
                {
                  distName:localStorage.getItem('manage'),
                  pageSize:20,
                  current:'1',
                  order:'desc'

                },
                res=>{
                  localStorage.removeItem('order');
                  console.log('daoxu');
                  // console.log(res,'排名排名');
                  this.setState({
                    rankContent:res,
                    current:Number(res.pagination.current)+1
                  })
                  // console.log(this.state.current);
                  // console.log(222);
                  // console.log(this.state.rankContent,'rankContent')
                }
              )
            }
          }else{
            console.log('点击了上一页');
            let pageNum;
            if(firstClick==0){
              pageNum=this.state.current-2;
              firstClick=1;
            }else{
              pageNum=this.state.current;
            }
            //  点击的下一页
            //  判断正序还是倒叙
            if(this.state.paixu){
              ajax.get(
                '/rest/grid/get/list',
                {
                  distName:localStorage.getItem('manage'),
                  pageSize:20,
                  current:pageNum
                },
                res=>{
                  console.log('正序');
                  // console.log(res,'排名排名');
                  this.setState({
                    rankContent:res,
                    current:Number(res.pagination.current)-1
                  })
                  // console.log(this.state.current);
                  // console.log(this.state.rankContent,'rankContent')
                }
              )
            }else{
              ajax.get(
                '/rest/grid/get/list',
                {
                  distName:localStorage.getItem('manage'),
                  pageSize:20,
                  current:pageNum,
                  order:'desc'

                },
                res=>{
                  console.log('倒叙');
                  // console.log(res,'排名排名');
                  this.setState({
                    rankContent:res,
                    current:Number(res.pagination.current)-1
                  })
                  // console.log(this.state.current);
                  // console.log(222);
                  // console.log(this.state.rankContent,'rankContent')
                }
              )
            }
          }
        }else{
          ajax.get(
            '/rest/decis/get/multi/info',
            {
              manageArea:localStorage.getItem('manage')
            },
            res=>{
              console.log(res,'多网格综合各项风险指数片区');
              if(res.status==0){
                this.setState({
                  nineZhi:res.data.data
                })
              }else{

              }
            }
          )
          //  多网格排名
          //  判断点击的是下一页还是正序倒叙
          if(localStorage.getItem('order')){
            console.log("正序还是倒序呢");
            //  点击的排序
            this.setState({
              paixu:!this.state.paixu
            })
            if(!this.state.paixu){
              ajax.get(
                '/rest/grid/get/list',
                {
                  manageArea:localStorage.getItem('manage'),
                  pageSize:20,
                  current:'1'
                },
                res=>{
                  console.log('正序');
                  localStorage.removeItem('order');
                  // console.log(res,'排名排名');
                  this.setState({
                    rankContent:res,
                    current:Number(res.pagination.current)+1
                  })
                  // console.log(this.state.current);
                  // console.log(this.state.rankContent,'rankContent')
                }
              )
            }else{
              ajax.get(
                '/rest/grid/get/list',
                {
                  manageArea:localStorage.getItem('manage'),
                  pageSize:20,
                  current:'1',
                  order:'desc'

                },
                res=>{
                  localStorage.removeItem('order');
                  console.log('daoxu');
                  // console.log(res,'排名排名');
                  this.setState({
                    rankContent:res,
                    current:Number(res.pagination.current)+1
                  })
                  // console.log(this.state.current);
                  // console.log(222);
                  // console.log(this.state.rankContent,'rankContent')
                }
              )
            }
          }else{
            let pageNum;
            if(firstClick==0){
              pageNum=this.state.current-2;
              firstClick=1;
            }else{
              pageNum=this.state.current;
            }
            console.log('点击了下一页');
            //  点击的下一页
            //  判断正序还是倒叙
            if(this.state.paixu){
              ajax.get(
                '/rest/grid/get/list',
                {
                  manageArea:localStorage.getItem('manage'),
                  pageSize:20,
                  current:pageNum
                },
                res=>{
                  console.log('正序');
                  // console.log(res,'排名排名');
                  this.setState({
                    rankContent:res,
                    current:Number(res.pagination.current)-1
                  })
                  // console.log(this.state.current);
                  // console.log(this.state.rankContent,'rankContent')
                }
              )
            }else{
              ajax.get(
                '/rest/grid/get/list',
                {
                  manageArea:localStorage.getItem('manage'),
                  pageSize:20,
                  current:pageNum,
                  order:'desc'

                },
                res=>{
                  console.log('倒叙');
                  // console.log(res,'排名排名');
                  this.setState({
                    rankContent:res,
                    current:Number(res.pagination.current)-1
                  })
                  // console.log(this.state.current);
                  // console.log(222);
                  // console.log(this.state.rankContent,'rankContent')
                }
              )
            }
          }
        }

      }else{
        //  表示单网格
        //单网格 请求风险监控指标值
        if(localStorage.getItem('qufen')=='grid'){
          ajax.get(
            '/rest/decis/get/risk',
            {
              gridNum: Number(localStorage.getItem('gridNum')),

            },
            res => {
              if(res.status==0){
                this.setState({
                  nineZhi:res.data.data
                })

              }else{

              }
            },
          );
        }else{
          ajax.get(
            '/rest/decis/get/multi/info',
            {
              villageName: localStorage.getItem('gridNum'),

            },
            res => {
              console.log(res,'gridNum');
              // console.log(this);
              if(res.status==0){
                this.setState({
                  nineZhi:res.data.data
                })

              }else{

              }
            },
          );
        }

      }
    }

  }

  //排序
  paixu(){
    localStorage.setItem('order','order');
    this.componentDidMount();
  }

  //上一页
  lastPageMsg(){
    flag=1;
    this.componentDidMount();
    flag=0;
  }


  //子向父传值，传递网格编号
  clickGrid(girdNum,e){
    console.log(girdNum,'girdNum');
    this.props.clickGrid.clickGrid(girdNum);
  }

  //查看详情
  goDetail(gridNum,e){
    console.log('这是我要的',e,gridNum);
    ajax.get(
      '/rest/grid/get/grid/list',
      {
        num: gridNum,
      },
      res => {
        console.log(res);
        if (res.status == 0) {
          //  缓存中存下网格编号
          localStorage.removeItem('manage');
          localStorage.removeItem('flagArea');
          localStorage.setItem('qufen', 'grid');
          localStorage.setItem('gridNum', gridNum);
          router.push({ pathname: '/signalGrid', state: { grideCount: res } });
        } else if (res.status == -1) {
          // message.warning('请输入正确的网格编号');
        } else {
          // message.warning('当前网络质量不佳，请重试');
        }
      },
    );
  }

  render() {
    // console.log(this.state.paixu,'waimainde ')
    let  Xiaoqu;
    if(localStorage.getItem('qufen')=='xiaoqu'){
     Xiaoqu=(
      <div className={style.detailWrap}>
      <div className={style.sumtitle}>各等级网格占比图</div>
      <div>
        <ProportionChar count="1"/>
      </div>
    </div>
     )
    }else{
      Xiaoqu=(
        <div className={style.detailWrap}>
                <div className={style.sumtitle}>风险评价分布箱线图</div>
                <div>
                  <Boxplot count="1"/>
                </div>
              </div>
       )
    }
    // console.log(this.state.rankContent.pagination,'rankContent')
    return (
      <div>
        {localStorage.getItem('gridNum')?
          //单网格
          <div className={style.leftContainer} style={{width:this.state.leftWidth}}>
            <div className={style.leftContent}>
            {/*  风险监控指标值*/}
            <div className={style.detailWrap}>
              <div className={style.sumtitle}>风险监控指标值</div>
              <div className={style.everyNum}>
                {/*  每一项数字*/}
                <div className={style.everyNumWrap} onClick={this.goDetails.bind(this,'管线健康',((Number(this.state.nineZhi.pipeHethRisk))))}>
                  <div className={style.numberBiao}>{((Number(this.state.nineZhi.pipeHethRisk))/0.2).toFixed(2)}</div>
                  {/*<div className={style.numberBiao}>{((Number(this.state.nineZhi.pipeHethRisk))).toFixed(2)}</div>*/}
                  <div className={style.numberTitle}>管线健康</div>
                </div>
                {/*  每一项数字*/}
                <div className={style.everyNumWrap}  onClick={this.goDetails.bind(this,'事件密集度',(Number(this.state.nineZhi.eventExp)))}>
                  <div className={style.numberBiao}>{(Number(this.state.nineZhi.eventExp)/0.3).toFixed(2)}</div>
                  <div className={style.numberTitle}>事件密集度</div>
                </div>
                {/*  每一项数字*/}
                <div className={style.everyNumWrap} onClick={this.goDetails.bind(this,'管线周边环境',(Number(this.state.nineZhi.envirExp)))}>
                  {/*<div className={style.numberBiao}>{((Number(this.state.nineZhi.envirExp))).toFixed(2)}</div>*/}
                  <div className={style.numberBiao}>{(Number(this.state.nineZhi.envirExp)/0.15).toFixed(2)}</div>
                  <div className={style.numberTitle}>管线周边环境</div>
                </div>
                {/*  每一项数字*/}
                <div className={style.everyNumWrap} onClick={this.goDetails.bind(this,'安全隐患',(Number(this.state.nineZhi.hiddenExp)))}>
                  <div className={style.numberBiao}>{(Number(this.state.nineZhi.hiddenExp)/0.3).toFixed(2)}</div>
                  <div className={style.numberTitle}>安全隐患</div>
                </div>
                {/*  每一项数字*/}
                <div className={style.everyNumWrap} onClick={this.goDetails.bind(this,'自然灾害',(Number(this.state.nineZhi.naturalExp)))}>
                  <div className={style.numberBiao}>{(Number(this.state.nineZhi.naturalExp)/0.05).toFixed(2)}</div>
                  <div className={style.numberTitle}>自然灾害</div>
                </div>
                {/*  每一项数字*/}
                <div className={style.everyNumWrap} onClick={this.goDetails.bind(this,'建筑本体',(Number(this.state.nineZhi.buildSelfExp)))}>
                  <div className={style.numberBiao}>{(Number(this.state.nineZhi.buildSelfExp)/0.25).toFixed(2)}</div>
                  <div className={style.numberTitle}>建筑本体</div>
                </div>
                {/*  每一项数字*/}
                <div className={style.everyNumWrap} onClick={this.goDetails.bind(this,'建筑物密集度',(Number(this.state.nineZhi.buildExp)))}>
                  <div className={style.numberBiao}>{(Number(this.state.nineZhi.buildExp)/0.25).toFixed(2)}</div>
                  <div className={style.numberTitle}>建筑物密集度</div>
                </div>
                {/*  每一项数字*/}
                <div className={style.everyNumWrap} onClick={this.goDetails.bind(this,'市政基础设施',(Number(this.state.nineZhi.municipalExp)))}>
                  <div className={style.numberBiao}>{(Number(this.state.nineZhi.municipalExp)/0.1).toFixed(2)}</div>
                  <div className={style.numberTitle}>市政基础设施</div>
                </div>
                {/*  每一项数字*/}
                <div className={style.everyNumWrap} onClick={this.goDetails.bind(this,'人口密集度',(Number(this.state.nineZhi.popuExp)))}>
                  <div className={style.numberBiao}>{(Number(this.state.nineZhi.popuExp)/0.3).toFixed(2)}</div>
                  <div className={style.numberTitle}>人口密集度</div>
                </div>
                {/*  每一项数字*/}
                <div className={style.everyNumWrap} onClick={this.goDetails.bind(this,'重点区域',(Number(this.state.nineZhi.keyAreaExp)))}>
                  <div className={style.numberBiao}>{(Number(this.state.nineZhi.keyAreaExp)/0.1).toFixed(2)}</div>
                  <div className={style.numberTitle}>重点区域</div>
                </div>
              </div>
            </div>
            <div className={style.detailWrap}>
              <div className={style.sumtitle}>风险监控指标占比</div>
              {localStorage.getItem('gridNum')?
                <div><ProportionChar count="0"/></div>:
                <div><ProportionChar  count="6"/></div>
              }

            </div>
            {window.location.href.includes('showDetails') ?
              <div className={style.detailWrap}>
                <div className={style.sumtitle}>各等级网格占比图</div>
                <div>
                  <ProportionChar count="1"/>
                </div>
              </div>

              :
              <div>{Xiaoqu}</div>
            }

          </div>
          <div className={style.leftTitle} onClick={this.notShow.bind(this)}>图表</div>
        </div>
          :
          //多网格
          <div className={style.part3Container} style={{width:this.state.leftWidth}}>
            <Tabs onChange={callback} type="card">
              <TabPane tab="风险监控指标值" key="1">
                <div>
                  <div className={style.detailWrap}>
                    <div className={style.sumtitle}>风险监控指标值</div>
                    <div className={style.everyNum}>
                      {/*  每一项数字*/}
                      <div className={style.everyNumWrap} onClick={this.goDetails.bind(this,'管线健康',((Number(this.state.nineZhi.pipeHethRisk))))}>
                        <div className={style.numberBiao}>{((Number(this.state.nineZhi.pipeHethRisk))/0.2).toFixed(2)}</div>
                        {/*<div className={style.numberBiao}>{((Number(this.state.nineZhi.pipeHethRisk))).toFixed(2)}</div>*/}
                        <div className={style.numberTitle}>管线健康</div>
                      </div>
                      {/*  每一项数字*/}
                      <div className={style.everyNumWrap}  onClick={this.goDetails.bind(this,'事件密集度',(Number(this.state.nineZhi.eventExp)))}>
                        <div className={style.numberBiao}>{(Number(this.state.nineZhi.eventExp)/0.3).toFixed(2)}</div>
                        <div className={style.numberTitle}>事件密集度</div>
                      </div>
                      {/*  每一项数字*/}
                      <div className={style.everyNumWrap} onClick={this.goDetails.bind(this,'管线周边环境',(Number(this.state.nineZhi.envirExp)))}>
                        {/*<div className={style.numberBiao}>{((Number(this.state.nineZhi.envirExp))).toFixed(2)}</div>*/}
                        <div className={style.numberBiao}>{(Number(this.state.nineZhi.envirExp)/0.15).toFixed(2)}</div>
                        <div className={style.numberTitle}>管线周边环境</div>
                      </div>
                      {/*  每一项数字*/}
                      <div className={style.everyNumWrap} onClick={this.goDetails.bind(this,'安全隐患',(Number(this.state.nineZhi.hiddenExp)))}>
                        <div className={style.numberBiao}>{(Number(this.state.nineZhi.hiddenExp)/0.3).toFixed(2)}</div>
                        <div className={style.numberTitle}>安全隐患</div>
                      </div>
                      {/*  每一项数字*/}
                      <div className={style.everyNumWrap} onClick={this.goDetails.bind(this,'自然灾害',(Number(this.state.nineZhi.naturalExp)))}>
                        <div className={style.numberBiao}>{(Number(this.state.nineZhi.naturalExp)/0.05).toFixed(2)}</div>
                        <div className={style.numberTitle}>自然灾害</div>
                      </div>
                      {/*  每一项数字*/}
                      <div className={style.everyNumWrap} onClick={this.goDetails.bind(this,'建筑本体',(Number(this.state.nineZhi.buildSelfExp)))}>
                        <div className={style.numberBiao}>{(Number(this.state.nineZhi.buildSelfExp)/0.25).toFixed(2)}</div>
                        <div className={style.numberTitle}>建筑本体</div>
                      </div>
                      {/*  每一项数字*/}
                      <div className={style.everyNumWrap} onClick={this.goDetails.bind(this,'建筑物密集度',(Number(this.state.nineZhi.buildExp)))}>
                        <div className={style.numberBiao}>{(Number(this.state.nineZhi.buildExp)/0.25).toFixed(2)}</div>
                        <div className={style.numberTitle}>建筑物密集度</div>
                      </div>
                      {/*  每一项数字*/}
                      <div className={style.everyNumWrap} onClick={this.goDetails.bind(this,'市政基础设施',(Number(this.state.nineZhi.municipalExp)))}>
                        <div className={style.numberBiao}>{(Number(this.state.nineZhi.municipalExp)/0.1).toFixed(2)}</div>
                        <div className={style.numberTitle}>市政基础设施</div>
                      </div>
                      {/*  每一项数字*/}
                      <div className={style.everyNumWrap} onClick={this.goDetails.bind(this,'人口密集度',(Number(this.state.nineZhi.popuExp)))}>
                        <div className={style.numberBiao}>{(Number(this.state.nineZhi.popuExp)/0.3).toFixed(2)}</div>
                        <div className={style.numberTitle}>人口密集度</div>
                      </div>
                      {/*  每一项数字*/}
                      <div className={style.everyNumWrap} onClick={this.goDetails.bind(this,'重点区域',(Number(this.state.nineZhi.keyAreaExp)))}>
                        <div className={style.numberBiao}>{(Number(this.state.nineZhi.keyAreaExp)/0.1).toFixed(2)}</div>
                        <div className={style.numberTitle}>重点区域</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={style.detailWrap}>
                  <div className={style.sumtitle}>风险监控指标占比</div>
                  {localStorage.getItem('gridNum')?
                    <div><ProportionChar count="0"/></div>:
                    <div><ProportionChar  count="6"/></div>
                  }
                </div>
                {window.location.href.includes('showDetails') ?
                  <div className={style.detailWrap}>
                    <div className={style.sumtitle}>各等级网格占比图</div>
                    <div>
                      <ProportionChar count="1"/>
                    </div>
                  </div>
                  :
                  <div>{Xiaoqu}</div>
                }
              </TabPane>
              <TabPane tab="风险评价排序" key="2">
                {/*标题*/}
                <div className={style.itemTitle}>
                  <div className={style.title}>排名</div>
                  <div className={style.title}>网格编码</div>
                  <div className={style.title} onClick={this.paixu.bind(this)}>风险评价
                    {this.state.paixu?
                      <span><img src={Paixu2} alt="排序"/></span>:
                      <span><img src={Paixu1} alt="排序"/></span>
                    }

                  </div>
                  {/*<div className={style.title}></div>*/}
                </div>
                {/*  内容*/}
                <div className={style.detailsContent}>
                  {this.state.rankContent&&this.state.rankContent.data.map((item,index)=>
                    <div key={index} className={style.everyContent} onClick={this.clickGrid.bind(this,item.gridNum)}>
                      {this.state.rankContent.pagination.current==1?
                        <div className={style.item}>{index+1}</div>:
                        <div className={style.item}>{index+1+(Number(this.state.rankContent.pagination.current)-1)*20}</div>
                      }
                      <div className={style.item} >{item.gridNum}</div>
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
                      {/*<div className={style.lookDetails} onClick={this.goDetail.bind(this,item.gridNum)}>查看详情</div>*/}

                    </div>
                  )}
                </div>
                {/*  底部分页*/}
                <div className={style.paging}>
                  <div className={style.nextPage} onClick={this.lastPageMsg.bind(this)}>上一页</div>
                  {this.state.rankContent.pagination?<div>第{this.state.rankContent.pagination.current}页 共{Math.ceil(this.state.rankContent.pagination.total/this.state.rankContent.pagination.pageSize)}页</div>:null}
                  <div className={style.nextPage} onClick={this.getPageMsg.bind(this)}>下一页</div>
                </div>
              </TabPane>
            </Tabs>
            <div className={style.leftTitle} onClick={this.notShow.bind(this)}>图表</div>
          </div>
        }
      </div>

    );
  }
}

export default Leftpart1;



