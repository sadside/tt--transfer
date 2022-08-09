import { AnimatePresence, motion } from "framer-motion";
import styles from "./ErrorComponent.module.scss";

interface IErrorComponent {
  text: string;
  width?: number;
}

const ErrorComponent = ({ text, width }: IErrorComponent) => {
  return (
    <AnimatePresence>
      {text.length !== 0 && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ type: "Tween" }}
          style={{ overflow: "hidden" }}
        >
          <div className={styles.errorComponent} style={{ width }}>
            {text}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorComponent;
