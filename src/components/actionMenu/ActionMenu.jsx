import "./actionMenu.scss";

const ActionMenu = ({ handleItemClick }) => {
  return (
    <div className={"action-menu-wrap"}>
      <button className={"action-menu-button"}>Отправить в архив</button>
      {handleItemClick && (
        <button className={"action-menu-button"}>Редактировать </button>
      )}
      <button className={"action-menu-button"}>Выбрать все</button>
    </div>
  );
};

export default ActionMenu;
