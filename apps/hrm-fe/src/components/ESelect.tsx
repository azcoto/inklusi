import { Select, SelectProps } from '@mantine/core';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
} & Omit<SelectProps, 'name' | 'value'>;

export const ESelect = ({ name, ...other }: Props) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, formState: { errors } }) => (
        <Select
          type="text"
          {...other}
          {...field}
          error={
            errors[name] ? (errors[name]?.message as unknown as string) : ''
          }
        />
      )}
    />
  );
};
