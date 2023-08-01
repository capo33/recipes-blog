import React from "react";
import Form from "react-bootstrap/Form";

type InputProps = {
  label: string;
  type: string;
  value: string;
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

const Input = ({
  label,
  type,
  value,
  name,
  handleChange,
  placeholder,
}: InputProps) => {
  return (
    <>
      <Form.Label htmlFor={label} className='mt-2'>
        {label}
      </Form.Label>
      <Form.Control
        id={label}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;
