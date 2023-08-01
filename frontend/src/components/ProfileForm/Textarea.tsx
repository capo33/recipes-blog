import React from "react";
import { Form } from "react-bootstrap";

type TextareaProps = {
  label: string;
  value: string;
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
};

const Textarea = ({
  label,
  value,
  name,
  handleChange,
  placeholder,
}: TextareaProps) => {
  return (
    <>
      <Form.Label htmlFor={label} className='mt-2'>
        {label}
      </Form.Label>

      <Form.Control
        as='textarea'
        placeholder={placeholder}
        style={{ height: "100px" }}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </>
  );
};

export default Textarea;
