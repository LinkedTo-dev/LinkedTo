import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { fetchData } from '../utils/fetch';
import axios from 'axios';
import { typeContext } from './DashboardBox';
import {IndTypes} from './static';



const dataMap = (data : any) => {
  return data.map((item, index) => {
    return (
      <>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Policy" />
          </ListItemAvatar>
  
          <ListItemText
            primary={
              <React.Fragment>
                <Link href={item.source} > {item.title} </ Link>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {item.time}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </>
    );
  });
};

const Policy = () => {

  const initData = [];
  const [dispData, setDispData] = React.useState(initData);
  const [allData, setAllData] = React.useState(initData);
  const type = React.useContext(typeContext);
  

  React.useEffect(() => {
    (async () => {
      try {
        setDispData(await fetchData('/policy', {industryType: IndTypes[type].name}));
        setAllData(await fetchData('/policy', {industryType: IndTypes[type].name}));

      } catch (e) {
        //TODO: handle exception
      }
    })();
  }, [type]);



  const updData = (e) => {
    const _input = e.target.value;
    const newData = allData
      .filter((item) => {
        return item.title.includes(_input);
      });
    setDispData(newData);
  };
  return (
    <>
      <TextField
        id="outlined-search"
        label="Search field"
        type="search"
        onChange={(e) => {
          updData(e);
        }}
      />
      <List
        sx={{
          width: '100%',
          maxHeight: 600,
          overflow: 'auto',
          bgcolor: 'background.paper',
        }}
      >
        {dataMap(dispData)}
      </List>
    </>
  );
};

export default Policy;
