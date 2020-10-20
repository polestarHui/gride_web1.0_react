import React from "react";
import ReactDOM from 'react-dom';
import style from './style.less';
import testmap from '../testmap';
import {PopInfo} from "../../../module/mapComponents/popinfo";


/**
 *
 *
 * @export 防腐检测主页面
 * @class
 * @extends {React.Component}
 */
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  initMap() {
    let _this = this;
    let {mapDom} = this;
    let map = new AMap.Map(mapDom, {
      mapStyle: 'amap://styles/b029b2c2a6d266fec67746a6f5dcec09', //高级配色
      resizeEnable: true,
      viewMode: '2D',
      crs: 'EPSG3857',
      isHotspot: false,
      zoom: 15,
      zooms: [3, 20],
      expandZoomRange: true,
      center: [116.3737642765045, 39.90444438476898],
      zIndex: 0,
    });
  
  // 取点标记
  let markers = [{
      icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-1.png',
      position: [116.375352,39.904794]
  }, {
      icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-2.png',
      position: [116.367351,39.898582]
  }, {
      icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-3.png',
      position: [116.372126,39.901552]
  },
  {
    icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-3.png',
    position: [116.374314,39.899765]
}];
  markers.forEach(function(marker) {
    new AMap.Marker({
        map: map,
        icon: marker.icon,
        position: [marker.position[0], marker.position[1]],
        // offset: new AMap.Pixel(-13, -30)
    });
});

    map.plugin(['AMap.MouseTool'], function () {
      _this.mouseTool = new AMap.MouseTool(map);
    });

    this.map = map;
  }



  runLine(){
    let _this = this;
    let {map} = this;
    let geojson = new AMap.GeoJSON({
      geoJSON: testmap,
      // 还可以自定义getMarker和getPolyline
      getPolyline: function (geojson, lnglats) {
        let line = new AMap.Polyline({
          path: lnglats,
          strokeOpacity: .8,
          strokeWeight: 4,
          strokeColor: getColor(),
        });

        line.on('click', function(){
          setTimeout(() => {
            _this.infoWindow.open(map, lnglats[0]);
            _this.infoWindow.setContent(_this.createInfoWindow('test'));
          }, 400);
        });

        return line;
      }
    });

    geojson.setMap(this.map);
  }

  createInfoWindow(item) {
    let info = document.createElement('div');
    ReactDOM.render(<PopInfo/>, info);
    return info;
  }

  initInfoWindow() {
    let { map } = this;
    let infoWindow = new AMap.InfoWindow({
      isCustom: true,  //使用自定义窗体
      anchor: 'bottom-left',
    });

    //关闭信息窗体
    function closeInfoWindow() {
      map.clearInfoWindow();
    }

    window.addEventListener('click', function(evt) {
      evt.stopPropagation();
      closeInfoWindow();
    });
    this.infoWindow = infoWindow;
  }

  componentDidMount() {
    this.initMap();
    this.initInfoWindow();
    this.runLine();
  }

  render() {

    return <div className={style.map}>
      <div className={style.innerMap} ref={e => this.mapDom = e}/>
    </div>
  }
}


function getColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return "rgb("+r+','+g+','+b+")";
}
