import "./editSidebarTableHeader.scss";

interface SidebarTableHeaderProps {
  linkField?: string;
  title: string;
  handleClick?: () => void;
}

const SidebarTableHeader = ({
  linkField,
  title,
  handleClick,
}: SidebarTableHeaderProps) => {
  return (
    <>
      <div className="table-custom-header">
        <div>{title}</div>
        {linkField && (
          <div className="transferLink" onClick={handleClick}>
            <div className="transferLink-item">{linkField}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default SidebarTableHeader;
