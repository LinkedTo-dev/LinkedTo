import React, { useState, useEffect, useContext } from 'react';
import { typeContext } from './DashboardBox';
import './test.js';
import * as echarts from 'echarts/core';
import { TitleComponent, TooltipComponent } from 'echarts/components';
import { ScatterChart, EffectScatterChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  ScatterChart,
  EffectScatterChart,
  CanvasRenderer,
]);

function setCityData() {
  return Math.round(Math.random() * 100);
}
let option;
const data = [
  // { name: '贵州', value: setCityData() },
  // { name: '广东', value: setCityData() },
  // { name: '河南', value: setCityData() },
  // { name: '云南', value: setCityData() },
  // { name: '北京', value: setCityData() },
  // { name: '天津', value: setCityData() },
  // { name: '上海', value: setCityData() },
  // { name: '重庆', value: setCityData() },
  // { name: '海南', value: setCityData() },
  // { name: '台湾', value: setCityData() },
  // { name: '香港', value: setCityData() },
  // { name: '澳门', value: setCityData() },
  // { name: '陕西', value: setCityData() },
  // { name: '吉林', value: setCityData() },
  // { name: '福建', value: setCityData() },
  // { name: '江苏', value: setCityData() },
  // { name: '浙江', value: setCityData() },
  // { name: '江西', value: setCityData() },
  // { name: '湖北', value: setCityData() },
  // { name: '辽宁', value: setCityData() },
  // { name: '黑龙江', value: setCityData() },
  // { name: '湖南', value: setCityData() },
  // { name: '安徽', value: setCityData() },
  // { name: '山东', value: setCityData() },
  // { name: '新疆', value: setCityData() },
  // { name: '广西', value: setCityData() },
  // { name: '甘肃', value: setCityData() },
  // { name: '河北', value: setCityData() },
  // { name: '山西', value: setCityData() },
  // { name: '青海', value: setCityData() },
  // { name: '西藏', value: setCityData() },
  // { name: '四川', value: setCityData() },
  // { name: '宁夏', value: setCityData() },
  // { name: '内蒙古', value: setCityData() },
];
const ChinaMap = (props) => {
  const type = useContext(typeContext);

  useEffect(() => {
    const myMain = document.getElementById('anlc');
    const myChart = echarts.init(myMain);
    option = {
      title: {
        text: '中国地图',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      visualMap: {
        show: true,
        x: 'left',
        y: 'bottom',
        splitList: [
          { start: 90, end: 100 },
          { start: 80, end: 90 },
          { start: 70, end: 80 },
          { start: 60, end: 70 },
          { start: 50, end: 60 },
          { start: 40, end: 50 },
          { start: 30, end: 40 },
          { start: 20, end: 30 },
          { start: 10, end: 20 },
          { start: 0, end: 10 },
        ],
        color: [
          '#f47920',
          '#444693',
          '#224b8f',
          '#102b6a',
          '#494e8f',
          '#ae6642',
          '#6f60aa',
          '#694d9f',
          '#8552a1',
          '#401c44',
        ],
      },
      series: [
        {
          name: '数据',
          type: 'map',
          mapType: 'china',
          roam: true,
          label: {
            normal: {
              show: true,
            },
            emphasis: {
              show: false,
            },
          },
          data: data,
        },
      ],
    };
    option && myChart.setOption(option);
  }, []);
  return <div id='anlc' style={{ height: '50vh', width: '90%' }}></div>;
};

export default ChinaMap;
