import {
  Text,
  AutocompleteProps,
  Autocomplete,
  SelectItemProps,
  AutocompleteItem,
} from '@mantine/core';
import { forwardRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
} & Omit<AutocompleteProps, 'name'>;

interface ItemProps extends SelectItemProps {
  value: string;
  label: string;
}

const AutoCompleteItemComponent = forwardRef<HTMLDivElement, ItemProps>(
  ({ value, label, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Text size="sm">{label}</Text>
    </div>
  ),
);

export const EAutocomplete = ({ name, ...other }: Props) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, formState: { errors } }) => (
        <Autocomplete
          type="text"
          {...other}
          {...field}
          value={
            other.data.find((obj) => (obj as ItemProps)?.value === field.value)
              ? (
                  other.data.find(
                    (obj) => (obj as ItemProps)?.value === field.value,
                  ) as ItemProps
                ).label
              : ''
          }
          itemComponent={AutoCompleteItemComponent}
          error={
            errors[name] ? (errors[name]?.message as unknown as string) : ''
          }
        />
      )}
    />
  );
};
