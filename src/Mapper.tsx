
import { useState } from 'react';
import useWindowDimensions from './useWindowDimensions';
import ImageMapper, { CustomArea, Map } from 'react-img-mapper';
import ward from './ward.jpg';

const Mapper = (props: { disabled?: boolean; score?: (score: number) => void }) => {
  const MAP = {
    name: 'ward',
    areas: [
      {
        id: '水',
        shape: 'poly',
        coords: [834,1027,865,1008,856,982,823,958,838,914,881,915,946,924,985,919,1022,889,1050,898,1053,947,1064,976,1092,1010,1115,1038,1053,1041,974,1040,931,1064,837,1060],
      },
      {
        id: '助行器',
        shape: 'poly',
        coords: [1114,725,1167,470,1185,454,1252,458,1266,467,1288,475,1303,491,1307,543,1328,557,1306,576,1315,805,1293,807,1137,786,1119,783],
      },
      {
        id: '鞋帶',
        shape: 'poly',
        coords: [797,845,840,842,867,829,916,833,959,845,1017,858,993,884,955,899,898,895,837,884,816,874,793,865],
      },
      {
        id: '褲腳',
        shape: 'poly',
        coords: [739,784,749,766,759,741,840,756,844,798,843,828,814,837,779,844,739,803],
      },
      {
        id: '電線',
        shape: 'poly',
        coords: [689,842,648,849,608,833,557,792,549,767,609,746,632,760,647,784,680,806,705,821],
      },
      {
        id: '床',
        shape: 'poly',
        coords: [563,541,719,556,763,586,769,684,587,649],
      },
      {
        id: '凳腳',
        shape: 'poly',
        coords: [328,874,334,841,368,809,407,819,437,868,414,897,366,908],
      },
      {
        id: '叫人鐘',
        shape: 'poly',
        coords: [250,361,250,324,249,292,264,271,302,271,311,300,312,329,315,381,276,390],
      },
      {
        id: 'IV架',
        shape: 'poly',
        coords: [727,374,731,201,713,147,758,113,800,155,784,204,779,377],
      },
      {
        id: '指示牌',
        shape: 'poly',
        coords: [446,178,447,135,503,149,545,159,546,191,548,224,499,214,447,201],
      },
    ],
  };
  const [ map, setMap ] = useState<Map>(MAP);
  const { height, width } = useWindowDimensions();
  const onClick = (area: CustomArea, index: number) => {
    const newArea = { ...area };
    if (!newArea.preFillColor) {
      newArea.preFillColor = "#ff00007f";
      const updatedAreas = map.areas.map(cur => cur.id === newArea.id ? newArea : cur);
      setMap(prev => ({ ...prev, areas: updatedAreas }));
      props?.score?.(updatedAreas.filter(i => i.preFillColor).length);
    }
    return false;
  };

  return <ImageMapper
    src={ward}
    map={map}
    responsive={true}
    parentWidth={Math.min(height*4/3, width) - 2}
    active={false}
    fillColor="#ff000050"
    strokeColor="rgba(0, 0, 0, 0)"
    stayHighlighted={true}
    stayMultiHighlighted={true}
    toggleHighlighted={true}
    onClick={onClick}
    disabled={props.disabled}
  />
}

export default Mapper;
