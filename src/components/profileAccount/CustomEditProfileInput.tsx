import "./profileAccount.scss";

interface CustomEditProfileInputProps {
  value: string;
  label: string;
  register: any;
  name: string;
  type?: string;
}

const CustomEditProfileInput = ({
  value,
  label,
  type = "text",
  register,
  name,
}: CustomEditProfileInputProps) => {
  return (
    <div className={"edit-profile-input-item"} {...register(name)}>
      <div style={{ color: "#777777" }}>{label}</div>
      <input
        type={type}
        className={"edit-profile-input"}
        placeholder={value}
        autoComplete={"off"}
      />
    </div>
  );
};

export default CustomEditProfileInput;
