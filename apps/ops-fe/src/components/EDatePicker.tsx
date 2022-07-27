import { DatePicker, DatePickerProps } from '@mantine/dates';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
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
          value={field.value ? field.value : null}
          onChange={(value) => {
            if (value) {
              dayjs.extend(utc);
              console.log(value);
              const toUTC = dayjs.utc(value).utcOffset(0, true).toDate();
              console.log(toUTC);
              field.onChange(`${toUTC}`);
            }
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
