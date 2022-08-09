import "./sidebarHeader.scss";

const SidebarHeader = ({ title }) => {
  return (
    <>
      <div className="tariffs-edit-sidebar-content-wrapper-header transfers">
        {title}
      </div>
    </>
  );
};

export default SidebarHeader;
