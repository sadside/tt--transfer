import { useAppDispatch } from "../../store/hooks";
import { deleteTariffThunk } from "../../store/tariffSlice";
import Button from "../ui/button/Button";

interface EditSidebarSubmitButtonsProps {
  firstTitle?: string;
  secondTitle?: string;
}

const EditSidebarSubmitButtons = ({
  firstTitle = "Перенести в архив",
  secondTitle = "Сохранить тариф",
}: EditSidebarSubmitButtonsProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="submit-tariff-buttons-wrap">
      <div className="submit-tariff-buttons">
        <Button
          text={firstTitle}
          style={{ backgroundColor: "#DB5454", width: 180 }}
          callback={() => dispatch(deleteTariffThunk())}
        />
        <Button
          text={secondTitle}
          style={{ width: 180, marginLeft: 15 }}
          typeSubmit={true}
        />
      </div>
    </div>
  );
};

export default EditSidebarSubmitButtons;
