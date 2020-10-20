import React from 'react';
import style from './style.less'
import Leftpart1 from '../leftPart1/index'
import Rightpart1 from '../rightPart1/index'
import router from 'umi/router'
import ReturnImg from '../../assets/map/return.svg'
import OpenImg from '../../assets/map/openEle.svg'
import CloseImg from '../../assets/map/closeEle.svg'
import * as ajax from '../../framework/tools/ajax/index'
import ChargSmall from '../../assets/map/chargSmall.svg'
import Yinbao from '../../assets/map/yinbao.svg'
import Notwork from '../../assets/map/notwork.svg'
import Inwork from '../../assets/map/inwork.svg'
import EndWork from '../../assets/map/endwork.svg'
import Xiaoqu from '../xiaoqu.json'
import Corrosion from '../../assets/map/corrosion.svg'
import PipeDange from '../../assets/map/pipeDange.svg'
import Breakdown from '../../assets/map/breakdown.svg'

//搜索框
import { Input } from 'antd';
import { message } from 'antd';
import { Cascader } from 'antd';
import GeneDanger from '../../assets/map/geneDanger.svg';
import MajorDanger from '../../assets/map/majorDanger.svg';
import Home from '../../assets/map/home.svg'
import Point from '../../assets/map/point.svg';

const options = [
  {
    value: '管理单位',
    label: '管理单位',
    children: [
      {
        value: '一分',
        label: '一分公司',
      }, {
        value: '二分',
        label: '二分公司'
      },{
        value: '三分',
        label: '三分公司'
      },{
        value: '四分',
        label: '四分公司'
      },
      // {
      //   value: '五分',
      //   label: '五分公司'
      // },
    ],
  },
  {
    value: '行政区域',
    label: '行政区域',
    children: [
      {
        value: '西城区',
        label: '西城区',
      },
      // {
      //   value: '海淀区',
      //   label: '海淀区',
      // },
      // {
      //   value: '丰台区',
      //   label: '丰台区',
      // },
      {
        value: '东城区',
        label: '东城区',
      },
      // {
      //   value: '朝阳区',
      //   label: '朝阳区',
      // },
    ],
  },
  {
    value: '片区',
    label: '片区',
    children: [
      {
        value: '10101',
        label: '10101',
      },
      {
        value: '10102',
        label: '10102',
      },
      // {
      //   value: '10103',
      //   label: '10103',
      // },{
      //   value: '10104',
      //   label: '10104',
      // },{
      //   value: '10105',
      //   label: '10105',
      // },{
      //   value: '10106',
      //   label: '10106',
      // },{
      //   value: '10107',
      //   label: '10107',
      // },{
      //   value: '10108',
      //   label: '10108',
      // },{
      //   value: '10109',
      //   label: '10109',
      // },{
      //   value: '10110',
      //   label: '10110',
      // },{
      //   value: '10201',
      //   label: '10201',
      // },{
      //   value: '10202',
      //   label: '10202',
      // },{
      //   value: '10203',
      //   label: '10203',
      // },{
      //   value: '10204',
      //   label: '10204',
      // },{
      //   value: '10205',
      //   label: '10205',
      // },{
      //   value: '10206',
      //   label: '10206',
      // },{
      //   value: '10207',
      //   label: '10207',
      // },{
      //   value: '10208',
      //   label: '10208',
      // },{
      //   value: '10209',
      //   label: '10209',
      // },{
      //   value: '10210',
      //   label: '10210',
      // },{
      //   value: '1z101',
      //   label: '1z101',
      // },{
      //   value: '1z201',
      //   label: '1z201',
      // },
    ],
  },
  {
    value: '示范区',
    label: '示范区',
    children: [
      {
        value: '城市副中心核心区',
        label: '城市副中心核心区',
      }
    ],
  },
];
let map;
let features=['road', 'building','bg'];
let gridNum,villageName,placeSearch;
let polylineWrap=[],marker2Wrap=[],marker3Wrap=[],marker4Wrap=[],marker5Wrap=[],marker6Wrap=[],marker7Wrap=[],marker8Wrap=[],marker9Wrap=[],marker10Wrap=[];

