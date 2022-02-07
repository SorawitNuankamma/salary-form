import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Selector(props) {
  return (
    <Box sx={{ width: props.width }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{""}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value}
          label={""}
          onChange={props.onChange}
        >
          {props.list.map((el, index) => {
            return (
              <MenuItem key={index} value={el}>
                {el}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
