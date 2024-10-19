import { FieldValues, Path, PathValue, useForm } from 'react-hook-form';
import { UniversalDateInput } from '@alfalab/core-components/universal-date-input';
import {Calendar} from '@alfalab/core-components/calendar'
import moment from 'moment';
import { useEffect, useState } from 'react';
type Props<T extends FieldValues> = {
    name: Path<T>;
    required?: boolean;
    size?: 's' | 'm' | 'l' | 'xl' | 48 | 56 | 64 | 72;
    label: string;
    clear?: boolean;
    methods: ReturnType<typeof useForm<T>>;
};

const minDate = moment('1900-01-01').valueOf();
const maxDate = moment().valueOf();

export const ControlledDateInput = <T extends FieldValues>({
    methods,
    label,
    name,
    required,
    size,
    clear = false,
  }: Props<T>)=>{

    const {
        setValue,
        trigger,
        getValues,
        register,
        formState: { errors, defaultValues },
      } = methods;
      const defaultValue = defaultValues ? defaultValues[name] : '';
      const [date, setDate] = useState<Date | null>(null);

    const handleChange = (date: Date | null) => {
        trigger(name);
        setDate(date)
    };
    
      useEffect(() => {
        register(name, { required: !!required });
      }, [name, register, required]);
    
      useEffect(() => {
        if (defaultValue) {
          setDate(defaultValue);
        }
      }, [defaultValue, name]);
    
      useEffect(() => {
        setValue(name, date as PathValue<T, typeof name>);
        const currentValues = getValues(name);
    
        if (currentValues) trigger(name);
      }, [date, getValues, name, setValue, trigger]);

      const handleClear = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        const emptyValue = null as PathValue<T, typeof name>;
        setDate(emptyValue);
        setValue(name, emptyValue);
        trigger(name);
      };

      return (
        <UniversalDateInput
                block={true}
                view='date'
                label={label}
                size={size}
                value={date}
                onChange={handleChange}
                picker={true}
                Calendar={Calendar}
                calendarProps={{
                    selectorView: 'full',
                }}
                minDate={minDate}
                maxDate={maxDate}
                clear={clear}
                onClear={handleClear}
                error={errors[name]?.message as string}
            />

      )

}