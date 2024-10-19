import { RadioGroup } from '@alfalab/core-components/radio-group';
import { Radio } from '@alfalab/core-components/radio';
import { useEffect, useState } from 'react';
import { FieldValues, Path, PathValue, useForm } from 'react-hook-form';

interface ControlledRadioGroup<T extends FieldValues> {
  radioGroups: { label: string; value: string }[];
  name: Path<T>;
  label?: string;
  required?: boolean;
  methods: ReturnType<typeof useForm<T>>;
}

export const ControlledRadioGroup = <T extends FieldValues>({
  radioGroups,
  methods,
  label,
  name,
  required,
}: ControlledRadioGroup<T>) => {
  const [valueRadio, setValueRadio] = useState('');
  const {
    setValue,
    trigger,
    getValues,
    register,
    formState: { errors, defaultValues },
  } = methods;
  const defaultValue = defaultValues ? defaultValues[name] : '';
  const onChange = (_: unknown, payload: { value: string; name?: string }) => {
    setValueRadio(payload.value);
  };

  useEffect(() => {
    register(name, { required: !!required });
  }, [name, register, required]);

  useEffect(() => {
    if (defaultValue) {
      setValueRadio(defaultValue);
    }
  }, [defaultValue, name]);

  useEffect(() => {
    setValue(name, valueRadio as PathValue<T, typeof name>);
    const currentValues = getValues(name);

    if (currentValues) trigger(name);
  }, [valueRadio, getValues, name, setValue, trigger]);

  return (
    <RadioGroup
      onChange={onChange}
      label={label}
      value={valueRadio}
      error={errors[name]?.message as string}
      direction="horizontal"
    >
      {radioGroups.map((item, index) => (
        <Radio key={index} {...item} size={24} />
      ))}
    </RadioGroup>
  );
};
