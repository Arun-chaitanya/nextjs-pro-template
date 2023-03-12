import clsx from "clsx";

import Check from "@mui/icons-material/Check";

import styles from "./RadioBox.module.scss";

const RadioBox: React.FC<RadioBoxProps> = (props) => {
  const { children, className, icon, checked, iconColor, ...restProps } = props;
  return (
    <button
      type="button"
      className={clsx(styles.root, checked ? styles.selected : "", className)}
      data-testid="radio-box"
      {...restProps}
    >
      <div className="flex-auto align-center">
        <div className="flex-auto">{children}</div>
      </div>
      <div className={styles.check}>{checked ? <Check data-testid="radio-box-check" /> : null}</div>
    </button>
  );
};

RadioBox.defaultProps = {
  iconColor: "dark",
};

type RadioBoxProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  iconColor?: "white" | "dark" | "grey" | "primary";
  icon?: React.ReactNode;
  checked?: boolean;
};

export default RadioBox;
