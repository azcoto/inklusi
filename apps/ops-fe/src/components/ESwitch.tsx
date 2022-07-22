import { Select, Switch, SwitchProps } from '@mantine/core';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  onSideLabel: string;
  offSideLabel: string;
} & Omit<SwitchProps, 'name'>;

export const ESwitch = ({
  name,
  onSideLabel,
  offSideLabel,
  ...other
}: Props) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, formState: { errors } }) => (
        <Switch
          {...other}
          {...field}
          label={field.value === '1' ? onSideLabel : offSideLabel}
          onChange={(evt) => {
            field.onChange(evt.target.checked ? '1' : '0');
          }}
        />
      )}
    />
  );
};
