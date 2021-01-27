import React from "react";
import { Input, FormGroup } from "reactstrap";
import AsyncSelect from 'react-select/async';
const style = {
    select: {

    }
}



function AsyncSelectInput(props) {
  return (
    <>
      <FormGroup>
      {props.showLabel && <label className={props.className}>{props.label}</label>}
        <AsyncSelect
            classNamePrefix="form-control"
          {...props}
        />
      </FormGroup>
    </>
  );
}

export default AsyncSelectInput;
