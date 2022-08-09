import Applications from "../../components/applications/Applications";
import CurrentOnline from "../../components/currentOnline/CurrentOnline";
import Layout from "../../components/layout/Layout";
import "./activity.scss";
import News from "../../components/news/News";

const Activity = () => {
  return (
    <div className={"active-content-wrap"}>
      <News />
      <div className="second-sidebar">
        <CurrentOnline />
        <Applications />
      </div>
    </div>
  );
};

export default Activity;
