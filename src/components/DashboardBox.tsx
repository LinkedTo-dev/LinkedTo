import React from 'react';
import { Card, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const typeContext = React.createContext<number>(0);

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DashboardBox = ({ type, data }: { type: number; data: any }) => {
  const paperStyle = {
    width: '100%',
    minHeight: '80vh',
    alignContent: 'flex-start',
  };

  const content = data.map(({ title, name, grid, component }) => (
    <Grid key={name} item {...grid}>
      <DashboardComponent title={title} name={name}>
        {component}
      </DashboardComponent>
    </Grid>
  ));

  return (
    <Grid container style={paperStyle} spacing={3}>
      <typeContext.Provider value={type}>{content}</typeContext.Provider>
    </Grid>
  );
};

export default DashboardBox;
