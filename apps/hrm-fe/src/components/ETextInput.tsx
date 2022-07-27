import { TextInput, TextInputProps } from '@mantine/core';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  uppercase?: boolean;
} & Omit<TextInputProps, 'name'>;

export const ETextInput = ({ name, uppercase = false, ...other }: Props) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, formState: { errors } }) => (
        <TextInput
          type="text"
          {...other}
          {...field}
          sx={{
            ...(uppercase && {
              input: {
                textTransform: 'uppercase',
              },
            }),
          }}
          error={
            errors[name] ? (errors[name]?.message as unknown as string) : ''
          }
        />
      )}
    />
  );
};
