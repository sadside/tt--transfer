import "./uploadProfileImages.scss";
import { useRef, useState } from "react";
import passport from "../../assets/pasport.png";
import drive from "../../assets/drive.png";
import axios from "axios";
import { avatarUploaded } from "../../effector/user/editUserData";
import $api, { API_URL } from "../../http";
import UserServices from "../../services/UserServices";
import { setAvatar } from "../../store/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import ErrorComponent from "../errorComponent/ErrorComponent";
import image from "../../assets/заглушка для картинки.jpg";
import UploadProfileFile from "../uploadProfileFile/UploadProfileFile";

const UploadProfileImages = () => {
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploaded, setUploaded] = useState();
  const [documents1, setDocuments1] = useState(null);
  const filePicker: any = useRef(null);
  const filePickerDocuments: any = useRef(null);

  const email = useAppSelector((state) => state.user.user.email);
  const documents = useAppSelector((state) => state.user.user.documents);

  const error = useAppSelector((state) => state.user.error);

  const handleChange = (e: any) => {
    if (!e.target.files[0]) {
      alert("please select a file");
    }
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);

    // dispatch(setAvatar(formData));
    avatarUploaded(formData);
  };

  const handleChangeDocuments = (e: any) => {
    if (e.target.files.length === 0) {
      alert("please select a file");
    }

    const formData: any = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("documents", e.target.files[i]);
    }

    setDocuments1(formData);
    console.log(documents1);

    // dispatch(addDocument(documents1));
  };

  const handlePick = () => {
    filePicker.current.click();
  };
  const handlePickDocuments = () => {
    filePickerDocuments.current.click();
  };
  //5242880

  const handleUpload = () => {};

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div style={{ marginBottom: 15 }}>Аватарка</div>
      <button
        onClick={handlePick}
        className="file-button"
        style={{ width: 200, fontWeight: 300 }}
      >
        Загрузить аватарку
      </button>
      <div style={{ marginBottom: 15, marginTop: 25 }}>Скан-копии</div>
      <button
        onClick={handlePickDocuments}
        className="file-button"
        style={{ width: 200, fontWeight: 300 }}
      >
        Загрузить документ
      </button>
      <div className="documents">
        {documents?.map((item) => (
          <img src={`uploads/documents/${email}/${item}`} alt="" />
        ))}
      </div>
      <form action="">
        <input
          type="file"
          onChange={handleChange}
          accept={"image/*, .png, .jpg, .gif, .web"}
          className="hidden"
          ref={filePicker}
        />

        <input
          type="file"
          multiple={true}
          onChange={handleChangeDocuments}
          accept={"image/*, .png, .jpg, .gif, .web"}
          className="hidden"
          ref={filePickerDocuments}
        />
        <ErrorComponent text={error} />
        {/*<input type="submit" onClick={handleSubmit} />*/}
      </form>

      {/*<div className="upload-image-wrapper">*/}
      {/*  <div className="upload-image-container">*/}
      {/*    <div className="image-item">*/}
      {/*      <img src={image} alt="" />*/}
      {/*    </div>*/}
      {/*    <div className="image-item">*/}
      {/*      <img src={image} alt="" />*/}
      {/*    </div>*/}
      {/*    <div className="image-item">*/}
      {/*      <img src={image} alt="" />*/}
      {/*    </div>*/}
      {/*    <div className="image-item">*/}
      {/*      <img src={image} alt="" />*/}
      {/*    </div>*/}
      {/*    <div className="image-item">*/}
      {/*      <img src={image} alt="" />*/}
      {/*    </div>*/}
      {/*    <div className="image-item">*/}
      {/*      <img src={image} alt="" />*/}
      {/*    </div>*/}
      {/*    <div className="image-item">*/}
      {/*      <img src={image} alt="" />*/}
      {/*    </div>*/}
      {/*    <div className="image-item">*/}
      {/*      <img src={image} alt="" />*/}
      {/*    </div>*/}
      {/*    <div className="image-item">*/}
      {/*      <img src={image} alt="" />*/}
      {/*    </div>*/}
      {/*    <div className="image-item">*/}
      {/*      <img src={image} alt="" />*/}
      {/*    </div>*/}
      {/*    <div className="image-item">*/}
      {/*      <img src={image} alt="" />*/}
      {/*    </div>*/}
      {/*    <div className="image-item">*/}
      {/*      <img src={image} alt="" />*/}
      {/*    </div>*/}
      {/*    <div className="image-item">*/}
      {/*      <img src={image} alt="" />*/}
      {/*    </div>*/}
      {/*    <div className="image-item">*/}
      {/*      <img src={image} alt="" />*/}
      {/*    </div>*/}

      {/*    <UploadProfileFile*/}
      {/*      title={"word"}*/}
      {/*      type={"exel"} // word, exel, pdf, file*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};

export default UploadProfileImages;
