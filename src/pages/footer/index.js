import React from 'react';
import style from './style.less'
import OpenImg from '../../assets/map/openEle.svg'
import CloseImg from '../../assets/map/closeEle.svg'
import MetroSign from '../../assets/map/subwaySign.svg'
import MetroData from '../../pages/metro.json'

let features=['road', 'building','bg']

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

//地图上元素的展示(高德提供的原有元素）
class ShowMapEle extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      isShow1:true,
      isShow2:true,
      isShow3:true
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
    console.log(features);
  }
  //删除元素
  removeElemap1(e){
    this.setState({
      isShow1:true
    })
    // console.log(this.state.isShow,'这是添加这一款')
    features.push(e.target.getAttribute('removecount1'));
    map.setFeatures(features);
    console.log(features);
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

  //添加元素（高德未提供，根据后台返回的经纬度自己标注）
  otherMapEle(e){
    const subwayArr=MetroData.data.data[0].subwayList;
    // console.log(subwayArr);
    for(var i = 0; i <subwayArr.length;i++){
      var pointX=Number((Number(subwayArr[i].pointX) + 9490284.698001146 - 576) / 85854.25448001).toFixed(6);
      var pointY= Number((Number(subwayArr[i].pointY) + 4136795.7789995605 - 673) / 111271.64309999).toFixed(6);
      var marker = new AMap.Marker({
        icon: MetroSign,
        position: [pointX, pointY]
      });
      map.add(marker);
    }
  }


  render() {
    return(
      <div className={style.eleContainer}>
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
            <img className={style.eleMap} src={CloseImg} onClick={this.otherMapEle.bind(this)} alt="删除"/>
          </div>
          <div className={style.imgWrap}>
            <div className={style.eleName}>铁路</div>
            <img className={style.eleMap} src={CloseImg} alt="元素"/>
          </div>
          <div className={style.imgWrap}>
            <div className={style.eleName}>无轨电车</div>
            <img className={style.eleMap} src={CloseImg} alt="元素"/>
          </div>
          <div className={style.imgWrap}>
            <div className={style.eleName}>充电桩</div>
            <img className={style.eleMap} src={CloseImg} alt="元素"/>
          </div>
          <div className={style.imgWrap}>
            <div className={style.eleName}>阴保</div>
            <img className={style.eleMap} src={CloseImg} alt="元素"/>
          </div>
          <div className={style.imgWrap}>
            <div className={style.eleName}>未开始施工</div>
            <img className={style.eleMap} src={CloseImg} alt="元素"/>
          </div>
          <div className={style.imgWrap}>
            <div className={style.eleName}>进行施工</div>
            <img className={style.eleMap} src={CloseImg} alt="元素"/>
          </div>
          <div className={style.imgWrap}>
            <div className={style.eleName}>已结束施工</div>
            <img className={style.eleMap} src={CloseImg} alt="元素"/>
          </div>
        </div>
      </div>
    )
  }
}

export default ShowMapEle
