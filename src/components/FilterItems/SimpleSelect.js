import React from 'react';
import { Select, MenuItem, FormControl, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

//MUI STYLING
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 0,
    width: '100%',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export function getStyles(e, values, theme) {
  return {
    fontWeight:
      values.indexOf(e) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const SimpleSelect = ({ values, text, propagateValue, name }) => {
  const [vals, setVals] = React.useState(values);
  const classes = useStyles();
  const theme = useTheme();

  const handleChange = (event) => {
    setVals(event.target.value);
    propagateValue(name, event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      {text ? <Typography variant={'overline'}>{text}</Typography> : null}
      <Select
        labelId={`multi-select-${name}-label`}
        id={`multi-select-${name}`}
        multiple
        value={vals}
        onChange={handleChange}
        input={<Input />}
        MenuProps={MenuProps}
      >
        {values.map((e) => (
          <MenuItem key={e} value={e} style={getStyles(e, vals, theme)}>
            {e}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default SimpleSelect;
