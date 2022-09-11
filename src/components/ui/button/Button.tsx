import React from "react";
import "./button.scss";

interface ButtonProps {
  width?: number;
  height?: number;
  text?: string;
  callback?: () => void;
  style?: object;
  typeSubmit?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  width = "100%",
  height,
  text,
  callback,
  style,
  typeSubmit,
}) => {
  return (
    <button
      className={"enter-button"}
      onClick={callback}
      style={{ width, height, ...style }}
      type={typeSubmit ? "submit" : "button"}
    >
      {text}
    </button>
  );
};

export default Button;
