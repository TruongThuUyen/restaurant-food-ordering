import React from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  type: string;
};

export const FieldInput: React.FC<Props> = ({ name, placeholder, required, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <input
        {...register(name, { required: required })}
        placeholder={placeholder}
        type={props.type}
        className={props.className}
      />
    </div>
  );
};
