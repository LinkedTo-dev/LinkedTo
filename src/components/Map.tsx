import React, { useState, useEffect, useContext } from 'react';
import { typeContext } from './DashboardBox';
import './test.js';
import * as echarts from 'echarts/core';
import { TitleComponent, TooltipComponent } from 'echarts/components';
import { ScatterChart, EffectScatterChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { fetchData } from '../utils/fetch';
import { IndTypes } from './static';
import { abbr2prov } from './DataStat';

echarts.use([
  TitleComponent,
  TooltipComponent,
  ScatterChart,
  EffectScatterChart,
  CanvasRenderer,
]);

interface MapProps {
  name: string;
  value: number;
}

const ChinaMap = () => {
  const type = useContext(typeContext);

  // const [data, setData] = useState<MapProps[]>([]);

  const drawMap = (d) => {
    const mapMain = document.getElementById('anlc');
    const mapChart = echarts.init(mapMain);
    const option = {
      title: { text: '产业地图', left: 'center' },
      tooltip: { trigger: 'item' },
      visualMap: {
        show: true,
        x: 'left',
        y: 'bottom',
        splitList: [
          { start: 800 },
          { start: 400, end: 800 },
          { start: 200, end: 400 },
          { start: 100, end: 200 },
          { start: 50, end: 100 },
          { start: 0, end: 50 },
        ],
        color: [
          '#f7fcfd',
          '#e0ecf4',
          '#bfd3e6',
          '#9ebcda',
          '#8c96c6',
          '#8c6bb1',
        ].reverse(),
      },
      series: [
        {
          name: '数据',
          type: 'map',
          mapType: 'china',
          roam: true,
          label: { normal: { show: true }, emphasis: { show: false } },
          data: d,
        },
      ],
    };
    option && mapChart.setOption(option);
  };

  interface MapData {
    province: string;
    industryType: 'AI' | 'BC';
    countType: 'enterprise' | 'park' | 'association';
    count: string;
  }

  useEffect(() => {
    (async () => {
      try {
        const x = await fetchData<MapData[]>('/mapStatistic', {
          industryType: IndTypes[type].name,
        });
        const result: MapProps[] = [];
        x.forEach(({ province, countType, count }) => {
          const full = abbr2prov.find(
            ({ abbr }) => abbr.toUpperCase() === province.toUpperCase()
          ).full;
          let tar = result.findIndex(({ name }) => name === full);
          if (tar === -1) {
            tar = result.push({ name: full, value: 0 }) - 1;
          }
          if (countType === 'association') {
            result[tar].value += parseInt(count) * 66.6;
          } else if (countType === 'enterprise') {
            result[tar].value += parseInt(count) * 3.33;
          } else {
            result[tar].value += parseInt(count) * 44.4;
          }
        });
        const xx = result.map(({ name, value }) => ({
          name,
          value: Math.round(value),
        }));
        // console.log(xx);
        // setData(xx);
        drawMap(xx);
      } catch (e) {
        //TODO: handle exception
        console.log(e);
      }
    })();
  }, [type]);
  return <div id='anlc' style={{ height: '50vh', width: '90%' }}></div>;
};

export default ChinaMap;
