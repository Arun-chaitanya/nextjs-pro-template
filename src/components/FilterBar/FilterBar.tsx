import styles from "./FilterBar.module.scss";
import FilterPill, { Filter } from "./FilterPill";

const FilterBar: React.FC<FilterBarProps> = (props) => {
  const { list, activeIds, onClick } = props;

  return (
    <div className={styles.barRoot}>
      {list?.map((filter) => (
        <FilterPill key={filter.id} text={filter.text} id={filter.id} active={activeIds.includes(filter.id)} onClick={onClick}/>
      ))}
    </div>
  );
};

type FilterBarProps = {
  list: Filter[];
  activeIds: string[];
  onClick: (id: string) => void;
};

export default FilterBar;
