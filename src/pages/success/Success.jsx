import { Link } from "react-router-dom";
import Button from "../../components/ui/button/Button";
import "./success.scss";
import key from "../../assets/key.png";

const Success = () => {
  return (
    <>
      <div className="success-wrapper">
        <div className="success-block">
          <img src={key} alt="" width={90} />
          <div>Пароль успешно изменен!</div>
          <p>
            Для входа в аккаут заново введите данные от аккаунта на странице
            входа.
          </p>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button text="Перейти на страницу входа" width={300} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Success;
