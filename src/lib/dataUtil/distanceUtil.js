const EARTH_RADIUS = 6371;//地球半径，平均半径为6371km
/**
 * 计算某个经纬度的周围某段距离的正方形的四个点
 * @param lng  经度
 * @param lat  纬度
 * @param distance 该点所在圆的半径，该圆与此正方形内切，默认值为0.5km
 * @return array
 */
export function squarePoint(lng, lat, distance = 0.5) {
  let dlng = 2 * Math.asin(Math.sin(distance / (2 * EARTH_RADIUS) / Math.cos(deg2rad(lat))));
  dlng = rad2deg(dlng);
  let dlat = distance / EARTH_RADIUS;
  dlat = rad2deg(dlat);
  return [
    [lng + dlng, lat + dlat],//东北
    [lng - dlng, lat + dlat],//西北
    [lng - dlng, lat - dlat],//西南
    [lng + dlng, lat - dlat],//东南
  ];
}

function rad2deg(r) {
  let degree = r * 180 / Math.PI;
  return degree;
}

function deg2rad(degree) {
  let r = (degree / 180) * Math.PI;
  return r;
}
