import "./editSidebarTableHeader.scss";

const EditSidebarTableHeader = () => {
  return (
    <>
      <div className="table-custom-header">
        <div>Цены по типам услуг</div>
        <div style={{ textDecoration: "underline" }}>Редактировать</div>
      </div>
    </>
  );
};

export default EditSidebarTableHeader;
