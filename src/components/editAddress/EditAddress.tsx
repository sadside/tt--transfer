import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "../../store/hooks";
import Select from "../select/Select";
import styles from "./EditAddress.module.scss";

export type HubFormValues = {
  address: string;
  description: string;
  coords: string;
};

const EditAddress: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<HubFormValues>();

  const additionalRaces = useAppSelector(
    (state) => state.calculator.additionalRaces
  ).map((item) => item.value);
  const addressFrom = useAppSelector(
    (state) => state.calculator.activeAddressFrom
  );

  const addressTo = useAppSelector((state) => state.calculator.activeAddressTo);

  const items: any = [
    ...additionalRaces,
    addressFrom.address,
    addressTo.address,
  ]
    .filter((item: string) => item !== "")
    .map((item) => ({
      title: item,
    }));

  console.log(items);

  const onSubmit: SubmitHandler<HubFormValues> = () => {};

  const [showSelect, setShowSelect] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  return (
    <>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.addHub}>
          <Select
            setShowSelect={setShowSelect}
            items={items}
            showSelect={showSelect}
            text={selectedItem || "Выберите адрес"}
            setSelectItem={setSelectedItem}
          />
          <input
            type="text"
            placeholder={"Координаты"}
            className={styles.hubInput}
            {...register("coords", {
              required: "Это поле обязательно для заполнения!",
            })}
          />
          {errors?.coords && (
            <div className="error-component">{errors.coords.message}</div>
          )}
          <input type="submit" className={styles.hubInputSubmit} />
        </div>
      </form>
    </>
  );
};

export default EditAddress;
//@ts-ignore
