import clsx from "clsx";
import { useRouter } from "next/router";

import IconButton from "@components/IconButton";
import Text from "@components/Text";
import Title from "@components/Title";

import ChevronLeft from "@icons/V2/ChevronLeft";

import styles from "./PageHeader.module.scss";

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const {
    className,
    classes,
    backHREF,
    title,
    subTitle,
    titleComponent,
    leftComponent,
    rightComponent,
    onClick,
    onBackClick,
    ...rest
  } = props;
  const router = useRouter();

  const renderBackIcon = () => {
    if (backHREF) {
      return (
        <IconButton className={styles.iconBtn} onClick={() => router.back()} onClickCapture={onBackClick}>
          <ChevronLeft height="2.5rem" width="2.5rem" />
        </IconButton>
      );
    }

    if (onClick) {
      return (
        <IconButton className={styles.iconBtn} onClick={onClick} onClickCapture={onBackClick}>
          <ChevronLeft height="2.5rem" width="2.5rem" />
        </IconButton>
      );
    }
  };

  const renderLeftComponent = () => (
    <div className="flex align-center justify-start flex1">
      {leftComponent || renderBackIcon() || <div className="p15" />}
    </div>
  );

  const renderRightComponent = () => (
    <div className="flex align-center justify-end flex1">{rightComponent || <div className="p15" />}</div>
  );

  const renderTitleComponent = () => {
    return (
      <div className={clsx(styles.title, classes?.title)}>
        {titleComponent || (
          <div>
            <Title variant="h4" align="center">
              {title}
            </Title>
            {subTitle && (
              <Text className="mt5" color="grey" align="center">
                {subTitle}
              </Text>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={clsx(styles.header, className)} {...rest}>
      {renderLeftComponent()}
      {(titleComponent || title) && renderTitleComponent()}
      {renderRightComponent()}
    </div>
  );
};

type PageHeaderProps = React.HTMLProps<HTMLDivElement> & {
  backHREF?: boolean;
  title?: string;
  subTitle?: string;
  titleComponent?: React.ReactNode;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  onClick?: () => any;
  onBackClick?: () => any;
  classes?: { title: string };
};

export default PageHeader;
