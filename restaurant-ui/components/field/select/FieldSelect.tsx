import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Select from './SelectComponent';
import './styled.css';
import { ISelectOption } from '@/models/field.model';

interface Props {
  name: string;
  placeholder?: string;
  options: ISelectOption[];
}

const FieldSelectComponent: React.FC<Props> = ({ name, placeholder, options, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selectedValue = options.find((option) => option.value === field.value) || null;
        return (
          <Select
            options={options}
            className='select-wrapper'
            placeholder={placeholder}
            value={selectedValue}
            onChange={(selectOption) => field.onChange((selectOption as ISelectOption)?.value)}
            onBlur={field.onBlur}
          />
        );
      }}></Controller>
  );
};

export const FieldSelect = React.memo(FieldSelectComponent);
