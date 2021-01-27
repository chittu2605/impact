import React from "react";
import { Input, FormGroup } from "reactstrap";



function TextInput (props) {
    return (
        <>
            <FormGroup>
                {props.showLabel && <label className={props.className}>{props.label}</label>}
                <Input
                    {...props}
                    type={props.type ? props.type : "text"}
                    placeholder={props.label}
                />
            </FormGroup>
        </>
    )
}


export default TextInput;