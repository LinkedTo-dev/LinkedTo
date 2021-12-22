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

import {typeContext} from './DashboardBox';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const data = require('../../mock/specialist.json');

export default function Specialist() {
  // const type = React.useContext(typeContext);

  const [open, setOpen] = React.useState(false);
  const [intro, setIntro] = React.useState('');

  const handleClickOpen = (msg) => {
    setOpen(true);
    setIntro(msg);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <ImageList sx={{ width: 1000, height: 350 }} cols={3}>
      {data.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${'https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ'}?w=248&fit=crop&auto=format`}
            srcSet={`${'https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ'}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.name}
            subtitle={<span>{item.workplace}</span>}
            position="below"
          />
          <Button variant="outlined" onClick={() => handleClickOpen(item.intro)}>
            详情
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
        <DialogTitle>{"详细信息"}</DialogTitle>
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