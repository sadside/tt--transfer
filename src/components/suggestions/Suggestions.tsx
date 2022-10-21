import { motion } from "framer-motion";
import styles from "./Suggestions.module.scss";

interface SuggestionsProps {
  suggestions: any[];
  suggestionClicked: (props: any) => void;
}

const Suggestions = ({ suggestions, suggestionClicked }: SuggestionsProps) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ type: "Tween" }}
      style={{ zIndex: 100000000, position: "relative" }}
    >
      <div className={styles.citySelect}>
        <ul>
          {suggestions.map((suggestion, index: number) => {
            return (
              <li key={index} onClick={() => suggestionClicked(suggestion)}>
                {suggestion}
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
};

export default Suggestions;
