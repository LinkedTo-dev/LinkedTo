import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Trends from './Trends';
import Policy from './Policy';
import DataStat from './DataStat';
import { Statistics } from './Statistics';
import Map from './Map';
import Specialist from './Specialist';

interface PageDataProp {
  title: string;
  name: string;
  component: React.ReactNode;
  icon?: React.ReactNode;
  grid?: { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
}

const temp = <div style={{ height: '1000px' }}></div>;

// TODO: modify your page data here

const staticData: PageDataProp[] = [
  {
    title: '产业地图',
    name: 'map',
    component: <Map />,
    grid: { xs: 12 },
    icon: <DashboardIcon />,
  },
  {
    title: '产业动态',
    name: 'news',
    component: <Trends />,
    grid: { xs: 12, sm: 6 },
    icon: <DashboardIcon />,
  },
  {
    title: '产业政策',
    name: 'policy',
    component: <Policy />,
    grid: { xs: 12, sm: 6 },
    icon: <DashboardIcon />,
  },
  {
    title: '产值展示',
    name: 'value',
    component: <DataStat />,
    grid: { xs: 12, sm: 6 },
    icon: <DashboardIcon />,
  },
  {
    title: '数据统计',
    name: 'statistics',
    component: <Statistics />,
    grid: { xs: 12, sm: 6 },
    icon: <DashboardIcon />,
  },
  {
    title: '产业专家',
    name: 'specialist',
    component: <Specialist />,
    grid: { xs: 12 },
    icon: <DashboardIcon />,
  },
];

interface IndTypeProp {
  id: number;
  name: string;
  label: string;
  icon?: React.ReactNode;
}

const IndTypes: IndTypeProp[] = [
  { id: 0, name: 'AI', label: '人工智能', icon: <DashboardIcon /> },
  { id: 1, name: 'BC', label: '区块链', icon: <DashboardIcon /> },
  { id: 2, name: 'CL', label: '云计算', icon: <DashboardIcon /> },
  { id: 3, name: 'IC', label: '集成电路', icon: <DashboardIcon /> },
];

export default staticData;
export { IndTypes };
