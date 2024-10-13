import React, { useEffect, useState } from 'react';
import { FieldValues, Path, PathValue, useForm } from 'react-hook-form';
import { BaseOption, BaseSelectChangePayload, OptionShape } from '@alfalab/core-components/select/shared';
import { Select } from '@alfalab/core-components/select';

type Props<T extends FieldValues> = {
  name: Path<T>;
  required?: boolean;
  label: string;
  clear?: boolean;
  methods: ReturnType<typeof useForm<T>>;
  options: OptionShape[];
} & React.ComponentProps<typeof Select>;

export const ControlledSelect = <T extends FieldValues>({
  methods,
  label,
  name,
  required,
  size,
  clear = false,
  options,
  ...props
}: Props<T>) => {
  const {
    setValue,
    trigger,
    getValues,
    register,
    formState: { errors },
  } = methods;

  const [selected, setSelected] = useState(getValues()[name]);

  useEffect(() => {
    register(name, { required: !!required });
  }, [name, register, required]);

  useEffect(() => {
    setValue(name, selected);
    const currentValues = getValues(name);

    if (currentValues) trigger(name);
  }, [selected, getValues, name, setValue, trigger]);

  const onChangeHandler = (payload: BaseSelectChangePayload) => {
    setSelected(payload.selected as PathValue<T, typeof name>)
  };

  const onBlurHandler = () => {
    trigger(name);
  };

  const handleClear = () => {
    const emptyValue = null as PathValue<T, typeof name>;
    setSelected(emptyValue);
    setValue(name, emptyValue);
  };

  const fieldConfig: React.ComponentProps<typeof Select> = {
    error: errors[name]?.message as string,
    selected: selected,
    onChange: onChangeHandler,
    onBlur: onBlurHandler,
    label,
    options:options,
    block: true,
    size,
    ...props,
  };

  return (
    <Select
      {...fieldConfig}
      Option={BaseOption}
      allowUnselect={true}
      clear={clear}
      onClear={handleClear}
    />
  );
};