//删除指定的某个数组中的元素
Array.prototype.indexOf = function(val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

function select(e) {
  // console.log(e.poi.name,'123');
  placeSearch.setCity(e.poi.adcode);
  placeSearch.search(e.poi.name);  //关键字查询查询
}



//去除数组中重复的元素
function removeRepeatArray(arr) {
  return arr.filter(function(item, index, self) {
    return self.indexOf(item) === index;
  });
}


//地图上元素的展示(高德提供的原有元素）
class ShowMapEle extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      isShow1:true,
      isShow2:true,
      isShow3:true,
      isShow4:false,
      isShow5:false,
      isShow6:false,
      isShow7:false,
      isShow8:false,
      isShow9:false,
      isShow10:false,
      isShow11:false,
      isShow12:false,
      isShow13:false,
      chargNum:'',
      protectNum:'',
      dangerNum:'',
      workNum:'',
      endWorkNum:'',
      emergencyNum:'',
      pointNum:'',
    //  底部元素的显示与隐藏的控制
      isShow:true,
      elebtnH:50,
      eleConH:50,
    }
  }

  //添加元素
  addElemap1(e){
    this.setState({
      isShow1:false
    })
    // console.log(this.state.isShow,'这是删除这一款')
    features.remove(e.target.getAttribute('addcount1'));
    map.setFeatures(features);
    // console.log(features);
  }
  //删除元素
  removeElemap1(e){
    this.setState({
      isShow1:true
    })
    // console.log(this.state.isShow,'这是添加这一款')
    features.push(e.target.getAttribute('removecount1'));
    map.setFeatures(features);
    // console.log(features);
  }
  addElemap2(e){
    this.setState({
      isShow2:false
    })
    // console.log(this.state.isShow,'这是删除这一款')
    features.remove(e.target.getAttribute('addcount2'));
    map.setFeatures(features);
    console.log(features);
  }
  //删除元素
  removeElemap2(e){
    this.setState({
      isShow2:true
    })
    // console.log(this.state.isShow,'这是添加这一款')
    features.push(e.target.getAttribute('removecount2'));
    map.setFeatures(features);
    console.log(features);
  }
  addElemap3(e){
    this.setState({
      isShow3:false
    })
    // console.log(this.state.isShow,'这是删除这一款')
    features.remove(e.target.getAttribute('addcount3'));
    map.setFeatures(features);
    console.log(features);
  }
  //删除元素
  removeElemap3(e){
    this.setState({
      isShow3:true
    })
    // console.log(this.state.isShow,'这是添加这一款')
    features.push(e.target.getAttribute('removecount3'));
    map.setFeatures(features);
    console.log(features);
  }


  //添加元素（高德未提供，根据后台返回的经纬度自己标注，地铁）
  otherMapEle(e){
    if(localStorage.getItem('qufen')=='xiaoqu'){
      ajax.get(
        '/rest/facility/point/get/subway/list',
        {
          // villageName:localStorage.getItem('gridNum')
        },
        res=>{
          console.log(res);
          if(res.status==0){
            this.setState({
              isShow4:true
            })
            if(res.data.data.length==0){
              //表示附近没有，改变当前按钮的状态

              // console.log(111);
            }else{
              //表示当前有元素需要渲染，并改变按钮的状态
              const subwayArr=res.data.data;
              let lineIdArr = [];
              for (var i = 0; i < subwayArr.length; i++) {
                lineIdArr.push(subwayArr[i].lineId);
              }
              lineIdArr = removeRepeatArray(lineIdArr);

              var path = [];
              for(var i= 0 ;i <lineIdArr.length;i++){
                var varname="var"+i;
                window[varname]=[];
                for(var j=0;j<subwayArr.length;j++){
                  if(lineIdArr[i]==subwayArr[j].lineId){
                    window[varname].push([(Number(subwayArr[j].pointX) + 9490284.698001146 - 576) / 85854.25448001+0.0007,(Number(subwayArr[j].pointY) + 4136795.7789995605 - 673) / 111271.64309999+0.0003]);
                  }
                }
                path.push(window[varname]);
              }
              for(var i = 0;i<path.length;i++){
                const polyline = new AMap.Polyline({
                  path: path[i],
                  isOutline: true,
                  outlineColor: '#ffeeff',
                  borderWeight: 1,
                  strokeColor: "#A346D1",
                  strokeOpacity: 1,
                  strokeWeight: 3,
                  // 折线样式还支持 'dashed'
                  strokeStyle: "dashed",
                  // strokeStyle是dashed时有效
                  strokeDasharray: [10, 5],
                  lineJoin: 'round',
                  lineCap: 'round',
                  zIndex: 50,
                })
                polyline.setMap(map);
                polylineWrap.push(polyline);
              }
            }
          }else{
            console.log('当前网络质量不佳，请重试')
          }
        }
      )
    }else{
      ajax.get(
        '/rest/facility/point/get/subway/list',
        {
          // num:localStorage.getItem('gridNum')
        },
        res=>{
          console.log(res);
          if(res.status==0){
            this.setState({
              isShow4:true
            })
            if(res.data.data.length==0){
              //表示附近没有，改变当前按钮的状态

              // console.log(111);
            }else{
              //表示当前有元素需要渲染，并改变按钮的状态
              const subwayArr=res.data.data;
              let lineIdArr = [];
              for (var i = 0; i < subwayArr.length; i++) {
                lineIdArr.push(subwayArr[i].lineId);
              }
              lineIdArr = removeRepeatArray(lineIdArr);

              var path = [];
              for(var i= 0 ;i <lineIdArr.length;i++){
                var varname="var"+i;
                window[varname]=[];
                for(var j=0;j<subwayArr.length;j++){
                  if(lineIdArr[i]==subwayArr[j].lineId){
                    window[varname].push([(Number(subwayArr[j].pointX) + 9490284.698001146 - 576) / 85854.25448001+0.0007,(Number(subwayArr[j].pointY) + 4136795.7789995605 - 673) / 111271.64309999]);
                  }
                }
                path.push(window[varname]);
              }
              for(var i = 0;i<path.length;i++){
                const polyline = new AMap.Polyline({
                  path: path[i],
                  isOutline: true,
                  outlineColor: '#ffeeff',
                  borderWeight: 1,
                  strokeColor: "#A346D1",
                  strokeOpacity: 1,
                  strokeWeight: 3,
                  // 折线样式还支持 'dashed'
                  strokeStyle: "dashed",
                  // strokeStyle是dashed时有效
                  strokeDasharray: [10, 5],
                  lineJoin: 'round',
                  lineCap: 'round',
                  zIndex: 50,
                })
                polyline.setMap(map);
                polylineWrap.push(polyline);
              }
            }
          }else{
            console.log('当前网络质量不佳，请重试')
          }
        }
      )
    }

  }
  removeotherMapEle(e){
    console.log('删除');
    this.setState({
      isShow4:false
    })
    map.remove(polylineWrap);
  }


  //铁路
  otherMapEle2(e){
    if(localStorage.getItem('qufen')=='xiaoqu'){
      ajax.get(
        '/rest/facility/point/get/railway/list',
        {
          // villageName:localStorage.getItem('gridNum')
        },
        res=>{
          console.log(res);
          if(res.status==0){
            this.setState({
              isShow5:true
            })
            if(res.data.data.length==0){
              //表示附近没有，改变当前按钮的状态

              // console.log(111);
            }else{
              //表示当前有元素需要渲染，并改变按钮的状态
              const subwayArr=res.data.data;
              let path=[];
              let lineIdArr = [];
              for (var i = 0; i < subwayArr.length; i++) {
                lineIdArr.push(subwayArr[i].lineId);
              }
              lineIdArr = removeRepeatArray(lineIdArr);
              for(var i= 0 ;i <lineIdArr.length;i++){
                var varname="var"+i;
                window[varname]=[];
                for(var j=0;j<subwayArr.length;j++){
                  if(lineIdArr[i]==subwayArr[j].lineId){
                    window[varname].push([(Number(subwayArr[j].pointX) + 9490284.698001146 - 576) / 85854.25448001+0.0007,(Number(subwayArr[j].pointY) + 4136795.7789995605 - 673) / 111271.64309999+0.0002]);
                  }
                }
                path.push(window[varname]);
              }
              console.log(path,'path');
              for(var i = 0;i<path.length;i++){
                const polyline = new AMap.Polyline({
                  path: path[i],
                  isOutline: true,
                  outlineColor: '#ffeeff',
                  borderWeight: 1,
                  strokeColor: "#188B18",
                  strokeOpacity: 1,
                  strokeWeight: 3,
                  // 折线样式还支持 'dashed'
                  strokeStyle: "dashed",
                  // strokeStyle是dashed时有效
                  strokeDasharray: [10, 5],
                  lineJoin: 'round',
                  lineCap: 'round',
                  zIndex: 50,
                })
                polyline.setMap(map);
                marker2Wrap.push(polyline);
              }
            }
          }else{
            console.log('当前网络质量不佳，请重试')
          }
        }
      )
    }else{
      ajax.get(
        '/rest/facility/point/get/railway/list',
        {
          // num:localStorage.getItem('gridNum')
        },
        res=>{
          console.log(res);
          if(res.status==0){
            this.setState({
              isShow5:true
            })
            if(res.data.data.length==0){
              //表示附近没有，改变当前按钮的状态

              // console.log(111);
            }else{
              //表示当前有元素需要渲染，并改变按钮的状态
              const subwayArr=res.data.data;
              let path=[];
              let lineIdArr = [];
              for (var i = 0; i < subwayArr.length; i++) {
                lineIdArr.push(subwayArr[i].lineId);
              }
              lineIdArr = removeRepeatArray(lineIdArr);
              for(var i= 0 ;i <lineIdArr.length;i++){
                var varname="var"+i;
                window[varname]=[];
                for(var j=0;j<subwayArr.length;j++){
                  if(lineIdArr[i]==subwayArr[j].lineId){
                    window[varname].push([(Number(subwayArr[j].pointX) + 9490284.698001146 - 576) / 85854.25448001+0.0007,(Number(subwayArr[j].pointY) + 4136795.7789995605 - 673) / 111271.64309999+0.0002]);
                  }
                }
                path.push(window[varname]);
              }
              console.log(path,'path');
              for(var i = 0;i<path.length;i++){
                const polyline = new AMap.Polyline({
                  path: path[i],
                  isOutline: true,
                  outlineColor: '#ffeeff',
                  borderWeight: 1,
                  strokeColor: "#188B18",
                  strokeOpacity: 1,
                  strokeWeight: 3,
                  // 折线样式还支持 'dashed'
                  strokeStyle: "dashed",
                  // strokeStyle是dashed时有效
                  strokeDasharray: [10, 5],
                  lineJoin: 'round',
                  lineCap: 'round',
                  zIndex: 50,
                })
                polyline.setMap(map);
                marker2Wrap.push(polyline);
              }
            }
          }else{
            console.log('当前网络质量不佳，请重试')
          }
        }
      )
    }
  }
  removeotherMapEle2(e){
    console.log('删除');
    this.setState({
      isShow5:false
    })
    map.remove(marker2Wrap);
  }

  //无轨电车
  otherMapEle3(e){
    if(localStorage.getItem('qufen')=='xiaoqu'){
      ajax.get(
        '/rest/facility/point/get/trolley/list',
        {
          // villageName:localStorage.getItem('gridNum')
        },
        res=>{
          console.log(res);
          if(res.status==0){
            this.setState({
              isShow6:true
            })
            if(res.data.data.length==0){
              //表示附近没有，改变当前按钮的状态
            }else{
              //表示当前有元素需要渲染，并改变按钮的状态
              const subwayArr = res.data.data;
              let lineIdArr = [];
              for (var i = 0; i < subwayArr.length; i++) {
                lineIdArr.push(subwayArr[i].lineId);
              }
              lineIdArr = removeRepeatArray(lineIdArr);
              var path = [];
              for(var i= 0 ;i <lineIdArr.length;i++){
                var varname="var"+i;
                window[varname]=[];
                for(var j=0;j<subwayArr.length;j++){
                  if(lineIdArr[i]==subwayArr[j].lineId){
                    window[varname].push([(Number(subwayArr[j].pointX) + 9490284.698001146 - 576) / 85854.25448001+0.0007,(Number(subwayArr[j].pointY) + 4136795.7789995605 - 673) / 111271.64309999+0.0002]);
                  }
                }
                path.push(window[varname]);
              }
              for(var i = 0;i<path.length;i++){
                const polyline = new AMap.Polyline({
                  path: path[i],
                  isOutline: true,
                  outlineColor: '#ffeeff',
                  borderWeight: 1,
                  strokeColor: "#191919",
                  strokeOpacity: 1,
                  strokeWeight: 3,
                  // 折线样式还支持 'dashed'
                  strokeStyle: "dashed",
                  // strokeStyle是dashed时有效
                  strokeDasharray: [10, 5],
                  lineJoin: 'round',
                  lineCap: 'round',
                  zIndex: 50,
                })
                polyline.setMap(map);
                marker3Wrap.push(polyline);
              }
            }
          }else{
            console.log('当前网络质量不佳，请重试')
          }
        }
      )
    }else{
      ajax.get(
        '/rest/facility/point/get/trolley/list',
        {
          // num:localStorage.getItem('gridNum')
        },
        res=>{
          console.log(res);
          if(res.status==0){
            this.setState({
              isShow6:true
            })
            if(res.data.data.length==0){
              //表示附近没有，改变当前按钮的状态
            }else{
              //表示当前有元素需要渲染，并改变按钮的状态
              const subwayArr = res.data.data;
              let lineIdArr = [];
              for (var i = 0; i < subwayArr.length; i++) {
                lineIdArr.push(subwayArr[i].lineId);
              }
              lineIdArr = removeRepeatArray(lineIdArr);
              var path = [];
              for(var i= 0 ;i <lineIdArr.length;i++){
                var varname="var"+i;
                window[varname]=[];
                for(var j=0;j<subwayArr.length;j++){
                  if(lineIdArr[i]==subwayArr[j].lineId){
                    window[varname].push([(Number(subwayArr[j].pointX) + 9490284.698001146 - 576) / 85854.25448001+0.0007,(Number(subwayArr[j].pointY) + 4136795.7789995605 - 673) / 111271.64309999+0.0002]);
                  }
                }
                path.push(window[varname]);
              }
              for(var i = 0;i<path.length;i++){
                const polyline = new AMap.Polyline({
                  path: path[i],
                  isOutline: true,
                  outlineColor: '#ffeeff',
                  borderWeight: 1,
                  strokeColor: "#191919",
                  strokeOpacity: 1,
                  strokeWeight: 3,
                  // 折线样式还支持 'dashed'
                  strokeStyle: "dashed",
                  // strokeStyle是dashed时有效
                  strokeDasharray: [10, 5],
                  lineJoin: 'round',
                  lineCap: 'round',
                  zIndex: 50,
                })
                polyline.setMap(map);
                marker3Wrap.push(polyline);
              }
            }
          }else{
            console.log('当前网络质量不佳，请重试')
          }
        }
      )
    }
  }
  removeotherMapEle3(e){
    console.log('删除');
    this.setState({
      isShow6:false
    })
    map.remove(marker3Wrap);
  }

  //充电桩
  otherMapEle4(e){
    if(localStorage.getItem('qufen')=='xiaoqu'){
      ajax.get(
        '/rest/facility/point/get/charg/list',
        {
          villageName:localStorage.getItem('gridNum')
        },
        res=>{
          console.log(res);
          if(res.status==0){
            this.setState({
              isShow7:true,
              chargNum:res.data.data.length
            })
            if(res.data.data.length==0){
              //表示附近没有，改变当前按钮的状态

              // console.log(111);
            }else{
              //表示当前有元素需要渲染，并改变按钮的状态
              const subwayArr=res.data.data;
              // console.log(subwayArr,'这是充电桩');
              // const subwayArr=[{copoId: 400, facilityId: 3, pointX: 306057.785582, pointY: 500233.262723, gridNum: 1529},{copoId: 1603, facilityId: 3, pointX: 306052.567671, pointY: 500246.941515, gridNum: 1529}]
              for(var i = 0; i <subwayArr.length;i++){
                var pointX=Number((Number(subwayArr[i].pointX) + 9490284.698001146 - 576) / 85854.25448001+0.0007).toFixed(6);
                var pointY= Number((Number(subwayArr[i].pointY) + 4136795.7789995605 - 673) / 111271.64309999+0.0002).toFixed(6);
                console.log(pointX,pointY);
                const marker4 = new AMap.Marker({
                  icon: ChargSmall,
                  position: [pointX, pointY]
                  // positional:[116.35839470631186,39.921058395874084]
                  // 116.35839470631186, 39.921058395874084
                });
                map.add(marker4);
                marker4Wrap.push(marker4);
              }
            }
          }else{
            console.log('当前网络质量不佳，请重试')
          }
        }
      )
    }else{
      ajax.get(
        '/rest/facility/point/get/charg/list',
        {
          num:localStorage.getItem('gridNum')
        },
        res=>{
          console.log(res);
          if(res.status==0){
            this.setState({
              isShow7:true,
              chargNum:res.data.data.length
            })
            if(res.data.data.length==0){
              //表示附近没有，改变当前按钮的状态

              // console.log(111);
            }else{
              //表示当前有元素需要渲染，并改变按钮的状态
              const subwayArr=res.data.data;
              // console.log(subwayArr,'这是充电桩');
              // const subwayArr=[{copoId: 400, facilityId: 3, pointX: 306057.785582, pointY: 500233.262723, gridNum: 1529},{copoId: 1603, facilityId: 3, pointX: 306052.567671, pointY: 500246.941515, gridNum: 1529}]
              for(var i = 0; i <subwayArr.length;i++){
                var pointX=Number((Number(subwayArr[i].pointX) + 9490284.698001146 - 576) / 85854.25448001+0.0007).toFixed(6);
                var pointY= Number((Number(subwayArr[i].pointY) + 4136795.7789995605 - 673) / 111271.64309999+0.0002).toFixed(6);
                console.log(pointX,pointY);
                const marker4 = new AMap.Marker({
                  icon: ChargSmall,
                  position: [pointX, pointY]
                  // positional:[116.35839470631186,39.921058395874084]
                  // 116.35839470631186, 39.921058395874084
                });
                map.add(marker4);
                marker4Wrap.push(marker4);
              }
            }
          }else{
            console.log('当前网络质量不佳，请重试')
          }
        }
      )
    }
  }
  removeotherMapEle4(e){
    this.setState({
      isShow7:false
    })
    map.remove(marker4Wrap);
  }

  //阴保
  otherMapEle5(e){
    if(localStorage.getItem('qufen')=='xiaoqu'){
      ajax.get(
        '/rest/corros/cathod/prot/get/points',
        {
          villageName:localStorage.getItem('gridNum')
        },
        res=>{
          console.log(res);
          if(res.status==0){
            this.setState({
              isShow8:true,
              protectNum:res.data.data.length
            })
            if(res.data.data.length==0){
              //表示附近没有，改变当前按钮的状态

              // console.log(111);
            }else{
              //表示当前有元素需要渲染，并改变按钮的状态
              const subwayArr=res.data.data;
              // console.log(subwayArr,'这是充电桩');
              // const subwayArr=[{copoId: 400, facilityId: 3, pointX: 306057.785582, pointY: 500233.262723, gridNum: 1529},{copoId: 1603, facilityId: 3, pointX: 306052.567671, pointY: 500246.941515, gridNum: 1529}]
              for(var i = 0; i <subwayArr.length;i++){
                var pointX=Number((Number(subwayArr[i].pointX) + 9490284.698001146 - 576) / 85854.25448001+0.0007).toFixed(6);
                var pointY= Number((Number(subwayArr[i].pointY) + 4136795.7789995605 - 673) / 111271.64309999+0.0002).toFixed(6);
                // console.log(pointX,pointY);
                const marker5 = new AMap.Marker({
                  icon: Yinbao,
                  position: [pointX, pointY]
                  // positional:[116.35839470631186,39.921058395874084]
                  // 116.35839470631186, 39.921058395874084
                });
                map.add(marker5);
                marker5Wrap.push(marker5);
              }
            }
          }else{
            console.log('当前网络质量不佳，请重试')
          }
        }
      )
    }else{
      ajax.get(
        '/rest/corros/cathod/prot/get/points',
        {
          num:localStorage.getItem('gridNum')
        },
        res=>{
          console.log(res);
          if(res.status==0){
            this.setState({
              isShow8:true,
              protectNum:res.data.data.length
            })
            if(res.data.data.length==0){
              //表示附近没有，改变当前按钮的状态

              // console.log(111);
            }else{
              //表示当前有元素需要渲染，并改变按钮的状态
              const subwayArr=res.data.data;
              // console.log(subwayArr,'这是充电桩');
              // const subwayArr=[{copoId: 400, facilityId: 3, pointX: 306057.785582, pointY: 500233.262723, gridNum: 1529},{copoId: 1603, facilityId: 3, pointX: 306052.567671, pointY: 500246.941515, gridNum: 1529}]
              for(var i = 0; i <subwayArr.length;i++){
                var pointX=Number((Number(subwayArr[i].pointX) + 9490284.698001146 - 576) / 85854.25448001+0.0007).toFixed(6);
                var pointY= Number((Number(subwayArr[i].pointY) + 4136795.7789995605 - 673) / 111271.64309999+0.0002).toFixed(6);
                // console.log(pointX,pointY);
                const marker5 = new AMap.Marker({
                  icon: Yinbao,
                  position: [pointX, pointY]
                  // positional:[116.35839470631186,39.921058395874084]
                  // 116.35839470631186, 39.921058395874084
                });
                map.add(marker5);
                marker5Wrap.push(marker5);
              }
            }
          }else{
            console.log('当前网络质量不佳，请重试')
          }
        }
      )
    }
  }
  removeotherMapEle5(e){
    this.setState({
      isShow8:false
    })
    map.remove(marker5Wrap);
  }

  //隐患
  otherMapEle6(e){
    if(localStorage.getItem('qufen')=='xiaoqu'){
      ajax.get(
        '/rest/hid/trouble/get/point/list',
        {
          villageName:localStorage.getItem('gridNum')
        },
        res=>{
          console.log(res);
          if(res.status==0){
            this.setState({
              isShow9:true,
              dangerNum:res.data.data.length
            })
            if(res.data.data.length==0){
              //表示附近没有，改变当前按钮的状态

              // console.log(111);
            }else{
              //表示当前有元素需要渲染，并改变按钮的状态
              const subwayArr=res.data.data;
              // console.log(subwayArr,'这是充电桩');
              // const subwayArr=[{copoId: 400, facilityId: 3, pointX: 306057.785582, pointY: 500233.262723, gridNum: 1529},{copoId: 1603, facilityId: 3, pointX: 306052.567671, pointY: 500246.941515, gridNum: 1529}]
              for(var i = 0; i <subwayArr.length;i++){
                var pointX=Number((Number(subwayArr[i].pointX) + 9490284.698001146 - 576) / 85854.25448001+0.0007).toFixed(6);
                var pointY= Number((Number(subwayArr[i].pointY) + 4136795.7789995605 - 673) / 111271.64309999+0.0002).toFixed(6);
                if(subwayArr[i].status=='一般'){
                  const marker6 = new AMap.Marker({
                    icon: GeneDanger,
                    position: [pointX, pointY]
                  });
                  map.add(marker6);
                  marker6Wrap.push(marker6);
                }else{
                  const marker6 = new AMap.Marker({
                    icon: MajorDanger,
                    position: [pointX, pointY]
                  });
                  map.add(marker6);
                  marker6Wrap.push(marker6);
                }
              }
            }
          }else{
            console.log('当前网络质量不佳，请重试')
          }
        }
      )
    }else{
      ajax.get(
        '/rest/hid/trouble/get/point/list',
        {
          num:localStorage.getItem('gridNum')
        },
        res=>{
          console.log(res);
          if(res.status==0){
            this.setState({
              isShow9:true,
              dangerNum:res.data.data.length
            })
            if(res.data.data.length==0){
              //表示附近没有，改变当前按钮的状态

              // console.log(111);
            }else{
              //表示当前有元素需要渲染，并改变按钮的状态
              const subwayArr=res.data.data;
              // console.log(subwayArr,'这是充电桩');
              // const subwayArr=[{copoId: 400, facilityId: 3, pointX: 306057.785582, pointY: 500233.262723, gridNum: 1529},{copoId: 1603, facilityId: 3, pointX: 306052.567671, pointY: 500246.941515, gridNum: 1529}]
              for(var i = 0; i <subwayArr.length;i++){
                var pointX=Number((Number(subwayArr[i].pointX) + 9490284.698001146 - 576) / 85854.25448001+0.0007).toFixed(6);
                var pointY= Number((Number(subwayArr[i].pointY) + 4136795.7789995605 - 673) / 111271.64309999+0.0002).toFixed(6);
                if(subwayArr[i].status=='一般'){
                  const marker6 = new AMap.Marker({
                    icon: GeneDanger,
                    position: [pointX, pointY]
                  });
                  map.add(marker6);
                  marker6Wrap.push(marker6);
                }else{
                  const marker6 = new AMap.Marker({
                    icon: MajorDanger,
                    position: [pointX, pointY]
                  });
                  map.add(marker6);
                  marker6Wrap.push(marker6);
                }
              }
            }
          }else{
            console.log('当前网络质量不佳，请重试')
          }
        }
      )
    }
  }
  removeotherMapEle6(e){

    this.setState({
      isShow9:false
    })
    map.remove(marker6Wrap);

  }

  //进行施工
  otherMapEle7(e){
    if(localStorage.getItem('qufen')=='xiaoqu'){
      ajax.get(
        '/rest/roadwork/get/work/in',
        {
          villageName:localStorage.getItem('gridNum')
        },
        res=>{
          console.log(res);
          if(res.status==0){
            this.setState({
              isShow10:true,
              workNum:res.data.data.length
            })
            if(res.data.data.length==0){
              //表示附近没有，改变当前按钮的状态
            }else{
              //表示当前有元素需要渲染，并改变按钮的状态
              const subwayArr=res.data.data;
              // console.log(subwayArr,'这是充电桩');
              // const subwayArr=[{copoId: 400, facilityId: 3, pointX: 306057.785582, pointY: 500233.262723, gridNum: 1529},{copoId: 1603, facilityId: 3, pointX: 306052.567671, pointY: 500246.941515, gridNum: 1529}]
              for(var i = 0; i <subwayArr.length;i++){
                var pointX=Number((Number(subwayArr[i].pointX) + 9490284.698001146 - 576) / 85854.25448001+0.0007).toFixed(6);
                var pointY= Number((Number(subwayArr[i].pointY) + 4136795.7789995605 - 673) / 111271.64309999+0.0002).toFixed(6);
                // console.log(pointX,pointY);
                const marker7 = new AMap.Marker({
                  icon: Inwork,
                  position: [pointX, pointY]
                  // positional:[116.35839470631186,39.921058395874084]
                  // 116.35839470631186, 39.921058395874084
                });
                map.add(marker7);
                marker7Wrap.push(marker7);
              }
            }
          }else{
            console.log('当前网络质量不佳，请重试')
          }
        }
      )
    }else{
      ajax.get(
        '/rest/roadwork/get/work/in',
        {
          gridNum:localStorage.getItem('gridNum')
        },
        res=>{
          console.log(res);
          if(res.status==0){
            this.setState({
              isShow10:true,
              workNum:res.data.data.length
            })
            if(res.data.data.length==0){
              //表示附近没有，改变当前按钮的状态
            }else{
              //表示当前有元素需要渲染，并改变按钮的状态
              const subwayArr=res.data.data;
              // console.log(subwayArr,'这是充电桩');
              // const subwayArr=[{copoId: 400, facilityId: 3, pointX: 306057.785582, pointY: 500233.262723, gridNum: 1529},{copoId: 1603, facilityId: 3, pointX: 306052.567671, pointY: 500246.941515, gridNum: 1529}]
              for(var i = 0; i <subwayArr.length;i++){
                var pointX=Number((Number(subwayArr[i].pointX) + 9490284.698001146 - 576) / 85854.25448001+0.0007).toFixed(6);
                var pointY= Number((Number(subwayArr[i].pointY) + 4136795.7789995605 - 673) / 111271.64309999+0.0002).toFixed(6);
                // console.log(pointX,pointY);
                const marker7 = new AMap.Marker({
                  icon: Inwork,
                  position: [pointX, pointY]
                  // positional:[116.35839470631186,39.921058395874084]
                  // 116.35839470631186, 39.921058395874084
                });
                map.add(marker7);
                marker7Wrap.push(marker7);
              }
            }
          }else{
            console.log('当前网络质量不佳，请重试')
          }
        }
      )
    }
  }
  removeotherMapEle7(e){

    this.setState({
      isShow10:false
    })
    map.remove(marker7Wrap);
  }

  //结束施工
  otherMapEle8(e){
    if(localStorage.getItem('qufen')=='xiaoqu'){
      ajax.get(
        '/rest/roadwork/get/work/end',
        {
          villageName:localStorage.getItem('gridNum')
        },
        res=>{
          console.log(res);
          if(res.status==0){
            this.setState({
              isShow11:true,
              endWorkNum:res.data.data.length
            })
            if(res.data.data.length==0){
              //表示附近没有，改变当前按钮的状态
            }else{
              //表示当前有元素需要渲染，并改变按钮的状态
              const subwayArr=res.data.data;
              // console.log(subwayArr,'这是充电桩');
              // const subwayArr=[{copoId: 400, facilityId: 3, pointX: 306057.785582, pointY: 500233.262723, gridNum: 1529},{copoId: 1603, facilityId: 3, pointX: 306052.567671, pointY: 500246.941515, gridNum: 1529}]
              for(var i = 0; i <subwayArr.length;i++){
                var pointX=Number((Number(subwayArr[i].pointX) + 9490284.698001146 - 576) / 85854.25448001+0.0007).toFixed(6);
                var pointY= Number((Number(subwayArr[i].pointY) + 4136795.7789995605 - 673) / 111271.64309999+0.0002).toFixed(6);
                // console.log(pointX,pointY);
                const marker8 = new AMap.Marker({
                  icon: EndWork,
                  position: [pointX, pointY]
                  // positional:[116.35839470631186,39.921058395874084]
                  // 116.35839470631186, 39.921058395874084
                });
                map.add(marker8);
                marker8Wrap.push(marker8);
              }
            }
          }else{
            console.log('当前网络质量不佳，请重试')
          }
        }
      )
    }else{
      ajax.get(
        '/rest/roadwork/get/work/end',
        {
          gridNum:localStorage.getItem('gridNum')
        },
        res=>{
          console.log(res);
          if(res.status==0){
            this.setState({
              isShow11:true,
              endWorkNum:res.data.data.length
            })
            if(res.data.data.length==0){
              //表示附近没有，改变当前按钮的状态
            }else{
              //表示当前有元素需要渲染，并改变按钮的状态
              const subwayArr=res.data.data;
              // console.log(subwayArr,'这是充电桩');
              // const subwayArr=[{copoId: 400, facilityId: 3, pointX: 306057.785582, pointY: 500233.262723, gridNum: 1529},{copoId: 1603, facilityId: 3, pointX: 306052.567671, pointY: 500246.941515, gridNum: 1529}]
              for(var i = 0; i <subwayArr.length;i++){
                var pointX=Number((Number(subwayArr[i].pointX) + 9490284.698001146 - 576) / 85854.25448001+0.0007).toFixed(6);
                var pointY= Number((Number(subwayArr[i].pointY) + 4136795.7789995605 - 673) / 111271.64309999+0.0002).toFixed(6);
                // console.log(pointX,pointY);
                const marker8 = new AMap.Marker({
                  icon: EndWork,
                  position: [pointX, pointY]
                  // positional:[116.35839470631186,39.921058395874084]
                  // 116.35839470631186, 39.921058395874084
                });
                map.add(marker8);
                marker8Wrap.push(marker8);
              }
            }
          }else{
            console.log('当前网络质量不佳，请重试')
          }
        }
      )
    }
  }
  removeotherMapEle8(e){

    this.setState({
      isShow11:false
    })
    map.remove(marker8Wrap);
  }

  //应急事件
  otherMapEle9(e){
    if(localStorage.getItem('qufen')=='xiaoqu'){
      ajax.get(
        '/rest/hid/event/get/point',
        {
          villageName:localStorage.getItem('gridNum')
        },
        res=>{
          console.log(res);
          if(res.status==0){
            this.setState({
              isShow12:true,
              emergencyNum:res.data.data.length
            })
            if(res.data.data.length==0){
              //表示附近没有，改变当前按钮的状态
            }else{
              //表示当前有元素需要渲染，并改变按钮的状态
              const subwayArr=res.data.data;
              // console.log(subwayArr,'这是充电桩');
              // const subwayArr=[{copoId: 400, facilityId: 3, pointX: 306057.785582, pointY: 500233.262723, gridNum: 1529},{copoId: 1603, facilityId: 3, pointX: 306052.567671, pointY: 500246.941515, gridNum: 1529}]
              for(var i = 0; i <subwayArr.length;i++){
                var pointX=Number((Number(subwayArr[i].pointX) + 9490284.698001146 - 576) / 85854.25448001+0.0007).toFixed(6);
                var pointY= Number((Number(subwayArr[i].pointY) + 4136795.7789995605 - 673) / 111271.64309999+0.0002).toFixed(6);
                if(subwayArr[i].eventType=='外管线第三方破坏事件'){
                  const marker9 = new AMap.Marker({
                    icon: Breakdown,
                    position: [pointX, pointY]
                  });
                  map.add(marker9);
                  marker9Wrap.push(marker9);
                }else if(subwayArr[i].eventType=='外管线腐蚀泄漏事件'){
                  const marker9 = new AMap.Marker({
                    icon: Corrosion,
                    position: [pointX, pointY]
                  });
                  map.add(marker9);
                  marker9Wrap.push(marker9);
                }else{
                  const marker9 = new AMap.Marker({
                    icon: PipeDange,
                    position: [pointX, pointY]
                  });
                  map.add(marker9);
                  marker9Wrap.push(marker9);
                }

              }
            }
          }else{
            console.log('当前网络质量不佳，请重试')
          }
        }
      )
    }else{
      ajax.get(
        '/rest/hid/event/get/point',
        {
          num:localStorage.getItem('gridNum')
        },
        res=>{
          console.log(res);
          if(res.status==0){
            this.setState({
              isShow12:true,
              emergencyNum:res.data.data.length
            })
            if(res.data.data.length==0){
              //表示附近没有，改变当前按钮的状态
            }else{
              //表示当前有元素需要渲染，并改变按钮的状态
              const subwayArr=res.data.data;
              // console.log(subwayArr,'这是充电桩');
              // const subwayArr=[{copoId: 400, facilityId: 3, pointX: 306057.785582, pointY: 500233.262723, gridNum: 1529},{copoId: 1603, facilityId: 3, pointX: 306052.567671, pointY: 500246.941515, gridNum: 1529}]
              for(var i = 0; i <subwayArr.length;i++){
                var pointX=Number((Number(subwayArr[i].pointX) + 9490284.698001146 - 576) / 85854.25448001+0.0007).toFixed(6);
                var pointY= Number((Number(subwayArr[i].pointY) + 4136795.7789995605 - 673) / 111271.64309999+0.0002).toFixed(6);
                if(subwayArr[i].eventType=='外管线第三方破坏事件'){
                  const marker9 = new AMap.Marker({
                    icon: Breakdown,
                    position: [pointX, pointY]
                  });
                  map.add(marker9);
                  marker9Wrap.push(marker9);
                }else if(subwayArr[i].eventType=='外管线腐蚀泄漏事件'){
                  const marker9 = new AMap.Marker({
                    icon: Corrosion,
                    position: [pointX, pointY]
                  });
                  map.add(marker9);
                  marker9Wrap.push(marker9);
                }else{
                  const marker9 = new AMap.Marker({
                    icon: PipeDange,
                    position: [pointX, pointY]
                  });
                  map.add(marker9);
                  marker9Wrap.push(marker9);
                }

              }
            }
          }else{
            console.log('当前网络质量不佳，请重试')
          }
        }
      )
    }
  }
  removeotherMapEle9(e){
    this.setState({
      isShow12:false
    })
    map.remove(marker9Wrap);
  }

  //防腐层破损点
  otherMapEle10(e){
    if(localStorage.getItem('qufen')=='xiaoqu'){
      ajax.get(
        '/rest/coat/get/point',
        {
          villageName:localStorage.getItem('gridNum')
        },
        res=>{
          console.log(res);
          if(res.status==0){
            this.setState({
              isShow13:true,
              pointNum:res.data.data.length
            })
            if(res.data.data.length==0){
              //表示附近没有，改变当前按钮的状态
            }else{
              //表示当前有元素需要渲染，并改变按钮的状态
              const subwayArr=res.data.data;
              // console.log(subwayArr,'这是充电桩');
              // const subwayArr=[{copoId: 400, facilityId: 3, pointX: 306057.785582, pointY: 500233.262723, gridNum: 1529},{copoId: 1603, facilityId: 3, pointX: 306052.567671, pointY: 500246.941515, gridNum: 1529}]
              for(var i = 0; i <subwayArr.length;i++){
                var pointX=Number((Number(subwayArr[i].pointX) + 9490284.698001146 - 576) / 85854.25448001+0.0007).toFixed(6);
                var pointY= Number((Number(subwayArr[i].pointY) + 4136795.7789995605 - 673) / 111271.64309999+0.0002).toFixed(6);
                // console.log(pointX,pointY);
                const marker10 = new AMap.Marker({
                  icon: Point,
                  position: [pointX, pointY]
                  // positional:[116.35839470631186,39.921058395874084]
                  // 116.35839470631186, 39.921058395874084
                });
                map.add(marker10);
                marker10Wrap.push(marker10);
              }
            }
          }else{
            console.log('当前网络质量不佳，请重试')
          }
        }
      )
    }else{
      ajax.get(
        '/rest/coat/get/point',
        {
          num:localStorage.getItem('gridNum')
        },
        res=>{
          console.log(res);
          if(res.status==0){
            this.setState({
              isShow13:true,
              pointNum:res.data.data.length
            })
            if(res.data.data.length==0){
              //表示附近没有，改变当前按钮的状态
            }else{
              //表示当前有元素需要渲染，并改变按钮的状态
              const subwayArr=res.data.data;
              // console.log(subwayArr,'这是充电桩');
              // const subwayArr=[{copoId: 400, facilityId: 3, pointX: 306057.785582, pointY: 500233.262723, gridNum: 1529},{copoId: 1603, facilityId: 3, pointX: 306052.567671, pointY: 500246.941515, gridNum: 1529}]
              for(var i = 0; i <subwayArr.length;i++){
                var pointX=Number((Number(subwayArr[i].pointX) + 9490284.698001146 - 576) / 85854.25448001+0.0007).toFixed(6);
                var pointY= Number((Number(subwayArr[i].pointY) + 4136795.7789995605 - 673) / 111271.64309999+0.0002).toFixed(6);
                // console.log(pointX,pointY);
                const marker10 = new AMap.Marker({
                  icon: Point,
                  position: [pointX, pointY]
                  // positional:[116.35839470631186,39.921058395874084]
                  // 116.35839470631186, 39.921058395874084
                });
                map.add(marker10);
                marker10Wrap.push(marker10);
              }
            }
          }else{
            console.log('当前网络质量不佳，请重试')
          }
        }
      )
    }
  }
  removeotherMapEle10(e){
    this.setState({
      isShow13:false
    })
    map.remove(marker10Wrap);
  }


  //关闭底部元素
  closeBottom(e){
    if(this.state.isShow){
      this.setState({
        elebtnH:0,
        eleConH:0,
        isShow:false
      })
    }else{
      this.setState({
        elebtnH:50,
        eleConH:50,
        isShow:true
      })
    }
  }




  render() {
    return(
      <div>
        <div className={style.bottomWrap}>
          <div className={style.eleBtn} style={{bottom:this.state.elebtnH}} onClick={this.closeBottom.bind(this)}>元素</div>
          <div style={{height:this.state.eleConH}} className={style.eleContainer}>
            <div className={style.title}>元素控制：</div>
            <div className={style.eleWrap}>
              <div className={style.imgWrap}>
                <div className={style.eleName}>街道</div>
                {this.state.isShow1?
                  <img className={style.eleMap} src={OpenImg} addcount1={'road'} onClick={this.addElemap1.bind(this)} alt="添加"/>:
                  <img className={style.eleMap} src={CloseImg} removecount1={'road'} onClick={this.removeElemap1.bind(this)} alt="删除"/>}
              </div>
              <div className={style.imgWrap}>
                <div className={style.eleName}>小区</div>
                {this.state.isShow2?
                  <img className={style.eleMap} src={OpenImg} addcount2={'building'} onClick={this.addElemap2.bind(this)} alt="添加"/>:
                  <img className={style.eleMap} src={CloseImg} removecount2={'building'} onClick={this.removeElemap2.bind(this)} alt="删除"/>}
              </div>
              <div className={style.imgWrap}>
                <div className={style.eleName}>水系</div>
                {this.state.isShow3?
                  <img className={style.eleMap} src={OpenImg} addcount3={'bg'} onClick={this.addElemap3.bind(this)} alt="添加"/>:
                  <img className={style.eleMap} src={CloseImg} removecount3={'bg'} onClick={this.removeElemap3.bind(this)} alt="删除"/>}
              </div>
              <div className={style.imgWrap}>
                <div className={style.eleName}>地铁</div>
                {this.state.isShow4?
                  <img className={style.eleMap} src={OpenImg}  onClick={this.removeotherMapEle.bind(this)} alt="添加"/>:
                  <img className={style.eleMap} src={CloseImg} onClick={this.otherMapEle.bind(this)} alt="删除"/>
                }
              </div>
              <div className={style.imgWrap}>
                <div className={style.eleName}>铁路</div>
                {this.state.isShow5?
                  <img className={style.eleMap} src={OpenImg}  onClick={this.removeotherMapEle2.bind(this)} alt="添加"/>:
                  <img className={style.eleMap} src={CloseImg} onClick={this.otherMapEle2.bind(this)} alt="删除"/>
                }
              </div>
              <div className={style.imgWrap}>
                <div className={style.eleName}>无轨电车</div>
                {this.state.isShow6?
                  <img className={style.eleMap} src={OpenImg}  onClick={this.removeotherMapEle3.bind(this)} alt="添加"/>:
                  <img className={style.eleMap} src={CloseImg} onClick={this.otherMapEle3.bind(this)} alt="删除"/>
                }
              </div>
              <div className={style.imgWrap}>
                <div className={style.eleName}>充电桩</div>
                {this.state.isShow7?
                  <img className={style.eleMap} src={OpenImg}  onClick={this.removeotherMapEle4.bind(this)} alt="添加"/>:
                  <img className={style.eleMap} src={CloseImg} onClick={this.otherMapEle4.bind(this)} alt="删除"/>
                }
              </div>
              <div className={style.imgWrap}>
                <div className={style.eleName}>有效阴保</div>
                {this.state.isShow8?
                  <img className={style.eleMap} src={OpenImg}  onClick={this.removeotherMapEle5.bind(this)} alt="添加"/>:
                  <img className={style.eleMap} src={CloseImg} onClick={this.otherMapEle5.bind(this)} alt="删除"/>
                }
              </div>
              <div className={style.imgWrap}>
                <div className={style.eleName}>隐患</div>
                {this.state.isShow9?
                  <img className={style.eleMap} src={OpenImg}  onClick={this.removeotherMapEle6.bind(this)} alt="添加"/>:
                  <img className={style.eleMap} src={CloseImg} onClick={this.otherMapEle6.bind(this)} alt="删除"/>
                }
              </div>
              <div className={style.imgWrap}>
                <div className={style.eleName}>进行中施工</div>
                {this.state.isShow10?
                  <img className={style.eleMap} src={OpenImg}  onClick={this.removeotherMapEle7.bind(this)} alt="添加"/>:
                  <img className={style.eleMap} src={CloseImg} onClick={this.otherMapEle7.bind(this)} alt="删除"/>
                }
              </div>
              <div className={style.imgWrap}>
                <div className={style.eleName}>已结束施工</div>
                {this.state.isShow11?
                  <img className={style.eleMap} src={OpenImg}  onClick={this.removeotherMapEle8.bind(this)} alt="添加"/>:
                  <img className={style.eleMap} src={CloseImg} onClick={this.otherMapEle8.bind(this)} alt="删除"/>
                }
              </div>
              <div className={style.imgWrap}>
                <div className={style.eleName}>应急事件</div>
                {this.state.isShow12?
                  <img className={style.eleMap} src={OpenImg}  onClick={this.removeotherMapEle9.bind(this)} alt="添加"/>:
                  <img className={style.eleMap} src={CloseImg} onClick={this.otherMapEle9.bind(this)} alt="删除"/>
                }
              </div>
              <div className={style.imgWrap}>
                <div className={style.eleName}>防腐层破损点</div>
                {this.state.isShow13?
                  <img className={style.eleMap} src={OpenImg}  onClick={this.removeotherMapEle10.bind(this)} alt="添加"/>:
                  <img className={style.eleMap} src={CloseImg} onClick={this.otherMapEle10.bind(this)} alt="删除"/>
                }
              </div>
            </div>
          </div>
        </div>

        <div className={style.kindNums}>
          {this.state.isShow7?
            <div>充电桩：&nbsp;{this.state.chargNum}</div>:
            null
          }
          {this.state.isShow8?
            <div>有效阴保：&nbsp;{this.state.protectNum}</div>:
            null
          }
          {this.state.isShow9?
            <div>隐患：&nbsp;{this.state.dangerNum}</div>:
            null
          }
          {this.state.isShow10?
            <div>进行施工：&nbsp;{this.state.workNum}</div>:
            null
          }
          {this.state.isShow11?
            <div>已结束施工：&nbsp;{this.state.endWorkNum}</div>:
            null
          }
          {this.state.isShow12?
            <div>应急事件：&nbsp;{this.state.emergencyNum}</div>:
            null
          }
          {this.state.isShow13?
            <div>防腐层破损点：&nbsp;{this.state.pointNum}</div>:
            null
          }
        </div>
      </div>

    )
  }
}

