import "./news.scss";
import { useGate, useList, useStore } from "effector-react";
import { $news, getNewsFx, NewsPageGate } from "../../effector/news";
import Loader from "../loader/Loader";
import Post from "../post/Post";
import TextArea from "../textArea/TextArea";
import Button from "../ui/button/Button";

const News = () => {
  useGate(NewsPageGate);

  const items = useList($news, ({ title }) => <li>{title}</li>);
  const loading = useStore(getNewsFx.pending);

  return (
    <div className="news-wrapper">
      <TextArea />
      <Button
        text="Отправить"
        height={40}
        width={160}
        style={{ fontWeight: 300, marginTop: 22, fontSize: 14 }}
      />
      {loading ? <Loader /> : <div>{items}</div>}
      <Post />
      <button onClick={getNewsFx}>
        Сделать запрос на получение списка машин
      </button>
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default News;
