import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import { fetchData } from '../utils/fetch';
import {IndTypes} from './static';
import { typeContext } from './DashboardBox';

export const abbr2prov = [
  { abbr: 'ah', full: '安徽' },
  { abbr: 'bj', full: '北京' },
  { abbr: 'cq', full: '重庆' },
  { abbr: 'fj', full: '福建' },
  { abbr: 'gd', full: '广东' },
  { abbr: 'gs', full: '甘肃' },
  { abbr: 'gz', full: '贵州' },
  { abbr: 'gx', full: '广西' },
  { abbr: 'ha', full: '河南' },
  { abbr: 'hb', full: '湖北' },
  { abbr: 'he', full: '河北' },
  { abbr: 'hi', full: '海南' },
  { abbr: 'hl', full: '黑龙江' },
  { abbr: 'hn', full: '湖南' },
  { abbr: 'jl', full: '吉林' },
  { abbr: 'js', full: '江苏' },
  { abbr: 'jx', full: '江西' },
  { abbr: 'ln', full: '辽宁' },
  { abbr: 'nm', full: '内蒙古' },
  { abbr: 'nx', full: '宁夏' },
  { abbr: 'qh', full: '青海' },
  { abbr: 'sc', full: '四川' },
  { abbr: 'sd', full: '山东' },
  { abbr: 'sh', full: '上海' },
  { abbr: 'sn', full: '陕西' },
  { abbr: 'sx', full: '山西' },
  { abbr: 'tj', full: '天津' },
  { abbr: 'tw', full: '台湾' },
  { abbr: 'xj', full: '新疆' },
  { abbr: 'xz', full: '西藏' },
  { abbr: 'yn', full: '云南' },
  { abbr: 'zj', full: '浙江' },
  { abbr: 'hk', full: '香港' },
  { abbr: 'mo', full: '澳门' },
];

const DataStat = () => {

  const [province, setProvince] = React.useState('');
  const [quarterData, setQuarterData] = React.useState([]);

  const [yearlyData, setYearlyData] = React.useState([]);
  const [checked, setChecked] = React.useState(false);

  const [statData, setStatData] = React.useState([]);
  const type = React.useContext(typeContext);
  React.useEffect(() => {
    (async () => {
      try {
        setStatData(await fetchData('/dataStatistic', {industryType: IndTypes[type].name}));

      } catch (e) {
        //TODO: handle exception
      }
    })();
  }, []);
  const allProvince = [...new Set(statData.map((stat, idx) => stat.province))];

  const handleChange = (event: SelectChangeEvent) => {
    setProvince(event.target.value as string);
    const tmpQData = statData.filter(
      (stat) => stat.province === event.target.value
    );
    setQuarterData(tmpQData);
    const calc = (year: string) => {
      return tmpQData.reduce(
        (prev, cur, index, arr) =>
          cur.quarter.slice(0, 4) === year ? prev + cur.outputValue : prev,
        0
      );
    };

    setYearlyData([
      {
        province: province,
        industryType: 'AI',
        quarter: '2019',
        outputValue: calc('2019'),
      },
      {
        province: province,
        industryType: 'AI',
        quarter: '2020',
        outputValue: calc('2020'),
      },
      {
        province: province,
        industryType: 'AI',
        quarter: '2021',
        outputValue: calc('2021'),
      },
    ]);
  };

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="select-province-input-label">Province</InputLabel>
        <Select
          labelId="select-province-label"
          id="select-province"
          value={province}
          label="Province"
          onChange={handleChange}
        >
          {allProvince.map((p, idx) => {
            const filtered = abbr2prov.find((t) => {
              return t.abbr.toUpperCase() === p.toUpperCase();
            });
            return (
              <MenuItem key={idx} value={p}>{filtered ? filtered.full : p}</MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Switch checked={checked} onChange={handleCheck} />
      <BarChart
        width={400}
        height={250}
        data={checked ? yearlyData : quarterData}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="quarter" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="outputValue" fill="#8884d8" />
      </BarChart>
    </>
  );
};



export default DataStat;