//筛选框
function onChange(value) {
  //value表示输入的内容
  console.log(value[1]);
  if(value[0]=="管理单位"){
    // 发送请求
    ajax.get(
      '/rest/grid/get/grid/list',
      {
        manage:value[1]
      },
      res=>{
        console.log(res,'管理单位');
        if(res.status==0){
          //多网格
          localStorage.clear();
          localStorage.setItem('isLogin',1);
          localStorage.setItem("manage", value[1]);
          localStorage.setItem('flagArea','管理单位');
          // history.go(0);
          router.push({ pathname:'/showDetails',state:{grideCount : res ,valueSelect:value[1]} })
        }else{
          message.warning('当前网络质量不佳，请重试');
        }
      }
    )
  }else if((value[0]=="行政区域")||(value[0]=="示范区")){
    //行政单位
    ajax.get(
      '/rest/grid/get/grid/list',
      {
        distName:value[1]
      },
      res=>{
        console.log(res,'行政区域');
        if(res.status==0){
          //多网格
          localStorage.clear();
          localStorage.setItem('isLogin',1);
          localStorage.setItem("manage", value[1]);
          localStorage.setItem('flagArea','行政区域');
          router.push({ pathname:'/showDetails',state:{grideCount : res ,valueSelect:value[1]} })
        }else{
          message.warning('当前网络质量不佳，请重试');
        }
      }
    )
  }else{
    //  片区
    ajax.get(
      '/rest/grid/get/grid/list',
      {
        manageArea:value[1]
      },
      res=>{
        if(res.status==0){
          //多网格
          localStorage.clear();
          localStorage.setItem('isLogin',1);
          localStorage.setItem('flagArea','片区');
          localStorage.setItem("manage", value[1]);
          router.push({ pathname:'/showDetails',state:{grideCount : res ,valueSelect:value[1]} })
        }else{
          message.warning('当前网络质量不佳，请重试');
        }
      }
    )
  }

}
//搜索框
const { Search } = Input;


