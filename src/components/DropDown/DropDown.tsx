import clsx from "clsx";
import useTranslation from "next-translate/useTranslation";

import { FiltersType } from "@types";

import { CUSTOM_FILTERS, SORT_FILTERS } from "@config/constants";

import LoadingIndicator from "@components/LoadingIndicator";
import Text from "@components/Text";
import Title from "@components/Title";

import styles from "./DropDown.module.scss";

const LIMIT = 10;

const DropDown: React.FC<DropDownProps> = (props) => {
  const { className, options, isLoading, isOpen, showTitle, onSelect } = props;
  const { t } = useTranslation("common");

  const renderMain = () => {
    if (isLoading)
      return (
        <div className={clsx(styles.options, isOpen ? "" : "display-none")}>
          <LoadingIndicator />
        </div>
      );
    const filters = Object.keys(options);
    return (
      <div className={clsx(styles.options, isOpen ? "" : "display-none", className)} data-testid="dropdown-options">
        {filters.length ? (
          filters.map((type, index) => (
            <div key={type} className="mv5">
              {showTitle && (
                <Title variant="h4" className={clsx("mb10", index ? "mt20" : "mt10")}>
                  {type}
                </Title>
              )}
              <div>
                {options[type]
                  .slice(0, LIMIT)
                  .sort((a, b) =>
                    SORT_FILTERS.includes(type) ? (a.id && b.id ? a.name.localeCompare(b.name) : a.localeCompare(b)) : 0
                  )
                  .map((option) => (
                    <button
                      className={styles.option}
                      key={type + (option.id || option)}
                      data-name={option.name || option}
                      data-id={option.id || ""}
                      data-key={type}
                      onClick={onSelect}
                      data-testid={`dropdown-option-${type}-${option.id || option}`}
                    >
                      {option.name || (CUSTOM_FILTERS.includes(type) ? t(`${type}-${option}`) : option)}
                    </button>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <Text size="xs" weight="bold" className="mv5">
            No options available
          </Text>
        )}
      </div>
    );
  };

  return (
    <div className={styles.popper} data-testid="dropdown">
      {renderMain()}
    </div>
  );
};

type DropDownProps = {
  className?: string;
  options: FiltersType;
  isLoading?: boolean;
  isOpen?: boolean;
  showTitle?: boolean;
  onSelect: React.MouseEventHandler<HTMLButtonElement>;
};

export default DropDown;
