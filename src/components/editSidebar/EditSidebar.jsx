import "./editSidebar.scss";
import closeEditSidebar from "../../assets/close-window-icon.svg";

const EditSidebar = ({
  children,
  toggleSidebar,
  isVisible,
  isGray = false,
}) => {
  return (
    <>
      <div
        className={"close-edit-sidebar"}
        onClick={() => toggleSidebar(!isVisible)}
      >
        <img src={closeEditSidebar} alt="" width={50} height={50} />
      </div>
      <div
        className={`edit-sidebar-content-wrap ${
          isGray && "edit-sidebar-content-wrap-gray"
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default EditSidebar;
