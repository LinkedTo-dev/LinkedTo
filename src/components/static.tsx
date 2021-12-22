import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {Statistics} from './Statistics';

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
    component: temp,
    grid: { xs: 12 },
    icon: <DashboardIcon />,
  },
  {
    title: '产业动态',
    name: 'news',
    component: temp,
    grid: { xs: 12, sm: 6 },
    icon: <DashboardIcon />,
  },
  {
    title: '产业政策',
    name: 'policy',
    component: <>C component!</>,
    grid: { xs: 12, sm: 6 },
    icon: <DashboardIcon />,
  },
  {
    title: '数据统计',
    name: 'statistics',
    component: <Statistics />,
    grid: {xs: 12, sm: 6},
    icon: <DashboardIcon />
  }
];

interface IndTypeProp {
  id: number;
  name: string;
  label: string;
  icon?: React.ReactNode;
}

const IndTypes: IndTypeProp[] = [
  { id: 0, name: 'AI', label: '人工智能', icon: <DashboardIcon /> },
  { id: 1, name: 'Blockchain', label: '区块链', icon: <DashboardIcon /> },
];

export default staticData;
export { IndTypes };
