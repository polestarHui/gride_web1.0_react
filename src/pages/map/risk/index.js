import React from 'react';
import style from './style.less';
import testmap from '../testmap';
import {PopInfo} from "../../../module/mapComponents/popinfo";

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

    map.plugin(['AMap.MouseTool'], function () {
      _this.mouseTool = new AMap.MouseTool(map);
    });

    this.map = map;
  }

  runLine() {
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
      <div className={style.detail}>

      </div>
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
