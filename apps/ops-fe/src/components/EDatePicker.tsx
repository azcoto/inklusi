import { DatePicker, DatePickerProps } from '@mantine/dates';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
} & Omit<DatePickerProps, 'name'>;

export const EDatePicker = ({ name, ...other }: Props) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, formState: { errors } }) => (
        <DatePicker
          type="text"
          {...other}
          {...field}
          value={field.value ? new Date(field.value) : null}
          onChange={(value) => {
            field.onChange(`${value}`);
          }}
          clearable={true}
          locale="id"
          inputFormat="DD MMMM YYYY"
          initialLevel="year"
          error={
            errors[name] ? (errors[name]?.message as unknown as string) : ''
          }
        />
      )}
    />
  );
};