function onSearch(value) {
  var reg = /^[1-9]+[0-9]*]*$/;
  console.log(value,'搜索框');
  if(reg.test(Number(value))){
    // console.log('是')
    //网格编号
    if(value.length>=5){
      message.warning('请输入正确的网格编号');
    }else{
      ajax.get(
        '/rest/grid/get/grid/list',
        {
          num:Number(value)
        },
        res=>{
          console.log(res,'在本页搜索');
          if(res.status==0){
            //  缓存中存下网格编号
            localStorage.setItem('qufen','grid')
            localStorage.setItem("gridNum", value);
            history.go(0);
            router.push({ pathname:'/signalGrid',state:{grideCount : res } })
          }else if(res.status==-1){
            message.warning('请输入正确的网格编号');
          }else{
            message.warning('当前网络质量不佳，请重试');
          }
        }
      )
    }
  }else{
    // console.log('不')
    //  小区
    if((value=='鸿运花园小区')||(value=='三里河一区')){
      ajax.get(
        '/rest/grid/get/grid/list',
        {
          villageName:value
        },
        res=>{
          if(res.status==0){
            //  缓存中存下网格编号
            localStorage.setItem("gridNum", value);
            localStorage.setItem('qufen','xiaoqu');
            history.go(0);
            router.push({ pathname:'/signalGrid',state:{grideCount : res } })
          }else{
            message.warning('当前网络质量不佳，请重试');
          }
        }
      )
    }else{
      message.warning('暂未开放改小区');
    }
  }
}





