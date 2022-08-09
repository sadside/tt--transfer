import logo from "../../assets/logo.svg";
import "./logo.scss";

const Logo = () => {
  return (
    <div>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
    </div>
  );
};

export default Logo;
