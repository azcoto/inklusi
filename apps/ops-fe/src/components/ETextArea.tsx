import { Textarea, TextareaProps } from '@mantine/core';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  uppercase?: boolean;
} & Omit<TextareaProps, 'name'>;

export const ETextarea = ({ name, uppercase = false, ...other }: Props) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, formState: { errors } }) => (
        <Textarea
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
