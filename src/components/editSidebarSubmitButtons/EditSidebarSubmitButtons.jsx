import Button from "../ui/button/Button";

const EditSidebarSubmitButtons = ({
  firstTitle = "Перенести в архив",
  secondTitle = "Сохранить тариф",
}) => {
  return (
    <div className="submit-tariff-buttons-wrap">
      <div className="submit-tariff-buttons">
        <Button
          text={firstTitle}
          style={{ backgroundColor: "#364150", width: 180 }}
        />
        <Button text={secondTitle} style={{ width: 180, marginLeft: 15 }} />
      </div>
    </div>
  );
};

export default EditSidebarSubmitButtons;
