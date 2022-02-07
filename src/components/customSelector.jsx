import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function CustomSelector(props) {
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
              <MenuItem key={index} value={el.dial_code}>
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${el.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${el.code.toLowerCase()}.png 2x`}
                  alt={`Flag of ${el.label}`}
                />
                {el.dial_code}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
