import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";

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
      <FloatingLabel label={label}>
        <Form.Control
          as='textarea'
          placeholder={placeholder}
          // style={{ height: "100px" }}
          name={name}
          value={value}
          onChange={handleChange}

        />
      </FloatingLabel>

      {/* <label htmlFor='firstname' className='text-sm'>
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className='shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full border border-gray-300 rounded-md'
      ></textarea> */}
    </>
  );
};

export default Textarea;
