import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
const color = 'white';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
    maxWidth: 200,
  },
  select: {
    '&:before': {
      borderColor: color,
    },
    '&:after': {
      borderColor: color,
    },
    '&:hover': {
      borderColor: color,
    },
  },
  icon: {
    fill: color,
  },
}));
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
      width: 150,
    },
  },
};
export default function NodeSelector({ nodes, source, setSource }) {
  const classes = useStyles();
  const handleChangeSource = (event) => {
    setSource(event.target.value);
  };
  const whiteStyle = { color: 'white' };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel style={whiteStyle}>Source</InputLabel>
      <Select
        className={classes.select}
        value={source}
        onChange={handleChangeSource}
        label='Source'
        MenuProps={MenuProps}
        inputProps={{ classes: { icon: classes.icon } }}
        style={{ color: 'white' }}
      >
        {nodes.map((node, idx) => (
          <MenuItem key={idx} value={node}>
            {node}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
