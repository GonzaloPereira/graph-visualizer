import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import SpeedIcon from '@material-ui/icons/Speed';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});
const MySlider = withStyles({
  root: {
    color: '#3f72af',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default function SpeedSlider({ speed, setSpeed }) {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setSpeed(newValue);
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={2} alignItems='center'>
        <Grid item>
          <p style={{ margin: '0.8rem' }}>Speed</p>
        </Grid>
        <Grid item xs>
          <MySlider value={speed} onChange={handleChange} aria-labelledby='continuous-slider' min={0} max={900} step={1} />
        </Grid>
        <Grid item>
          <SpeedIcon />
        </Grid>
      </Grid>
    </div>
  );
}
