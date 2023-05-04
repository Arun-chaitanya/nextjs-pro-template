import clsx from "clsx";

import styles from "./InputLabel.module.scss";

const InputLabel: React.FC<InputLabelProps> = (props) => {
  const { children, className, htmlFor, ...rest } = props;

  return (
    <label htmlFor={htmlFor} className={clsx(styles.root, className)} {...rest}>
      {children}
    </label>
  );
};

type InputLabelProps = React.HTMLProps<HTMLLabelElement>;

export default InputLabel;
