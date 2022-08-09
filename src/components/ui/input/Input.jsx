import "./Input.scss";

const Input = ({ placeholder, type = "text" }) => {
  return <input type={type} className={"input"} placeholder={placeholder} />;
};

export default Input;
