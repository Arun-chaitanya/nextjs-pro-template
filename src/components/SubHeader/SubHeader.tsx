import clsx from "clsx";
import { Container } from "react-grid-system";
import Text from "@components/Text";
import Title from "@components/Title";

import ArrowLeft from "@icons/ArrowLeft";

import styles from "./SubHeader.module.scss";

const SubHeader: React.FC<SubHeaderProps> = (props) => {
  const { children, href, title, description, className, onClick, titleVariant, textColor } = props;

  const handleClick = () => {
    return onClick && onClick();
  };

  return (
    <div className={styles.root}>
      <div className={clsx(styles.content, className)}>
        {children || (
          <Container data-testid="sub-header">
            <div className="flex items-center gap-6">
              {href || onClick ? <ArrowLeft className="text-[24px] translate-y-px" onClick={href} /> : null}
              {title && (
                <Title variant={titleVariant} className="mt5">
                  {title}
                </Title>
              )}
            </div>

            {description && (
              <Text color={textColor || "grey6"} size="sm" className="mt5">
                {description}
              </Text>
            )}
          </Container>
        )}
      </div>
    </div>
  );
};

SubHeader.defaultProps = {
  className: "",
  titleVariant: "h1",
};

type SubHeaderProps = React.PropsWithChildren<{
  href?: () => void;
  className?: string;
  onClick?: () => any;
  title?: string;
  description?: string;
  titleVariant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  textColor?: "dark" | "grey6" | "black";
}>;

export default SubHeader;
