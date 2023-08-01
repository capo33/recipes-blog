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

const Input = ({ label, type, value, name, handleChange, placeholder }: InputProps) => {
  return (
    <>
      <Form.Label htmlFor={label}>{label}</Form.Label>
      <Form.Control
        id={label}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {/* <label htmlFor='firstname' className='text-sm'>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className='shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full border border-gray-300 rounded-md'
      /> */}
    </>
  );
};

export default Input;
