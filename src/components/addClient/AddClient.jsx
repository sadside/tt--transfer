import { clientFields } from "../../db";
import EditSidebarSubmitButtons from "../editSidebarSubmitButtons/EditSidebarSubmitButtons";
import clientDocument from "../../assets/clientDocuemnt.png";
import SidebarHeader from "../sidebarHeader/SidebarHeader";
import "./addClient.scss";

const AddClient = () => {
  return (
    <>
      <SidebarHeader title="Добавить клиента" />
      <div className="add-client-wrap">
        <div className="client-info">
          <div className="client-photo">Загрузить аватарку</div>
          <div className="client-fields">
            {clientFields.map((field) => (
              <div className="client-field" key={field.id}>
                <div>
                  <span className="required">*</span>
                  {field.text}
                </div>
                <input
                  type="text"
                  placeholder="Введите название"
                  className="client-input"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="upload-car-documents-title-wrap">
          <div className="upload-car-documents-title">Загрузить документы:</div>
          <div className="upload-car-documents-title">
            Загруженные документы:
          </div>
        </div>
        <div className="upload-car-documents-wrap">
          <div className="upload-car-documents">Загрузить...</div>
          <div className="uploaded-car-documents">
            <img src={clientDocument} alt="" />
            <img src={clientDocument} alt="" />
          </div>
        </div>
        <div className="submit-buttons-wrap">
          <EditSidebarSubmitButtons />
        </div>
      </div>
    </>
  );
};

export default AddClient;
