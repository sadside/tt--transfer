import Logo from "../../components/logo/Logo";
import RegisterFields from "../../components/registerFields/RegisterFields";
import "./register.scss";

const Register = () => {
  return (
    <div className={"register-wrap"}>
      <Logo />
      <RegisterFields />
    </div>
  );
};

export default Register;
