import React from "react";
import { Input, FormGroup } from "reactstrap";
import Select from "react-select";

const style = {
    select: {

    }
}



function SelectInput(props) {
  return (
    <>
      <FormGroup>
      {props.showLabel && <label className={props.className}>{props.label}</label>}
        <Select
            classNamePrefix="form-control"
          {...props}
        />
      </FormGroup>
    </>
  );
}

export default SelectInput;
