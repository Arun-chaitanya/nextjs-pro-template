import clsx from "clsx";

import BaseModal from "@mui/material/Modal";

import IconButton from "@components/IconButton";
import Text from "@components/Text";
import Title from "@components/Title";

import Cross from "@icons/Cross";

import styles from "./Modal.module.scss";

const Modal: React.FC<ModalProps> = (props) => {
  const {
    children,
    fullWidth,
    className,
    classes,
    open,
    onClose,
    showHeader,
    title,
    description,
    hasHr,
    renderIcon,
    ...rest
  } = props;

  const handleClose = (event?: any, reason?: "backdropClick" | "escapeKeyDown") => {
    if (onClose) onClose(event, reason);
  };

  return (
    <BaseModal
      open={open}
      onClose={handleClose}
      componentsProps={{
        backdrop: { className: clsx(styles.backdrop, classes?.backdrop) },
      }}
      closeAfterTransition
      {...rest}
    >
      <div className={clsx(styles.root, fullWidth && styles.fullWidth, className)}>
        {onClose && (
          <IconButton aria-label="Close" className={styles.closeBtn} onClick={onClose}>
            <Cross />
          </IconButton>
        )}
        {renderIcon && renderIcon()}
        {showHeader && (
          <header className={clsx(styles.header, classes?.header)} data-testid="modal-header">
            {title && (
              <Title variant="h1" align="center">
                {title}
              </Title>
            )}
            {description && (
              <Text align="center" color="grey6" size="sm" className="mt15">
                {description}
              </Text>
            )}
            {hasHr && (
              <div className="pr15">
                <hr className="m0" />
              </div>
            )}
          </header>
        )}
        <div className={clsx(styles.body, classes?.body)} data-testid="modal-body">
          {children}
        </div>
      </div>
    </BaseModal>
  );
};

Modal.defaultProps = {
  fullWidth: true,
  showHeader: true,
};

export type ModalProps = React.PropsWithChildren<{
  open: boolean;
  onClose?: (event?: any, reason?: "backdropClick" | "escapeKeyDown") => any;
  fullWidth?: boolean;
  className?: string;
  classes?: { body?: string; backdrop?: string; header?: string };
  showHeader?: boolean;
  title?: string;
  description?: string;
  hasHr?: boolean;
  renderIcon?: () => React.ReactNode;
}>;

export default Modal;
