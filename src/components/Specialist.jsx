import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

import {typeContext} from './DashboardBox';
import { IndTypes } from './static';
import { fetchData } from '../utils/fetch';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Specialist() {
  const type = React.useContext(typeContext);
  const mock_data = require('../../mock/specialist.json').filter((item) => item.industryType === IndTypes[type].name);

  const [data, setData] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [intro, setIntro] = React.useState('');
  const [filterData, setFilterData] = React.useState(data);

  const handleClickOpen = (msg) => {
    setOpen(true);
    setIntro(msg);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (value) => {
    var result = [];
    data.map(item => {
      if (item.name.indexOf(value) !== -1) {
        result.push(item);
      }
    });
    setFilterData(result);
  }

  React.useEffect(() => {
    (async () => {
      try {
        console.log("here");
        const x = await fetchData('/specialist', { industryType: IndTypes[type].name });
        console.log("here");
        console.log(x);
        console.log(mock_data);
        setData(x.filter((item) => item.industryType === IndTypes[type].name));
        setFilterData(x.filter((item) => item.industryType === IndTypes[type].name));
      } catch (e) {
        //TODO: handle exception
        console.log(e);
      }
    })();
  }, [type]);

  return (
    <div>
    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      <TextField id="outlined-basic" label="Name" variant="outlined" onChange={(e) => handleSearch(e.target.value)}/>
    </Box>
    <ImageList sx={{ width: "100%", height: 470 }} cols={5}>
      {filterData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.source}?w=248&fit=crop&auto=format`}
            srcSet={`${item.source}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.name}
            subtitle={<span>{item.workplace}</span>}
            position="below"
          />
          <Button variant="outlined" onClick={() => handleClickOpen(item.intro)}>
            ??????
          </Button>
        </ImageListItem>
      ))}
    </ImageList>
    <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"????????????"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {intro}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}