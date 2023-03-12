import clsx from "clsx";
import escapeStringRegexp from "escape-string-regexp";
import debounce from "lodash/debounce";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

import { FiltersType } from "@types";

import useClickOutside from "@hooks/useClickOutside";
import { handleTrackEvent, trackEvent } from "@utils/analytics";

import DropDown from "@components/DropDown";
import IconButton from "@components/IconButton";

import styles from "./AutoComplete.module.scss";

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const { className, classes, placeholder, types, values, options, leftIcon, rightIcon, onChange } = props;

  const [search, setSearch] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const valuesRef = useRef<HTMLDivElement>(null);

  const dropdownRef = useClickOutside<HTMLDivElement>(() => setShowOptions(false));

  useEffect(() => {
    valuesRef.current?.scrollTo &&
      valuesRef.current.scrollTo({
        left: valuesRef.current.scrollWidth - valuesRef.current.clientWidth,
        behavior: "smooth",
      });
  }, [values]);

  const filteredOptions = useMemo(() => {
    if (!options) return {};
    const filters = {};
    const match = new RegExp(escapeStringRegexp(search), "i");
    types.forEach((type) => {
      filters[type] = options[type]?.filter(
        (option) =>
          match.test(option.name || option) &&
          !values[type]?.find((value) => (value.id ? value.id === option.id : value === option))
      );
      if (filters[type] && !filters[type].length) delete filters[type];
    });
    return filters;
  }, [options, search, types, values]);

  const onSelect: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const { name, id, key } = e.currentTarget.dataset;
      if (!key) return;
      setSearch("");
      const newValues = { ...values };
      newValues[key] = [...(newValues[key] || []), id ? { name, id } : name];
      onChange(newValues);
      setShowOptions(false);
    },
    [onChange, values]
  );

  const debouncedTrackEvent = useCallback(
    debounce((value, options) => {
      trackEvent("marketplace_searched", { searchText: value, noOfOptions: options.length, optionsShown: options });
    }, 1000),
    []
  );

  const onInputChange = (e) => {
    const {
      currentTarget: { value },
    } = e;
    setSearch(value);

    const options = Object.keys(filteredOptions)
      .map((key) => filteredOptions[key])
      .flat();

    if (value.length >= 5) debouncedTrackEvent(value, options);
  };

  return (
    <div className={className} data-testid="auto-complete">
      <div ref={dropdownRef} className={styles.root}>
        <div ref={valuesRef} className={clsx(styles.values, classes?.input)}>
          {leftIcon}
          <input
            className={styles.input}
            value={search}
            onChange={onInputChange}
            onFocus={() => setShowOptions(true)}
            onFocusCapture={handleTrackEvent("click_search_marketplace", { availableFilters: options })}
            placeholder={placeholder}
          />
          {rightIcon || (
            <IconButton
              className={styles.rightIcon}
              onClick={() => setShowOptions((prevState) => !prevState)}
              data-testid="auto-complete-open"
            >
              <KeyboardArrowDown className={showOptions ? styles.reverse : ""} fontSize="large" />
            </IconButton>
          )}
        </div>
        <DropDown
          className={classes?.dropdown}
          options={filteredOptions}
          isLoading={!options}
          isOpen={showOptions}
          showTitle={types.length > 1}
          onSelect={onSelect}
        />
      </div>
    </div>
  );
};

type AutoCompleteProps = {
  className?: string;
  classes?: { input?: string; dropdown?: string };
  placeholder?: string;
  types: (keyof FiltersType)[];
  values: FiltersType;
  options?: FiltersType;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onChange: (values: FiltersType) => void;
};

export default AutoComplete;
