import useTranslation from "next-translate/useTranslation";
import { useCallback } from "react";

import { FiltersType } from "@types";

import { CUSTOM_FILTERS } from "@config/constants";

import Check from "@icons/Check";

import styles from "./CheckboxGroup.module.scss";

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ type, values, options, onChange }) => {
  const { t } = useTranslation("common");

  const onSelect: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { name, value } = e.currentTarget;
      const newValues = { ...values };
      if (newValues[name]) {
        const currentIndex = newValues[name].indexOf(value);
        if (currentIndex >= 0) {
          newValues[name] = [...newValues[name]];
          newValues[name].splice(currentIndex, 1);
        } else newValues[name] = [...newValues[name], value];
      } else newValues[name] = [value];
      if (!newValues[name].length) delete newValues[name];
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
          type="checkbox"
          className={styles.input}
          name={type}
          value={value}
          checked={values[type]?.includes(value)}
          onChange={onSelect}
        />
        <label htmlFor={id} className={styles.checkbox}>
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

type CheckboxGroupProps = {
  type: string;
  values: FiltersType;
  options?: FiltersType;
  onChange: (values: FiltersType) => any;
};

export default CheckboxGroup;
