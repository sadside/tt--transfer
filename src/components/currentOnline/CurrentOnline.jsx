import "./currentOnline.scss";
import user2 from "../../assets/user-2.svg";

const CurrentOnline = () => {
  return (
    <div className="current-online-wrap">
      <div className="online-user-title">Кто сейчас в сети</div>
      <ul>
        <li>
          <div className={"online-user-profile"}>
            <div className="online-user-image">
              <img src={user2} alt="" />
            </div>
            <div className="online-user-name">Сергей Понявин</div>
          </div>
        </li>
        <li>
          <div className={"online-user-profile"}>
            <div className="online-user-image">
              <img src={user2} alt="" />
            </div>
            <div className="online-user-name">Сергей Понявин</div>
          </div>
        </li>
        <li>
          <div className={"online-user-profile"}>
            <div className="online-user-image">
              <img src={user2} alt="" />
            </div>
            <div className="online-user-name">Сергей Понявин</div>
          </div>
        </li>
        <li>
          <div className={"online-user-profile"}>
            <div className="online-user-image">
              <img src={user2} alt="" />
            </div>
            <div className="online-user-name">Сергей Понявин</div>
          </div>
        </li>
        <li>
          <div className={"online-user-profile"}>
            <div className="online-user-image">
              <img src={user2} alt="" />
            </div>
            <div className="online-user-name">Сергей Понявин</div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CurrentOnline;
