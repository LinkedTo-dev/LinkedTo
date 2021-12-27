import * as React from 'react';
import { useEffect, useContext } from 'react';
import { typeContext } from './DashboardBox';
import { ToggleButtonGroup, ToggleButton, Paper, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PieChart, Pie, Sector, BarChart, Bar, Cell, 
        XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { fetchData } from '../utils/fetch';
import { IndTypes } from './static';

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

export const Statistics = () => {
  const getData = async () => {
    const allData = await fetchData<Array<object>>('/mapStatistic', {industryType: IndTypes[type].name});
    console.log(allData);
    const overall_data = new Map();
    const max_data = new Map();
    max_data.set('park', 0);
    max_data.set('enterprise', 0);
    max_data.set('association', 0);
    const park_data = [];
    const enterprise_data = [];
    const assoc_data = [];
    for (let i = 0; i < allData.length; i++){
      if (allData[i]['countType'] === 'park'){
        park_data.push({province: allData[i]['province'], count: parseInt(allData[i]['count'])});
        if (allData[i]['count'] > max_data.get('park')) 
          max_data.set('park', parseInt(allData[i]['count']));
      } else if (allData[i]['countType'] === 'enterprise'){
        enterprise_data.push({province: allData[i]['province'], count: parseInt(allData[i]['count'])});
        if (allData[i]['count'] > max_data.get('enterprise')) 
          max_data.set('enterprise', parseInt(allData[i]['count']));
      } else {
        assoc_data.push({province: allData[i]['province'], count: parseInt(allData[i]['count'])});
        if (allData[i]['count'] > max_data.get('association')) 
          max_data.set('association', parseInt(allData[i]['count']));
      }
    }
    overall_data.set('park', park_data);
    overall_data.set('enterprise', enterprise_data);
    overall_data.set('association', assoc_data);
    return {overall_data, max_data};
  }

  const type = useContext(typeContext);
  const [DataType, setDataType] = React.useState('enterprise');
  const [activeIndex, setactiveIndex] = React.useState(0);
  const [ChartType, setChartType] = React.useState('PieChart');
  const init_overall_data = new Map();
  init_overall_data.set('park', []);
  init_overall_data.set('enterprise', []);
  init_overall_data.set('association', []);
  const [OverallData, setOverallData] = React.useState(init_overall_data);
  var init_max_data = new Map();
  init_max_data.set('park', 0);
  init_max_data.set('enterprise', 0);
  init_max_data.set('association', 0);
  const [MaxData, setMaxData] = React.useState(init_max_data);

  const onPieEnter = (_, index) => {
    setactiveIndex(index);
  };

  const handleChartTypeChange = (e, newChartType) => {
    setChartType(newChartType);
  }
  const handleDataTypeChange = (e, newDataType) => {
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

  useEffect(() => {
    (async () => {
      try {
        console.log("useEffect called");
        const {overall_data, max_data} = await getData();
        setOverallData(overall_data);
        setMaxData(max_data);
      } catch (e) {
        //TODO: handle exception
      }
    })();
  }, [type]);

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
      { ChartType === "PieChart" && 
        (<PieChart width={500} height={500}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={OverallData.get(DataType).filter(data => data.count > 0 && 
                                                    data.count > (MaxData.get(DataType) * 0.01))
                                            .sort((data1, data2) => data2.count - data1.count)}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={110}
            fill="#8884d8"
            dataKey="count"
            onMouseEnter={onPieEnter}
          >
            {OverallData.get(DataType).map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>)}
        { ChartType === 'BarChart' &&
          (
            <BarChart
              width={600}
              height={300}
              data={OverallData.get(DataType).filter(data => data.count > 0 && 
                                                      data.count > (MaxData.get(DataType) * 0.01))
                                              .sort((data1, data2) => data2.count - data1.count)}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey='province' />
              <YAxis dataKey='count'/>
              <Tooltip labelStyle={{color: 'black'}}/>
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          )
        }
      {/* </ResponsiveContainer> */}
    </React.Fragment>
  )
}