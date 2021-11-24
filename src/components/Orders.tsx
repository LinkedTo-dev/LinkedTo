import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(
  id: number,
  title: string,
  date: Date,
  field: string,
  type: string
) {
  return { id, title, date: date.toLocaleDateString(), field, type };
}

const rows = [
  createData(0, '协同优化算法', new Date(2011, 2, 3), 'Optimization', '百科'),
  createData(
    1,
    ' On the Role of Robustness in Multi-Objective Robust Optimization: Application to an IPM Motor Design Problem',
    new Date(2012, 0, 1),
    'Optimization',
    '期刊文献'
  ),
  createData(
    2,
    'Camera calibration with genetic algorithms',
    new Date(2018, 10, 14),
    'Genetic Algorithms',
    '期刊文献'
  ),
  createData(
    3,
    'High-speed line scanning confocal microscope for biological imaging',
    new Date(2020, 10, 18),
    'Biological Cells',
    '期刊文献'
  ),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Related Articles</Title>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>标题</TableCell>
            <TableCell>发布日期</TableCell>
            <TableCell>领域</TableCell>
            <TableCell>分类</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Link href='#' onClick={preventDefault}>
                  {row.title}
                </Link>
              </TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.field}</TableCell>
              <TableCell>{row.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color='primary' href='#' onClick={preventDefault} sx={{ mt: 3 }}>
        See more articles...
      </Link>
    </React.Fragment>
  );
}
