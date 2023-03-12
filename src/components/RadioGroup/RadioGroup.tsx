import useTranslation from "next-translate/useTranslation";
import { useCallback } from "react";

import { FiltersType } from "@types";

import { CUSTOM_FILTERS } from "@config/constants";

import Check from "@icons/Check";

import styles from "./RadioGroup.module.scss";

const RadioGroup: React.FC<RadioGroupProps> = ({ type, values, options, onChange }) => {
  const { t } = useTranslation("common");

  const onSelect: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { name, value } = e.currentTarget;
      const newValues = { ...values };
      if (value === "ALL") delete newValues[name];
      else newValues[name] = [value];
      onChange(newValues);
    },
    [onChange, values]
  );

  const renderOption = (value: string, name: string) => {
    const id = `${type}-${value}`;
    return (
      <div key={value} className="flex align-center pv10">
        <input
          id={id}
          type="radio"
          className={styles.input}
          name={type}
          value={value}
          checked={values[type] ? values[type].includes(value) : value === "ALL"}
          onChange={onSelect}
        />
        <label htmlFor={id} className={styles.radio}>
          <Check />
        </label>
        <label htmlFor={id} className={styles.label}>
          {name}
        </label>
      </div>
    );
  };

  return (
    <div>
      {options?.[type].map((option) => {
        const value = option.id || option;
        const name = option.name || (CUSTOM_FILTERS.includes(type) ? t(`${type}-${option}`) : option);
        return renderOption(value, name);
      })}
    </div>
  );
};

type RadioGroupProps = {
  type: string;
  values: FiltersType;
  options?: FiltersType;
  onChange: (values: FiltersType) => any;
};

export default RadioGroup;
