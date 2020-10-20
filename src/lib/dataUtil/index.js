import electricPoint from './mock/充电桩';
import ditie from './mock/地铁';
import emergency from './mock/应急抢修';
import dianche from './mock/无轨电车';
import tielu from './mock/铁路';
import gridCenters from './mock/网格中心点';
import gridCentersAll from './mock/网格中心点全';
import gridCentersGaode from './mock/网格中心(高德)';
import bdGridCenters from './mock/无修正网格中心点';
import ditieOutline from './mock/地铁外500米轮廓';
import didianin from './0627/地电内';
import didianout from './0627/地电外';
import dianin from './0627/电车内';
import dianout from './0627/电车外';
import diin from './0627/地铁内';
import diout from './0627/地铁外';
import jianzhuwu from './0705/建筑物';
import zhanyajianzhuwu from './0705/占压建筑物';
import jianzhuwu1 from './0705/建筑物1';
import zhanyajianzhuwu1 from './0705/占压建筑物1';
import xiaoqu from './mock/模拟小区';
import baojiadanwei from './mock/重点单位';

import groupBy from 'lodash/groupBy';
import coordtransform from './coordtransform';

// !!! 谷歌地图修正数据 lng+0.00650, lat+0.00110

// eslint-disable-next-line no-extend-native
Array.prototype.groupByName = function(name){
  return groupBy(this, name);
};

function transbd2gcj02(point, lngFix, latFix){
  let gcj02Arr = coordtransform.bd09togcj02(point.lng, point.lat);
  if((latFix && lngFix === 0) || (lngFix && latFix === 0) || (lngFix && latFix)){
    return {
      ...point,
      lng: gcj02Arr[0] + lngFix,
      lat: gcj02Arr[1] + latFix
    }
  }else{
    return {
      ...point,
      lng: gcj02Arr[0],
      lat: gcj02Arr[1]
    }
  }
}

function transpointGaodePure(arr, lngFix, latFix){
  return transpointGaode(arr, null, lngFix, latFix);
}

function transpointGaode(data, name, lngFix, latFix){
  if(name && name.toString().length > 0){
    return data.filter(x => x.lat && x.lng).map((item, index) => {
      return {
        ...fixGaode(item, lngFix, latFix),
        id: index
      }
    }).groupByName(name);
  }else{
    return data.filter(x => x.lat && x.lng).map((item, index) => {
      return {
        ...fixGaode(item, lngFix, latFix),
        id: index
      }
    });
  }
}

function fixGaode(point, lngFix, latFix){
  if((latFix && lngFix === 0) || (lngFix && latFix === 0) || (lngFix && latFix)){
    return {
      ...point,
      lng: point.lng + lngFix,
      lat: point.lat + latFix
    }
  }
  return point;
}

function getRepeat(arr1, arr2, degreeArea){
  let result = {
    repeat: [],
    alone: []
  };
  arr1.map(a => {
    let flag = false;
    arr2.map(b => {
      if(Math.abs(a.lat - b.lat) <= degreeArea && Math.abs(a.lng - b.lng) <= degreeArea){
        flag = true;
      }
    });
    if(flag){
      result.repeat.push(a);
    }else{
      result.alone.push(a);
    }
  });
  return result;
}

// function matchId(arr, id){
//   let map = arr.filter(x => x.id === id);
//   if(map.length > 0){
//     return true;
//   }else{
//     return false;
//   }
// }

//let fixPoints = getRepeat(transpoint(fix), transpoint(outer), 0.001).alone;
function transpointPure(data, lngFix, latFix){
  return transpoint(data, null, lngFix, latFix);
}
function transpoint(data, name, lngFix, latFix){
  if(name && name.toString().length > 0){
    return data.filter(x => x.lat && x.lng).map((item, index) => {
      return {
        ...transbd2gcj02(item, lngFix, latFix),
        id: index
      }
    }).groupByName(name);
  }else{
    return data.filter(x => x.lat && x.lng).map((item, index) => {
      return {
        ...transbd2gcj02(item, lngFix, latFix),
        id: index
      }
    });
  }
}

let result = {
  xiaoqu, baojiadanwei,
  gridCentersGaode: transpointGaodePure(gridCentersGaode, -0.006, -0.006),
  electricPoint: transpointPure(electricPoint, 0.0005, 0.0001),
  emergency: transpointPure(emergency, 0.00025, 0.0001),
  ditie: transpoint(ditie, 'group', 0.00025, 0.0001),
  dianche: transpoint(dianche, 'group', 0.00025, 0.0001),
  tielu: transpoint(tielu, 'group', 0.00025, 0.0001),
  gdGridCenters: transpoint(bdGridCenters),
  gridCenters: gridCenters,
  gridCentersAll: transpointPure(gridCentersAll, 0.00025, 0.0001),
  ditieOutline: transpoint(ditieOutline),
  diin: transpointPure(diin, 0.00025, 0.0001),
  diout: transpointPure(diout, 0.00025, 0.0001),
  dianin: transpointPure(dianin, 0.00025, 0.0001),
  dianout: transpointPure(dianout, 0.00025, 0.0001),
  didianin: transpointPure(didianin, 0.00025, 0.0001),
  didianout: transpointPure(didianout, 0.00025, 0.0001),

  zhanyajianzhuwu: transpoint(zhanyajianzhuwu, 'group', 0.00560, 0.00188),
  jianzhuwu: transpoint(jianzhuwu, 'group', 0.00560, 0.00188),
  zhanyajianzhuwu1: transpoint(zhanyajianzhuwu1, 'group',  0.00645, 0.00118),
  jianzhuwu1: transpoint(jianzhuwu1, 'group', 0.00645, 0.00118)
};

export default result;
