import React, { useEffect, useState } from 'react';
import { FieldValues, Path, PathValue, useForm } from 'react-hook-form';
import { Input } from '@alfalab/core-components/input';
import { PasswordInput } from '@alfalab/core-components/password-input';

type Props<T extends FieldValues> = {
  name: Path<T>;
  required?: boolean;
  type?: 'number' | 'text' | 'email' | 'money' | 'password' | 'tel';
  size?: 's' | 'm' | 'l' | 'xl' | 48 | 56 | 64 | 72;
  label: string;
  clear?: boolean;
  methods: ReturnType<typeof useForm<T>>;
  isReset?: boolean;
} & React.ComponentProps<typeof Input>;

export const ControlledInput = <T extends FieldValues>({
  methods,
  label,
  name,
  required,
  size,
  type = 'text',
  clear = false,
  isReset,
  ...props
}: Props<T>) => {
  const {
    setValue,
    trigger,
    getValues,
    register,
    formState: { errors },
  } = methods;

  const [fieldValue, setFieldValue] = useState(getValues()[name]);

  useEffect(() => {
    register(name, { required: !!required });
  }, [name, register, required]);

  useEffect(() => {
    setValue(name, fieldValue);
    const currentValues = getValues(name);

    if (currentValues) trigger(name);
  }, [fieldValue, getValues, name, setValue, trigger]);

  useEffect(() => {
    if (isReset) {
      setFieldValue('' as PathValue<T, typeof name>);
    }
  }, [isReset]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(e.target.value as PathValue<T, typeof name>);
  };

  const onBlurHandler = () => {
    trigger(name);
  };

  const handleClear = () => {
    const emptyValue = '' as PathValue<T, typeof name>;
    setFieldValue(emptyValue);
    setValue(name, emptyValue);
  };

  const fieldConfig: React.ComponentProps<typeof Input> = {
    error: errors[name]?.message as string,
    value: fieldValue,
    onChange: onChangeHandler,
    onBlur: onBlurHandler,
    label,
    block: true,
    size,
    type,
    ...props,
  };

  if (type === 'password') {
    return <PasswordInput {...fieldConfig} />;
  }

  return (
    <Input
      {...fieldConfig}
      clear={clear}
      onClear={clear ? handleClear : undefined}
    />
  );
};
