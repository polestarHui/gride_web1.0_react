import tielu from './mock/铁路';

export function gcj02togaode(item){
  let reslat, reslng, lat, lng;
  if(item && item.lat && item.lng){
    lat = item.lat;
    lng = item.lng;
  }else{
    try{
      lng = item[0];
      lat = item[1];
    }catch (e) {
      return null;
    }
  }

}
