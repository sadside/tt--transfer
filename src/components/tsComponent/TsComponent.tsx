import React from "react";
import { IUser } from "../../types/types";

interface IComponentProps {
  width: number;
  height: number | string;
}

const TsComponent: React.FC<IComponentProps> = ({ width, height }) => {
  const user: IUser = {
    name: "hello",
    surname: "dasda",
    email: "sadsdide@@mas",
    confirmed: true,
    patronymic: "eqeqeq",
    phone: "2342342",
    id: 1,
    role: "dadadsad",
  };

  return (
    <div>
      {height} {width}
    </div>
  );
};

export default TsComponent;
