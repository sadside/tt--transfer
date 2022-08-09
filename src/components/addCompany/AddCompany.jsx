import { clientFields, companyFields } from "../../db";
import EditSidebarSubmitButtons from "../editSidebarSubmitButtons/EditSidebarSubmitButtons";
import SidebarHeader from "../sidebarHeader/SidebarHeader";
import "./addCompany.scss";

const AddCompany = () => {
  return (
    <>
      <SidebarHeader title="Добавить компанию" />
      <div className="add-company-wrap">
        <div className="company-info">
          <div className="company-photo">Загрузить аватарку</div>
          <div className="client-fields">
            {companyFields.slice(0, 6).map((field) => (
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
          <div className="client-fields">
            {companyFields.slice(6).map((field) => (
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
            {/*<img src={clientDocument} alt="" />*/}
            {/*<img src={clientDocument} alt="" />*/}
          </div>
        </div>
        <div className="submit-buttons-wrap">
          <EditSidebarSubmitButtons
            firstTitle="Сбросить"
            secondTitle="Добавить"
          />
        </div>
      </div>
    </>
  );
};

export default AddCompany;
