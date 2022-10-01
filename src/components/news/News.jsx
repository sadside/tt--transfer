import "./news.scss";
import { useGate, useList, useStore } from "effector-react";
import { $news, getNewsFx, NewsPageGate } from "../../effector/news";
import Loader from "../loader/Loader";
import Post from "../post/Post";
import TextArea from "../textArea/TextArea";
import Button from "../ui/button/Button";

const News = () => {
  return (
    <div className="news-wrapper">
      <TextArea />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default News;
