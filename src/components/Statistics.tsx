import * as React from 'react';
import { ToggleButtonGroup, ToggleButton, Paper, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';

const mockData = [
    {"province":"AH","count_type":"enterprise","count":11},
    {"province":"AH","count_type":"park","count":1},
    {"province":"AH","count_type":"association","count":3},
    {"province":"BJ","count_type":"enterprise","count":447},
    {"province":"BJ","count_type":"park","count":4},
    {"province":"BJ","count_type":"association","count":7},
    {"province":"CQ","count_type":"enterprise","count":3},
    {"province":"CQ","count_type":"park","count":0},
    {"province":"CQ","count_type":"association","count":1},
    {"province":"FJ","count_type":"enterprise","count":22},
    {"province":"FJ","count_type":"park","count":0},
    {"province":"FJ","count_type":"association","count":2},
    {"province":"GD","count_type":"enterprise","count":246},
    {"province":"GD","count_type":"park","count":5},
    {"province":"GD","count_type":"association","count":8},
    {"province":"GS","count_type":"enterprise","count":0},
    {"province":"GS","count_type":"park","count":0},
    {"province":"GS","count_type":"association","count":0},
    {"province":"GZ","count_type":"enterprise","count":2},
    {"province":"GZ","count_type":"park","count":0},
    {"province":"GZ","count_type":"association","count":0},
    {"province":"GX","count_type":"enterprise","count":2},
    {"province":"GX","count_type":"park","count":0},
    {"province":"GX","count_type":"association","count":1},
    {"province":"HA","count_type":"enterprise","count":10},
    {"province":"HA","count_type":"park","count":0},
    {"province":"HA","count_type":"association","count":1},
    {"province":"HB","count_type":"enterprise","count":17},
    {"province":"HB","count_type":"park","count":1},
    {"province":"HB","count_type":"association","count":3},
    {"province":"HE","count_type":"enterprise","count":19},
    {"province":"HE","count_type":"park","count":1},
    {"province":"HE","count_type":"association","count":3},
    {"province":"HI","count_type":"enterprise","count":0},
    {"province":"HI","count_type":"park","count":0},
    {"province":"HI","count_type":"association","count":0},
    {"province":"HL","count_type":"enterprise","count":2},
    {"province":"HL","count_type":"park","count":0},
    {"province":"HL","count_type":"association","count":0},
    {"province":"HN","count_type":"enterprise","count":3},
    {"province":"HN","count_type":"park","count":0},
    {"province":"HN","count_type":"association","count":1},
    {"province":"JL","count_type":"enterprise","count":1},
    {"province":"JL","count_type":"park","count":0},
    {"province":"JL","count_type":"association","count":0},
    {"province":"JS","count_type":"enterprise","count":59},
    {"province":"JS","count_type":"park","count":2},
    {"province":"JS","count_type":"association","count":3},
    {"province":"JX","count_type":"enterprise","count":3},
    {"province":"JX","count_type":"park","count":0},
    {"province":"JX","count_type":"association","count":0},
    {"province":"LN","count_type":"enterprise","count":10},
    {"province":"LN","count_type":"park","count":0},
    {"province":"LN","count_type":"association","count":1},
    {"province":"NM","count_type":"enterprise","count":0},
    {"province":"NM","count_type":"park","count":0},
    {"province":"NM","count_type":"association","count":0},
    {"province":"NX","count_type":"enterprise","count":0},
    {"province":"NX","count_type":"park","count":0},
    {"province":"NX","count_type":"association","count":0},
    {"province":"QH","count_type":"enterprise","count":0},
    {"province":"QH","count_type":"park","count":0},
    {"province":"QH","count_type":"association","count":0},
    {"province":"SC","count_type":"enterprise","count":46},
    {"province":"SC","count_type":"park","count":2},
    {"province":"SC","count_type":"association","count":3},
    {"province":"SD","count_type":"enterprise","count":10},
    {"province":"SD","count_type":"park","count":0},
    {"province":"SD","count_type":"association","count":1},
    {"province":"SH","count_type":"enterprise","count":168},
    {"province":"SH","count_type":"park","count":3},
    {"province":"SH","count_type":"association","count":4},
    {"province":"SN","count_type":"enterprise","count":8},
    {"province":"SN","count_type":"park","count":0},
    {"province":"SN","count_type":"association","count":1},
    {"province":"SX","count_type":"enterprise","count":2},
    {"province":"SX","count_type":"park","count":0},
    {"province":"SX","count_type":"association","count":1},
    {"province":"TJ","count_type":"enterprise","count":12},
    {"province":"TJ","count_type":"park","count":1},
    {"province":"TJ","count_type":"association","count":2},
    {"province":"TW","count_type":"enterprise","count":1},
    {"province":"TW","count_type":"park","count":0},
    {"province":"TW","count_type":"association","count":1},
    {"province":"XJ","count_type":"enterprise","count":1},
    {"province":"XJ","count_type":"park","count":0},
    {"province":"XJ","count_type":"association","count":0},
    {"province":"XZ","count_type":"enterprise","count":1},
    {"province":"XZ","count_type":"park","count":0},
    {"province":"XZ","count_type":"association","count":0},
    {"province":"YN","count_type":"enterprise","count":0},
    {"province":"YN","count_type":"park","count":0},
    {"province":"YN","count_type":"association","count":0},
    {"province":"ZJ","count_type":"enterprise","count":156},
    {"province":"ZJ","count_type":"park","count":5},
    {"province":"ZJ","count_type":"association","count":8},
    {"province":"HK","count_type":"enterprise","count":3},
    {"province":"HK","count_type":"park","count":0},
    {"province":"HK","count_type":"association","count":1},
    {"province":"MO","count_type":"enterprise","count":1},
    {"province":"MO","count_type":"park","count":0},
    {"province":"MO","count_type":"association","count":0}
]

const getData = (allData: Array<object>) => {
  const parsed_data = new Map();
  const park_data = new Array();
  const enterprise_data = new Array();
  const assoc_data = new Array();
  for (let i = 0; i < allData.length; i++){
    if (allData[i]['count_type'] === 'park'){
      park_data.push({province: allData[i]['province'], count: allData[i]['count']});
    } else if (allData[i]['count_type'] === 'enterprise'){
      enterprise_data.push({province: allData[i]['province'], count: allData[i]['count']});
    } else {
      assoc_data.push({province: allData[i]['province'], count: allData[i]['count']});
    }
  }
  parsed_data.set('park', park_data);
  parsed_data.set('enterprise', enterprise_data);
  parsed_data.set('association', assoc_data);
  console.log('parsed_data');
  return parsed_data;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.province}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#ffffff">{`数量：${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

const overall_data = getData(mockData);

export const Statistics = () => {
  const onPieEnter = (_, index) => {
    setactiveIndex(index);
  };

  const [DataType, setDataType] = React.useState('enterprise');
  const [activeIndex, setactiveIndex] = React.useState(0);
  const [ChartType, setChartType] = React.useState('PieChart');

  const handleChartTypeChange = (e, newChartType) => {
    console.log()
    setChartType(newChartType);
  }
  const handleDataTypeChange = (e, newDataType) => {
    console.log()
    let data = overall_data.get(newDataType);
    setDataType(newDataType);
  }

  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
      margin: theme.spacing(0.5),
      border: 0,
      '&.Mui-disabled': {
        border: 0,
      },
      '&:not(:first-of-type)': {
        borderRadius: theme.shape.borderRadius,
      },
      '&:first-of-type': {
        borderRadius: theme.shape.borderRadius,
      },
    },
  }));

  return (
    <React.Fragment>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
        }}
      >
        <StyledToggleButtonGroup
          value={ChartType}
          exclusive
          onChange={handleChartTypeChange}
        >
          <ToggleButton value="PieChart">
            饼状图
          </ToggleButton>
          <ToggleButton value="BarChart">
            柱状图
          </ToggleButton>
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" sx={{ mx: 1, my: 1 }} />
        <StyledToggleButtonGroup
          value={DataType}
          exclusive
          onChange={handleDataTypeChange}
        >
          <ToggleButton value="enterprise">
            公司
          </ToggleButton>
          <ToggleButton value="park">
            园区
          </ToggleButton>
          <ToggleButton value="association">
            协会
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
      {/* <ResponsiveContainer width="100%" height="100%"> */}
        <PieChart width={500} height={500}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={overall_data.get(DataType)}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={110}
            fill="#8884d8"
            dataKey="count"
            onMouseEnter={onPieEnter}
          >
            {overall_data.get(DataType).map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      {/* </ResponsiveContainer> */}
    </React.Fragment>
  )
}