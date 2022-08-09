import Logo from "../../components/logo/Logo";
import Button from "../../components/ui/button/Button";
import "./passwordSent.scss";
import { useNavigate } from "react-router-dom";

const PasswordSent = () => {
  const navigate = useNavigate();

  return (
    <>
      <Logo />
      <div className={"password-sent-wrap"}>
        <div>
          <div>Новый пароль отпавлен на Ваш e-mail</div>
          <Button
            text="Страница входа"
            width={220}
            style={{ textTransform: "uppercase", width: 220, height: 40 }}
            callback={() => navigate("/login")}
          />
        </div>
      </div>
    </>
  );
};

export default PasswordSent;
