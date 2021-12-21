import React from 'react';
import { Card, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { IndTypes } from './static';

const useStyles = makeStyles(() => ({
  anchor: {
    '&::before': {
      content: '""',
      display: 'block',
      height: 64,
      marginTop: -64,
    },
  },
}));

const DashboardComponent = ({ title, name, children }) => {
  const classes = useStyles();

  return (
    <Card id={name} className={classes.anchor}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h2'>{title}</Typography>
        </Grid>
        {children}
      </Grid>
    </Card>
  );
};

const DashboardBox = ({ type, data }) => {
  const paperStyle = {
    width: '100%',
    minHeight: '80vh',
    alignContent: 'flex-start',
  };

  const { name, label } = IndTypes[type];
  console.log(name, label);
  // TODO: fetch data by type/name/label

  const content = data.map(({ title, name, grid, component }) => (
    <Grid key={name} item {...grid}>
      <DashboardComponent title={title} name={name}>
        {component}
      </DashboardComponent>
    </Grid>
  ));

  return (
    <Grid container style={paperStyle} spacing={3}>
      {content}
    </Grid>
  );
};

export default DashboardBox;
