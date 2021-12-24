import React, { useState, useEffect, useContext } from 'react';
import { typeContext } from './DashboardBox';
import './test.js';
import * as echarts from 'echarts/core';
import { TitleComponent, TooltipComponent } from 'echarts/components';
import { ScatterChart, EffectScatterChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { fetchData } from '../utils/fetch';

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

  const [data, setData] = useState<MapProps[]>([]);

  const drawMap = () => {
    const mapMain = document.getElementById('anlc');
    const mapChart = echarts.init(mapMain);
    const option = {
      title: { text: '产业地图', left: 'center' },
      tooltip: { trigger: 'item' },
      visualMap: {
        show: true,
        x: 'left',
        y: 'bottom',
        splitList: [{ start: 0, end: 100 }],
        color: [
          '#f7fcfd',
          '#e0ecf4',
          '#bfd3e6',
          '#9ebcda',
          '#8c96c6',
          '#8c6bb1',
          '#88419d',
          '#810f7c',
        ],
      },
      series: [
        {
          name: '数据',
          type: 'map',
          mapType: 'china',
          roam: true,
          label: { normal: { show: true }, emphasis: { show: false } },
          data: data,
        },
      ],
    };
    option && mapChart.setOption(option);
  };

  useEffect(() => {
    (async () => {
      try {
        const x = await fetchData<any>('/news', { type });
        console.log(x);
        setData(x);
      } catch (e) {
        //TODO: handle exception
      }
    })();
    drawMap();
  }, []);
  return <div id='anlc' style={{ height: '50vh', width: '90%' }}></div>;
};

export default ChinaMap;
