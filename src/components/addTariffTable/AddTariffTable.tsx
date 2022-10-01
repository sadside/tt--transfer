import "./addTariffTable.scss";
import { divide } from "lodash";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  editTariffPriceThunk,
  getCarClassesThunk,
  setShowZoneSidebar,
} from "../../store/tariffSlice";
import EditSidebarSubmitButtons from "../editSidebarSubmitButtons/EditSidebarSubmitButtons";
import Loader from "../loader/Loader";
import TariffCell from "../tariffCell/TariffCell";

interface AddTariffTableProps {
  showTransfersSidebar: (bool: boolean) => void;
}

const AddTariffTable = ({}: AddTariffTableProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => state.tariff.status);
  const carClasses = useAppSelector((state) => state.tariff.carClasses);
  const tariff = useAppSelector((state) => state.tariff.activeTariff);

  useEffect(() => {
    if (carClasses.length === 0) dispatch(getCarClassesThunk());

    // return () => {
    //   dispatch(editTariffPriceThunk(getValues()));
    // };
  }, []);

  const onSubmit = (data: any) => {
    dispatch(editTariffPriceThunk(data));
  };

  const handleTabClick = (index: number) => {
    dispatch(
      setShowZoneSidebar({
        value: true,
        index,
      })
    );
  };

  if (status === "loading")
    return (
      <div style={{ marginTop: 40 }}>
        <Loader />
      </div>
    );

  if (tariff?.intracity_tariff?.hub_to_prices?.length === 0)
    return (
      <div style={{ textAlign: "center", fontSize: 18, marginTop: 20 }}>
        Хабы отсутствуют
      </div>
    );

  return (
    <>
      <div className="scroll-table-tariff">
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex-conteiner-table"
        >
          <div>
            <div
              style={{ cursor: "pointer", height: 60, width: 190 }}
              className="fixed-cell-tr overlap"
            >
              Хабы
            </div>
            {tariff?.intracity_tariff?.hub_to_prices?.map((hub, index) => (
              <div
                className="fixed-cell-tr"
                style={{ cursor: "pointer", height: 91, width: 190 }}
                onClick={() =>
                  dispatch(setShowZoneSidebar({ value: true, index: index }))
                }
              >
                {hub?.hub?.title}
              </div>
            ))}
          </div>
          <div className="scroll-table-body-tariff">
            <table>
              <thead>
                <tr>
                  {carClasses.map((carClass) => (
                    <th>{carClass.title}</th>
                  ))}
                </tr>
              </thead>
            </table>

            <table>
              <tbody>
                {tariff?.intracity_tariff?.hub_to_prices?.map((hub, index) => (
                  <tr>
                    {/* <td
                      onClick={() => handleTabClick(index)}
                      className={"region transferLink fixed-cell"}
                    >
                      <div className={"transferLink-item"}>
                        {hub?.hub?.title}
                      </div>
                    </td>
                    <td></td> */}
                    {hub.prices.map((price) => {
                      return (
                        <TariffCell
                          register={register}
                          id={price.id}
                          driverPrice={price.driver_price}
                          customerPrice={price.customer_price}
                          setValue={setValue}
                          errors={errors}
                        />
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="submit-buttons-wrap">
            <EditSidebarSubmitButtons firstTitle="Удалить тариф" />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTariffTable;
