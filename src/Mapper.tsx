
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
        coords: [847,944,866,932,989,939,1021,904,1035,933,1044,965,1046,985,1060,994,1076,1016,1092,1027,1039,1027,1002,1026,960,1035,943,1036,929,1050,854,1044,879,1030,890,1009,879,998,884,985,845,958],
      },
      {
        id: '助行器',
        shape: 'poly',
        coords: [1114,725,1167,470,1185,454,1252,458,1266,467,1288,475,1303,491,1307,543,1328,557,1306,576,1315,805,1293,807,1137,786,1119,783],
      },
      {
        id: '鞋帶',
        shape: 'poly',
        coords: [801,844,858,850,912,847,974,864,980,876,947,878,891,881,863,879,802,853],
      },
      {
        id: '褲腳',
        shape: 'poly',
        coords: [754,775,835,793,831,828,793,842,746,809],
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
        coords: [361,837,403,851,387,885,347,866],
      },
      {
        id: '叫人鐘',
        shape: 'poly',
        coords: [264,355,268,290,291,295,297,360],
      },
      {
        id: 'IV架',
        shape: 'poly',
        coords: [741,439,740,180,719,153,753,135,788,155,767,187,764,439],
      },
      {
        id: '指示牌',
        shape: 'poly',
        coords: [459,157,539,175,539,216,460,198],
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
