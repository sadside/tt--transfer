import { useStore } from "effector-react";
import { useForm } from "react-hook-form";
import { $user } from "../../effector/user/authorization";
import { userDataFormSubmitted } from "../../effector/user/editUserData";
import ErrorComponent from "../errorComponent/ErrorComponent";

const ProfileAccount = () => {
  const { register, handleSubmit, setValue } = useForm();
  const user = useStore($user);
  setValue("email", user.email);
  setValue("phone", user.phone);
  setValue("surname", user.surname);
  setValue("name", user.name);
  setValue("patronymic", user.patronymic);

  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit((data: any) => userDataFormSubmitted(data))}
      >
        <div className={"edit-profile-input-item"}>
          <div style={{ color: "#777777" }}>Номер телефона</div>
          <input
            className={"edit-profile-input"}
            placeholder={"+7 (987) 119-50-28"}
            autoComplete={"off"}
            {...register("phone")}
          />
        </div>
        <div className={"edit-profile-input-item"}>
          <div style={{ color: "#777777" }}>Фамилия</div>
          <input
            className={"edit-profile-input"}
            placeholder={"Терехов"}
            autoComplete={"off"}
            {...register("surname")}
          />
        </div>
        <div className={"edit-profile-input-item"}>
          <div style={{ color: "#777777" }}>Имя</div>
          <input
            className={"edit-profile-input"}
            placeholder={"Вячеслав"}
            autoComplete={"off"}
            {...register("name")}
          />
        </div>
        <div className={"edit-profile-input-item"}>
          <div style={{ color: "#777777" }}>Отчество</div>
          <input
            className={"edit-profile-input"}
            placeholder={"Александрович"}
            autoComplete={"off"}
            {...register("patronymic")}
          />
        </div>
        <input
          type="submit"
          className={"enter-button"}
          style={{ fontWeight: 300, marginTop: 40, width: 180 }}
        />
      </form>
    </>
  );
};

export default ProfileAccount;
