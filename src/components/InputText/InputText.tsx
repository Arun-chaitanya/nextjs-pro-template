import clsx from "clsx";
import { useState } from "react";

import Search from "@mui/icons-material/Search";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import styles from "./InputText.module.scss";

const InputText: React.FC<InputTextProps> = (props) => {
  const { type, variant, error, className, classes, showVisibility, readOnly, ...rest } = props;

  const [showPassword, setShowPassword] = useState(false);

  const isSearch = type === "search";
  const isPassword = type === "password";

  return (
    <div className={styles.root} data-testid="input-text">
      <input
        type={isSearch || showPassword ? "text" : type}
        className={clsx(
          styles.input,
          variant && styles[variant],
          error && styles.error,
          isPassword && showVisibility && "pr35",
          isSearch && "pl50",
          readOnly && styles.readonly,
          className
        )}
        readOnly={readOnly}
        {...rest}
      />
      {error && error.length ? <p className={clsx(styles.errorText, classes?.error)}>{error}</p> : null}
      {isSearch && (
        <div className={styles.search} data-testid="input-text-search">
          <Search />
        </div>
      )}
      {isPassword && showVisibility && (
        <button
          tabIndex={-1}
          type="button"
          aria-label={showPassword ? "Show" : "Hide"}
          className={styles.eye}
          onClick={() => setShowPassword((prevState) => !prevState)}
          data-testid="input-text-visibility"
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </button>
      )}
    </div>
  );
};

InputText.defaultProps = {
  variant: "rounded",
  type: "text",
  showVisibility: true,
  classes: {},
};

export type InputTextProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: "normal" | "rounded";
  error?: string;
  showVisibility?: boolean;
  classes?: { error?: string };
};

export default InputText;
