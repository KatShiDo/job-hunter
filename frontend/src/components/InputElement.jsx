import React from "react";
import { Label, TextInput } from "flowbite-react";

export default function InputElement(props) {
  return (
    <div>
      <Label value={props.children} />
      <TextInput
        type={props.type}
        placeholder={props.placeholder}
        id={props.id}
        onChange={props.onChange}
      />
    </div>
  );
}