export default class extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      timeNow:'',
      dateNow:''
    };
    // console.log(this.props.location.state.grideCount,'这是传过来的数据本页搜索');
    if(localStorage.getItem('qufen')=='grid'){
      gridNum=localStorage.getItem('gridNum');
    }else{

    }
  }

  //创建地图
  initMap() {
    if(localStorage.getItem('qufen')=='grid'){
      // console.log(this.props.location.state.grideCount.data.data);
      //根据网格编号
      let girdeData=this.props.location.state.grideCount.data.data;
      let commonSafe = girdeData.level;
      let comColor;
      if(commonSafe=='vsafe'){
        comColor='#4284ff';
      }else if(commonSafe=='safe'){
        comColor='#F1c52c';
      }else if(commonSafe=='lessSafe'){
        comColor='#f1892c';
      }else{
        comColor='#e94e39';
      }
      let _this = this;
      let {mapDom} = this;
      map = new AMap.Map(mapDom, {
        mapStyle: 'normal', //高级配色
        // mapStyle: 'amap://styles/whitesmoke', //高级配色
        resizeEnable: true,
        viewMode: '2D',
        crs: 'EPSG3857',
        isHotspot: false,
        zoom: 17,
        zooms: [3, 20],
        expandZoomRange: true,
        center: [girdeData.centreX,girdeData.centreY],
        zIndex: 0,
        features: ['road', 'building','bg']
      });
      map.plugin(['AMap.MouseTool'], function () {
        _this.mouseTool = new AMap.MouseTool(map);
      });

      var southWest = new AMap.LngLat(girdeData.minX+0.0007,girdeData.minY+0.0002);
      var northEast = new AMap.LngLat(girdeData.maxX+0.0007,girdeData.maxY+0.0002);
      var bounds = new AMap.Bounds(southWest, northEast);
      var rectangle = new AMap.Rectangle({
        bounds: bounds,
        strokeColor: '#fff',
        strokeWeight: 1,
        strokeOpacity: 0.4,
        // strokeDasharray: [30,10],
        // strokeStyle还支持 solid
        strokeStyle: 'solid',
        fillColor: comColor,
        fillOpacity: 0.5,
        cursor: 'pointer',
        zIndex: 2,
        index:localStorage.getItem('gridNum')
      });
      rectangle.setMap(map);
      rectangle.on('click', function(i){
        console.log(i.target.w.index);
      });
      this.map = map;
    }else{
      //小区
      let _this = this;
      let {mapDom} = this;
      const girdeData=this.props.location.state.grideCount.data;
      // console.log(girdeData,'girdeData123456789');
      const vsafe = girdeData.vsafe;
      const safe = girdeData.safe;
      const lessSafe = girdeData.lessSafe;
      const notSafe = girdeData.notSafe;
      let center;
      if(vsafe.length!=0){
        center=[vsafe[0].centreX,vsafe[0].centreY];
      }else if(safe.length!=0){
        center=[safe[0].centreX,safe[0].centreY];
      }else if(lessSafe.length!=0){
        center=[lessSafe[0].centreX,lessSafe[0].centreY];
      }else{
        center=[notSafe[0].centreX,notSafe[0].centreY];
      }
      //画小区的范围
      var xiaoqupath = [];
      if(localStorage.getItem('gridNum')=='鸿运花园小区'){
        for(var i = 0;i <Xiaoqu.xiaoqu1.length;i++){
          xiaoqupath.push([(Number(Xiaoqu.xiaoqu1[i].x) + 9490284.698001146 - 576) / 85854.25448001+0.0008,(Number(Xiaoqu.xiaoqu1[i].y) + 4136795.7789995605 - 673) / 111271.64309999-0.0001]);
        }
      }else{
        //三里河一区
        for(var i = 0;i <Xiaoqu.xiaoqu2.length;i++){
          xiaoqupath.push([Xiaoqu.xiaoqu2[i].x,Xiaoqu.xiaoqu2[i].y]);
        }
      }



      var buildingLayer = new AMap.Buildings({zIndex:130,merge:false,sort:false,zooms:[17,20]});
      var options =
        {
          hideWithoutStyle:false,//是否隐藏设定区域外的楼块
          areas:[{ //围栏1
            //visible:false,//是否可见
            rejectTexture:false,//是否屏蔽自定义地图的纹理
            color1: 'ffff1e00',//楼顶颜色
            color2: 'ffe87667',//楼面颜色
            path: xiaoqupath
          }]
        };
      buildingLayer.setStyle(options); //此配色优先级高于自定义mapStyle


      map = new AMap.Map(mapDom, {
        zoom:17,
        pitch:50,
        showIndoorMap:false,
        // showLabel:false,
        // mapStyle:'amap://styles/whitesmoke',
        mapStyle:'amap://styles/light',
        center:center,
        features:['bg','point','road','building'],
        viewMode:'3D',
        buildingAnimation:true,
        layers:[
          new AMap.TileLayer(),
          buildingLayer,
        ]
      });
      map.addControl(new AMap.ControlBar({   //添加控件
        showZoomBar:true,     //显示zoom条控件,false表示不显示
        showControlButton:true,  //默认false,false表示取消,旋转按钮将变成南北指南针
        position:{  //控件的定位
          right:'400px',
          top:'55px'
        }
      }))
      map.plugin(['AMap.MouseTool'], function () {
        _this.mouseTool = new AMap.MouseTool(map);
      });

      // map.addControl(new AMap.Scale())
      new AMap.Polygon({
        bubble:true,
        fillColor:'red',
        fillOpacity:0.2,
        strokeWeight:1,
        path:options.areas[0].path,
        map:map
      })

      // if(vsafe.length!=0){
      //   for (var i = 0; i < vsafe.length; i++) {
      //     var southWest = new AMap.LngLat(vsafe[i].minX, vsafe[i].minY);
      //     var northEast = new AMap.LngLat(vsafe[i].maxX, vsafe[i].maxY);
      //     var bounds = new AMap.Bounds(southWest, northEast);
      //     var rectangle = new AMap.Rectangle({
      //       bounds: bounds,
      //       strokeColor: '#fff',
      //       strokeWeight: 1,
      //       strokeOpacity: 0.4,
      //       // strokeDasharray: [30,10],
      //       // strokeStyle还支持 solid
      //       strokeStyle: 'solid',
      //       fillColor: '#4284ff',
      //       fillOpacity: 0.6,
      //       cursor: 'pointer',
      //       zIndex: 2,
      //     });
      //     rectangle.setMap(map);
      //   }
      // }
      // if(safe.length!=0){
      //   for (var i = 0; i < safe.length; i++) {
      //     var southWest = new AMap.LngLat(safe[i].minX, safe[i].minY);
      //     var northEast = new AMap.LngLat(safe[i].maxX, safe[i].maxY);
      //     var bounds = new AMap.Bounds(southWest, northEast);
      //     var rectangle = new AMap.Rectangle({
      //       bounds: bounds,
      //       strokeColor: '#fff',
      //       strokeWeight: 1,
      //       strokeOpacity: 0.4,
      //       // strokeDasharray: [30,10],
      //       // strokeStyle还支持 solid
      //       strokeStyle: 'solid',
      //       fillColor: '#F1c52c',
      //       fillOpacity: 0.6,
      //       cursor: 'pointer',
      //       zIndex: 2,
      //     });
      //     rectangle.setMap(map);
      //   }
      // }
      // if(lessSafe.length!=0){
      //   for (var i = 0; i < lessSafe.length; i++) {
      //     var southWest = new AMap.LngLat(lessSafe[i].minX, lessSafe[i].minY);
      //     var northEast = new AMap.LngLat(lessSafe[i].maxX, lessSafe[i].maxY);
      //     var bounds = new AMap.Bounds(southWest, northEast);
      //     var rectangle = new AMap.Rectangle({
      //       bounds: bounds,
      //       strokeColor: '#fff',
      //       strokeWeight: 1,
      //       strokeOpacity: 0.4,
      //       // strokeDasharray: [30,10],
      //       // strokeStyle还支持 solid
      //       strokeStyle: 'solid',
      //       fillColor: '#f1892c',
      //       fillOpacity: 0.6,
      //       cursor: 'pointer',
      //       zIndex: 2,
      //     });
      //     rectangle.setMap(map);
      //   }
      // }
      // if(notSafe.length!=0){
      //   for (var i = 0; i < notSafe.length; i++) {
      //     var southWest = new AMap.LngLat(notSafe[i].minX, notSafe[i].minY);
      //     var northEast = new AMap.LngLat(notSafe[i].maxX, notSafe[i].maxY);
      //     var bounds = new AMap.Bounds(southWest, northEast);
      //     var rectangle = new AMap.Rectangle({
      //       bounds: bounds,
      //       strokeColor: '#fff',
      //       strokeWeight: 1,
      //       strokeOpacity: 0.4,
      //       // strokeDasharray: [30,10],
      //       // strokeStyle还支持 solid
      //       strokeStyle: 'solid',
      //       fillColor: '#e94e39',
      //       fillOpacity: 0.6,
      //       cursor: 'pointer',
      //       zIndex: 2,
      //     });
      //     rectangle.setMap(map);
      //
      //   }
      // }
      //
      // this.map = map;
    }

    //输入提示
    var autoOptions = {
      input: "tipinput"
    };
    var auto = new AMap.Autocomplete(autoOptions);
    placeSearch = new AMap.PlaceSearch({
      map: map
    });  //构造地点查询类
    AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发

    this.map = map;


  }
  componentDidMount() {
    this.initMap();
    //计时器 1000秒
    let timeNow1,dateNow1;
    let that = this;
    setInterval(function() {
      var date = new Date();
      var year = date.getFullYear(); //获取当前年份
      var mon = date.getMonth() + 1; //获取当前月份
      var da = date.getDate(); //获取当前日
      var day = date.getDay(); //获取当前星期几
      var h = date.getHours(); //获取小时
      var m = date.getMinutes(); //获取分钟
      var s = date.getSeconds(); //获取秒
      var d = document.getElementById('show');

      //判断当数字小于等于9时 显示 01 02 ----- 08 09
      if (mon >= 1 && mon <= 9) {
        mon = "0" + mon;
      }
      if (da >= 0 && da <= 9) {
        da = "0" + da;
      }
      if (h >= 0 && h <= 9) {
        h = "0" + h;
      }

      if (m >= 0 && m <= 9) {
        m = "0" + m;
      }

      if (s >= 0 && s <= 9) {
        s = "0" + s;
      }

       timeNow1 =  h + ':' + m + ':' + s;
      dateNow1=year + '年' + mon + '月' + da + '日'

      that.setState({
        timeNow:timeNow1,
        dateNow:dateNow1
      })
      // console.log(this)
    }, 1000)


  }
  //返回上个页面
  returnBack(e){
    router.push('/map/run');
  //  清除缓存的网格编号
    localStorage.clear();
    localStorage.setItem('isLogin',1);
  }

  //返回首页
  goHome(){
    router.push('/map/run');
    //  清除缓存的网格编号
    localStorage.clear();
    localStorage.setItem('isLogin',1);
  }


  render(){
    return(
      <div className={style.map}>
        {/*下拉选择框*/}
        <Cascader options={options} onChange={onChange} placeholder="请选择"/>
        {/*返回首页*/}
        <img src={Home} style={{ cursor: 'pointer',width:30,position:'absolute', zIndex:3,top:22,left:45}} onClick={this.goHome.bind(this)} alt="首页"/>
        {/*搜索框*/}
        <Search id="tipinput" placeholder="请输入网格编号" onSearch={onSearch} style={{ width: 200 }}/>
        {/*时间*/}
        <div className={style.timeWrap}>
          <div>日期：{this.state.dateNow}</div>
          <div>时间：{this.state.timeNow}</div>
        </div>
        {/*顶部的筛选*/}
        <div className={style.topContainer}>
          {/*每一个按钮*/}
          <div className={style.itemWrap}>
            <div className={style.redPoint}></div>
            <div className={style.itemTitle}>重大风险</div>
          </div>
          <div className={style.itemWrap}>
            <div className={style.orangePoint}></div>
            <div className={style.itemTitle}>较大风险</div>
          </div>
          <div className={style.itemWrap}>
            <div className={style.yellowPoint}></div>
            <div className={style.itemTitle}>一般风险</div>
          </div>
          <div className={style.itemWrap}>
            <div className={style.bluePoint}></div>
            <div className={style.itemTitle}>低风险</div>
          </div>
        </div>
        <img className={style.returnImg} src={ReturnImg} alt="返回" onClick={this.returnBack.bind(this)}/>
        <Leftpart1/>
        <Rightpart1/>
        <div className={style.innerMap} ref={e => this.mapDom = e}/>
        <ShowMapEle/>
      </div>
    )
  }
}
