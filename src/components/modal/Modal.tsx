import classNames from "classnames";
import { FC, PropsWithChildren, ReactNode, useEffect } from "react";
import styles from "./Modal.module.scss";

export type ModalProps = {
  active: boolean;
  setActive: (bool: boolean) => void;
};

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  active,
  setActive,
  children,
}) => {
  const modal = classNames([styles.modal], {
    [styles.active]: active,
  });

  const content = classNames([styles.content], {
    [styles.active]: active,
  });
  return (
    <div>
      <div className={modal} onClick={() => setActive(false)}>
        <div className={content} onClick={(event) => event.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
