import clsx from "clsx";
import { useState } from "react";

import Collapse from "@mui/material/Collapse";

import Text from "@components/Text";

import ArrowDown from "@icons/ArrowDown";

import styles from "./Accordion.module.scss";

const Accordion: React.FC<AccordionProps> = (props) => {
  const { id, children, isToggled, variant, text, classes } = props;

  const [toggled, setToggled] = useState(isToggled);

  const handleToggle = () => {
    setToggled((prevState) => !prevState);
  };

  return (
    <summary className={styles.root} data-testid="accordion">
      <div
        id={id}
        role="button"
        className={clsx(styles.accordion, variant && styles[variant], toggled && styles.active, classes?.body)}
        onClick={handleToggle}
        data-testid="accordion-button"
      >
        {text && (
          <Text weight="bold" color="black">
            {text}
          </Text>
        )}
        <span className={clsx(styles.icon, toggled && styles.toggled)}>
          <ArrowDown className={styles.arrow} />
        </span>
      </div>

      <Collapse in={toggled} data-testid="accordion-content">
        <div className={clsx(styles.content, classes?.content)}>{children}</div>
      </Collapse>
    </summary>
  );
};

Accordion.defaultProps = {
  isToggled: false,
  variant: "normal",
};

type AccordionProps = React.PropsWithChildren<{
  id?: string;
  text?: string;
  isToggled?: boolean;
  variant?: "normal";
  titleVariant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  event?: string;
  eventData?: Record<string, any>;
  classes?: { body?: string; content?: string };
}>;

export default Accordion;
