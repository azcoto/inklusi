import isNumericChar from '@/libs/isNumericChar';
import {
  Group,
  TextInput,
  TextInputProps,
  Transition,
  ActionIcon,
} from '@mantine/core';
import React, { KeyboardEventHandler } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import XIcon from '@heroicons/react/solid/XIcon';

type Props = {
  name: string;
  rtl?: boolean;
  currencyMask?: boolean;
  clearButton?: boolean;
} & Omit<TextInputProps, 'name'>;

export const ENumberInput = ({
  name,
  rtl = false,
  currencyMask = false,
  clearButton = false,
  ...other
}: Props) => {
  const allowNum: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (!isNumericChar(e.keyCode)) e.preventDefault();
  };
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, formState: { errors } }) => (
        <TextInput
          type="text"
          inputMode="numeric"
          {...field}
          {...other}
          sx={{ input: { textAlign: rtl ? 'right' : 'left' } }}
          onKeyDown={allowNum}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            if (currencyMask) {
              const num = evt.target.value.replaceAll('.', '');
              evt.target.value !== ''
                ? field.onChange(Number(num).toLocaleString('id'))
                : field.onChange('');
            } else {
              field.onChange(evt.target.value);
            }
          }}
          error={
            errors[name] ? (errors[name]?.message as unknown as string) : ''
          }
          rightSection={
            clearButton && (
              <Transition
                mounted={field.value !== ''}
                transition="slide-left"
                duration={100}
                timingFunction="ease"
              >
                {(styles) => (
                  <ActionIcon style={styles} onClick={() => field.onChange('')}>
                    <XIcon />
                  </ActionIcon>
                )}
              </Transition>
            )
          }
        />
      )}
    />
  );
};
