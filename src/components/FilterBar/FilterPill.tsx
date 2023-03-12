import clsx from "clsx";

import Text from "@components/Text";

import styles from "./FilterBar.module.scss";

const FilterPill: React.FC<FilterPillProps> = (props) => {
  const { text, id, active, onClick } = props;

  return (
    <div key={id} className={clsx(styles.pill, active && styles.active)} onClick={() => onClick(id)}>
      <Text noWrap color={active ? "light" : "dark"}>
        {text}
      </Text>
    </div>
  );
};

export type Filter = {
  text: string;
  id: string;
};

type FilterPillProps = Filter & {
  active?: boolean;
  onClick: (id: string) => void;
};

export default FilterPill;
